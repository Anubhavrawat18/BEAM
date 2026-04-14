import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-base-100/50 backdrop-blur-md border-t border-white/5 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border border-white/10 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content shadow-md
              flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
              type="button"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3 relative">
        <div className="flex-1 flex gap-2 relative group items-center">
          <button
            type="button"
            className={`absolute left-3 p-1.5 rounded-full transition-colors z-10
                     ${imagePreview ? "text-primary bg-primary/10" : "text-base-content/40 hover:text-primary hover:bg-primary/5"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} className="hover:scale-110 transition-transform" />
          </button>
          
          <input
            type="text"
            className="w-full input input-bordered rounded-full pl-12 pr-4 h-12 focus:ring-2 focus:ring-primary/20 
            bg-base-200/50 backdrop-blur-sm border-white/5 transition-all shadow-inner"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-circle btn-primary h-12 w-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 
          hover:scale-[1.05] active:scale-95 disabled:bg-base-300 disabled:text-base-content/30 disabled:border-transparent transition-all"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} className={(!text.trim() && !imagePreview) ? "" : "translate-x-0.5 -translate-y-0.5"} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
