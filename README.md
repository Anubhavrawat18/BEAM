<div align="center">
  <h1>🌟 Beam</h1>
  <p><strong>A Modern, Premium Real-Time Chat Application</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" alt="Socket.io" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

---

## 📖 Overview

**Beam** is a full-stack, real-time messaging platform built designed with a focus on premium UI/UX modern aesthetics. It provides seamless real-time communication, robust user authentication, dynamic theming, and an intuitive interface optimized for an excellent user experience. 

## ✨ Features

- **🚀 Real-Time Messaging**: Instant message delivery and live updates using `Socket.io`.
- **🔐 Secure Authentication**: Fast and secure user registration and login utilizing standard JWT and `bcryptjs`.
- **🎨 Dynamic Theming**: Beautiful, switchable UI themes powered by `DaisyUI` and `TailwindCSS`. 
- **💎 Premium UI/UX**: Stunning interface featuring glassmorphism, smooth animations, and optimized layout spacing.
- **🖼️ Media Sharing**: Easily upload and share images as part of your conversations, powered by `Cloudinary`.
- **⚡ Lightweight State Management**: Efficient centralized state distribution utilizing `Zustand`.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Bootstrapped with Vite)
- **Styling**: Tailwind CSS & DaisyUI
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Network & Real-time**: Axios & Socket.io-client

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Real-Time Communication**: Socket.io
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Media Storage**: Cloudinary

---

## 🚦 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- A [Cloudinary](https://cloudinary.com/) Account (for image uploads)

### 1. Clone the repository

```bash
git clone <repository-url>
cd beam
```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

**Environment Variables**
Create a `.env` file in the `backend` directory and add the following keys:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Start the Backend Server**

```bash
npm run dev
```
*The backend should now be running on `http://localhost:5001`.*

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
```

**Start the Frontend Development Server**

```bash
npm run dev
```
*The frontend should now be running. Vite typically starts on `http://localhost:5173`.*

---

## 📂 Project Structure

```text
beam/
├── backend/            # Express server, MongoDB models, Routes, Socket.io events
│   ├── src/
│   │   ├── controllers/# Request handlers (Auth, Messages)
│   │   ├── lib/        # Database and Utility functions
│   │   ├── models/     # Mongoose Schemas (User, Message)
│   │   ├── routes/     # Express API routes
│   │   └── index.js    # Entry point of the server
│   └── package.json
│
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route pages (Home, Login, Signup)
│   │   ├── store/      # Zustand state stores (useAuthStore, useChatStore)
│   │   ├── App.jsx     # Main React component
│   │   └── index.css   # Main CSS/Tailwind configuration
│   └── package.json
│
└── README.md
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](<repository-url>/issues) if you want to contribute.

1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

<div align="center">
  <p>Built with ❤️ for a great user experience.</p>
</div>
