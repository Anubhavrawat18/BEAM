# BEAM Project — Complete Build Roadmap

> A stepwise guide of every file and function to implement, ordered by dependency. Tick items off as you go.

---

## ✅ ALREADY DONE (Current State)

### Backend
| File | Functions / Notes |
|------|-------------------|
| `backend/src/lib/db.js` | `connectDB()` — MongoDB connection |
| `backend/src/lib/utils.js` | `generateToken(userId, res)` — JWT cookie |
| `backend/src/lib/cloudinary.js` | Cloudinary client init |
| `backend/src/models/user.model.js` | `User` schema (email, fullName, password, profilePic) |
| `backend/src/models/message.model.js` | `Message` schema (senderId, receiverId, content, status, replyTo, deletedFor, etc.) |
| `backend/src/middleware/auth.middleware.js` | `protectRoute` — JWT validation middleware |
| `backend/src/controllers/auth.controller.js` | `signup`, `login`, `logout`, `updateProfile`, `checkAuth` |
| `backend/src/controllers/message.controller.js` | `getUsersForSidebar`, `getMessages`, `sendMessage` |
| `backend/src/routes/auth.route.js` | `/api/auth/*` routes wired up |
| `backend/src/routes/message.route.js` | `/api/message/*` routes wired up |
| `backend/src/index.js` | Express server with CORS, cookieParser, routes |

### Frontend
| File | Functions / Notes |
|------|-------------------|
| `frontend/src/lib/axios.js` | `axiosInstance` — pre-configured Axios |
| `frontend/src/constants/themes.js` | `THEMES` array |
| `frontend/src/store/useThemeStore.js` | `setTheme(theme)` — persists to localStorage |
| `frontend/src/store/useAuthStore.js` | `checkAuth`, `signup`, `login`, `logout`, `updateProfile` |
| `frontend/src/components/Navbar.jsx` | Navigation bar |
| `frontend/src/components/AuthImagePattern.jsx` | Auth page decorative pattern |
| `frontend/src/pages/SignUpPage.jsx` | Signup form UI |
| `frontend/src/pages/LoginPage.jsx` | Login form UI |
| `frontend/src/pages/SettingsPage.jsx` | Theme selector with live preview |
| `frontend/src/pages/ProfilePage.jsx` | Profile view + avatar upload — **COMPLETE** |
| `frontend/src/App.jsx` | Routing, auth guards, theme wrapper |

---

## 🔴 STEP 1 — Backend: Fix a Bug in `useAuthStore` (Quick)

**File:** `frontend/src/store/useAuthStore.js`

- [ ] In the `signup` function (line 32), fix the typo: `res.response.data.message` → `error.response.data.message`

---

## 🔴 STEP 2 — Backend: Socket.IO Real-Time Server

**File to CREATE:** `backend/src/lib/socket.js`

- [ ] Import `http` and `Server` from `socket.io`
- [ ] Create `const app = new express()` AND `const server = http.createServer(app)` — export both
- [ ] Create `const io = new Server(server, { cors: { origin: "http://localhost:5173", credentials: true } })`
- [ ] Declare `const userSocketMap = {}` — maps `userId → socketId`
- [ ] **Export helper:** `getReceiverSocketId(userId)` — returns `userSocketMap[userId]`
- [ ] `io.on("connection", (socket) => { ... })`:
  - [ ] Read `userId` from `socket.handshake.query.userId`
  - [ ] Store: `userSocketMap[userId] = socket.id`
  - [ ] Emit `"getOnlineUsers"` to all clients: `io.emit("getOnlineUsers", Object.keys(userSocketMap))`
  - [ ] On `"disconnect"`: delete `userSocketMap[userId]`, re-emit `"getOnlineUsers"`
- [ ] Export `io`, `app`, `server`

**File to MODIFY:** `backend/src/index.js`

- [ ] Import `{ app, server }` from `./lib/socket.js` instead of creating `express()` directly
- [ ] Change `app.listen(PORT, ...)` → `server.listen(PORT, ...)`

---

## 🔴 STEP 3 — Backend: Real-Time Message Emit

**File to MODIFY:** `backend/src/controllers/message.controller.js`

- [ ] Import `{ io, getReceiverSocketId }` from `../lib/socket.js`
- [ ] Inside `sendMessage()`, after `await newMessage.save()`:
  ```js
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  ```
- [ ] Update `status` of the message to `"delivered"` if receiver is online at the time of sending

---

## 🔴 STEP 4 — Frontend: Socket Context in Auth Store

**File to MODIFY:** `frontend/src/store/useAuthStore.js`

- [ ] Add state: `onlineUsers: []`, `socket: null`
- [ ] **Add function:** `connectSocket()`:
  - [ ] If `authUser` exists and socket is not already connected, do `socket = io(BASE_URL, { query: { userId: authUser._id } })`
  - [ ] `socket.on("getOnlineUsers", (userIds) => set({ onlineUsers: userIds }))`
  - [ ] `set({ socket })`
- [ ] **Add function:** `disconnectSocket()`:
  - [ ] If `socket.connected`, call `socket.disconnect()`
- [ ] **Update `login`:** call `connectSocket()` on success
- [ ] **Update `checkAuth`:** call `connectSocket()` on success (so refresh keeps connection)
- [ ] **Update `logout`:** call `disconnectSocket()` before clearing `authUser`

---

## 🔴 STEP 5 — Frontend: Chat State Store

**File to CREATE:** `frontend/src/store/useChatStore.js`

- [ ] State: `messages: []`, `users: []`, `selectedUser: null`, `isUsersLoading: false`, `isMessagesLoading: false`
- [ ] **`getUsers()`**: `GET /api/message/users` → `set({ users: res.data })`
- [ ] **`getMessages(userId)`**: `GET /api/message/:userId` → `set({ messages: res.data })`
- [ ] **`sendMessage(messageData)`**: `POST /api/message/:selectedUser._id` → append returned message to `messages`
- [ ] **`setSelectedUser(user)`**: `set({ selectedUser: user })`
- [ ] **`subscribeToMessages()`**:
  - [ ] Get `socket` from `useAuthStore.getState()`
  - [ ] `socket.on("newMessage", (newMessage) => { if newMessage.senderId === selectedUser._id, append to messages })`
- [ ] **`unsubscribeFromMessages()`**: `socket.off("newMessage")`

---

## 🔴 STEP 6 — Frontend: Chat UI Components

### 6a. `frontend/src/components/Sidebar.jsx` (NEW)
- [ ] Import `useChatStore`, `useAuthStore`
- [ ] `useEffect` on mount: call `getUsers()`
- [ ] Map over `users` → render each as a list item with avatar + name
- [ ] Show green dot for users who are in `onlineUsers` (from `useAuthStore`)
- [ ] Highlight the currently `selectedUser` row
- [ ] On click: call `setSelectedUser(user)`
- [ ] Show loading skeleton while `isUsersLoading`

### 6b. `frontend/src/components/NoChatSelected.jsx` (NEW)
- [ ] Static/decorative component shown on the right pane when no user is selected
- [ ] Display an icon + "Select a conversation to start chatting" text

### 6c. `frontend/src/components/ChatHeader.jsx` (NEW)
- [ ] Props: receives `selectedUser` from `useChatStore`
- [ ] Display avatar, user name
- [ ] Show "Online" / "Offline" based on `onlineUsers` from `useAuthStore`
- [ ] An **X / close** button that calls `setSelectedUser(null)`

### 6d. `frontend/src/components/MessageInput.jsx` (NEW)
- [ ] State: `text`, `imagePreview`
- [ ] Text `<input>` controlled component
- [ ] Image upload button → FileReader → base64 → `setImagePreview`
- [ ] Shows image preview with a remove (×) button
- [ ] `handleSend()`: calls `sendMessage({ text, image: imagePreview })` from `useChatStore`, then resets state
- [ ] Disable send button if both `text` and `image` are empty

### 6e. `frontend/src/components/ChatContainer.jsx` (NEW)
- [ ] Import `useChatStore`, `useAuthStore`
- [ ] `useEffect`: on `selectedUser` change → call `getMessages(selectedUser._id)`, `subscribeToMessages()`; cleanup: `unsubscribeFromMessages()`
- [ ] `useRef` for scroll container → `useEffect` on `messages` change → `scrollIntoView({ behavior: "smooth" })`
- [ ] Render `<ChatHeader />`
- [ ] Loading skeleton while `isMessagesLoading`
- [ ] Map over `messages`:
  - [ ] Use `authUser._id === message.senderId` to decide left/right bubble alignment
  - [ ] Display `message.content.text` and/or `message.content.attachments[0].url`
  - [ ] Display formatted `message.createdAt` timestamp
- [ ] Render `<MessageInput />` at the bottom

---

## 🔴 STEP 7 — Frontend: Assemble the HomePage

**File to MODIFY:** `frontend/src/pages/HomePage.jsx`

- [ ] Import `useChatStore`, `Sidebar`, `NoChatSelected`, `ChatContainer`
- [ ] Layout: flex-row, full height (`h-screen pt-16`)
- [ ] Left side: render `<Sidebar />`
- [ ] Right side: conditionally render `<ChatContainer />` if `selectedUser`, else `<NoChatSelected />`

---

## 🟡 STEP 8 — Polish & Bug Fixes (After Core Features Work)

- [ ] **Message status**: update `status` to `"seen"` when receiver opens the conversation (emit a socket event `"messageSeen"`)
- [ ] **Typing indicator**: emit `"typing"` / `"stopTyping"` from `MessageInput`, display in `ChatHeader`
- [ ] **`user.model.js`**: add `lastSeen` field and update it on disconnect in `socket.js`
- [ ] **`message.model.js`**: clean up the commented-out old schema at the bottom of the file
- [ ] **Error handling**: standardize all `toast.error` calls in stores to use `error.response?.data?.message || error.message`
- [ ] **`useThemeStore`**: persist the theme from `localStorage` on store initialization:
  ```js
  theme: localStorage.getItem("chat-theme") || THEMES[0],
  ```

---

## 🟢 STEP 9 — Production Prep (Optional / Later)

- [ ] Add `NODE_ENV=production` to `.env` and verify `secure` cookie flag works
- [ ] Build frontend: `npm run build` inside `frontend/`
- [ ] Serve built frontend from Express static middleware in `backend/src/index.js`
- [ ] Update CORS origin to deployed domain
- [ ] Deploy backend to Railway / Render; configure env vars
- [ ] Update `axiosInstance` base URL for production

---

## Dependency Order Summary

```
STEP 1 (Bug Fix) → STEP 2 (Socket Backend) → STEP 3 (Emit Message)
    ↓
STEP 4 (Socket in Auth Store) → STEP 5 (Chat Store)
    ↓
STEP 6 (UI Components: Sidebar → NoChatSelected → ChatHeader → MessageInput → ChatContainer)
    ↓
STEP 7 (HomePage Assembly)
    ↓
STEP 8 (Polish) → STEP 9 (Production)
```
