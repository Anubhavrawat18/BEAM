import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  LogOut,
  Settings,
  User,
  CloudLightning,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed w-full top-0 z-40 border-b border-base-300/30 
    backdrop-blur-xl bg-base-100/60 shadow-sm transition-all duration-300"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:scale-105 transition-all duration-300 group"
            >
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(var(--p),0.3)] transition-all duration-300">
                <CloudLightning className="w-5 h-5 text-primary group-hover:animate-pulse" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-all duration-500">
                Beam
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Future Feature Dummy Button */}
            <button className="btn btn-ghost btn-circle hover:bg-primary/10 hover:text-primary transition-colors group hidden sm:flex">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>

            <Link
              to={"/settings"}
              className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/50 hover:scale-105 transition-all duration-300 rounded-full px-4"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/50 hover:scale-105 transition-all duration-300 rounded-full px-4">
                  <User className="size-4" />
                  <span className="hidden sm:inline font-medium">Profile</span>
                </Link>

                <button 
                  className="btn btn-outline btn-error btn-sm gap-2 hover:scale-105 transition-all duration-300 rounded-full px-4" 
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
