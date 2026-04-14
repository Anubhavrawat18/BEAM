import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants/themes";
import { Send, Sparkles } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hi! How are you?", isSent: false },
  { id: 2, content: "I'm doing great! Just loving this new custom theme we set up. 🚀", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 overflow-y-auto custom-scrollbar">
      <div className="container mx-auto px-4 pt-20 max-w-5xl pb-10">
        
        {/* Header styling */}
        <div className="bg-base-100/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
              Appearance <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </h1>
            <p className="mt-2 text-base-content/60 text-lg">Customize the look and feel of your workspace.</p>
          </div>
        </div>

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          
          {/* Themes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300
                  hover:scale-105 hover:shadow-xl active:scale-95 overflow-hidden
                  ${theme === t ? "bg-base-100 shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-base-200" : "bg-base-100/40 hover:bg-base-100/80 border border-white/5"}
                `}
                onClick={() => setTheme(t)}
              >
                {theme === t && (
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                )}
                <div
                  className="relative h-12 w-full rounded-xl overflow-hidden shadow-sm shadow-black/10 border border-white/10 group-hover:shadow-md transition-shadow"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-0.5 p-1 bg-transparent">
                    <div className="rounded-lg bg-primary shadow-sm hover:scale-110 transition-transform"></div>
                    <div className="rounded-lg bg-secondary shadow-sm hover:scale-110 transition-transform delay-75"></div>
                    <div className="rounded-lg bg-accent shadow-sm hover:scale-110 transition-transform delay-100"></div>
                    <div className="rounded-lg bg-neutral shadow-sm hover:scale-110 transition-transform delay-150"></div>
                  </div>
                </div>
                <span className={`text-[12px] font-bold tracking-wide truncate w-full text-center ${theme === t ? 'text-primary' : 'text-base-content/70'}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Preview Section */}
          <div className="mt-12 bg-base-100/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-base-content/10 pb-4">
              <span className="bg-primary/20 p-2 rounded-lg"><Sparkles className="w-5 h-5 text-primary" /></span> Live Preview
            </h3>
            
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-base-100 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="p-6 bg-base-200/50 backdrop-blur-sm">
                <div className="max-w-xl mx-auto">
                  {/* Mock Chat UI */}
                  <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-white/5">
                    {/* Chat Header */}
                    <div className="px-5 py-4 border-b border-base-300 bg-base-100/90 backdrop-blur-md flex justify-between items-center z-10 relative shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-primary-content font-bold shadow-md ring-2 ring-base-100">
                            M
                          </div>
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-base-100 rounded-full"></span>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm tracking-wide">Mary</h3>
                          <p className="text-xs text-emerald-500 font-medium hstack gap-1">Online</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-5 space-y-4 min-h-[240px] max-h-[240px] overflow-y-auto bg-base-100/30 relative">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isSent ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}
                        >
                          <div
                            className={`
                              max-w-[75%] px-4 py-3 shadow-md
                              ${message.isSent 
                                ? "bg-primary text-primary-content rounded-2xl rounded-br-sm" 
                                : "bg-base-200/80 backdrop-blur-sm border border-white/5 rounded-2xl rounded-bl-sm"}
                            `}
                          >
                            <p className="text-sm font-medium leading-relaxed">{message.content}</p>
                            <p
                              className={`
                                text-[10px] mt-2 font-semibold tracking-wider text-right
                                ${message.isSent ? "text-primary-content/70" : "text-base-content/50"}
                              `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input Preview */}
                    <div className="p-4 bg-base-100/90 backdrop-blur-md border-t border-white/5 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                      <div className="flex gap-2 items-center bg-base-200/50 p-1.5 rounded-full border border-white/5 shadow-inner">
                        <input
                          type="text"
                          className="input input-ghost flex-1 text-sm h-10 focus:outline-none focus:bg-transparent bg-transparent pl-4 font-medium"
                          placeholder="Type a message..."
                          value="This theme looks amazing!"
                          readOnly
                        />
                        <button className="btn btn-circle btn-primary btn-sm h-10 w-10 shadow-lg hover:scale-105 transition-transform">
                          <Send size={16} className="-translate-x-px translate-y-px" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
