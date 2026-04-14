import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 transition-colors duration-500">
      <div className="flex items-center justify-center pt-20 px-4 sm:px-6">
        <div className="bg-base-100/80 backdrop-blur-2xl rounded-2xl shadow-2xl w-full flex max-w-6xl h-[calc(100vh-8rem)] border border-white/10 overflow-hidden ring-1 ring-base-content/5">
          <div className="flex h-full w-full overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
