import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Camera, Mail, User, Calendar, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className="h-screen pt-20 overflow-y-auto bg-gradient-to-br from-base-200 via-base-100 to-base-300">
      <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Profile Header & Avatar */}
        <div className="bg-base-100/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your Profile</h1>
            <p className="mt-2 text-base-content/60">Manage your personal information and settings</p>
          </div>

          <div className="flex flex-col items-center gap-6 relative group">
            {/* Glowing rings behind avatar */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[40px] group-hover:bg-primary/40 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-lg">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-36 rounded-full object-cover border-4 border-base-100 shadow-inner group-hover:scale-95 transition-transform duration-300"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-2 right-2 
                  bg-primary hover:bg-primary-focus text-primary-content
                  p-3 rounded-full cursor-pointer shadow-lg hover:shadow-primary/50
                  hover:scale-110 hover:rotate-12 transition-all duration-300
                  ${isUpdatingProfile ? "animate-spin pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            
            <p className="text-sm font-medium text-base-content/60">
              {isUpdatingProfile ? (
                <span className="text-primary animate-pulse">Uploading new photo...</span>
              ) : (
                "Click the camera icon to update photo"
              )}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-base-100/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/10 space-y-6 hover:shadow-2xl transition-shadow duration-300">
             <h2 className="text-lg font-bold border-b border-base-content/10 pb-3 flex items-center gap-2">
               <User className="w-5 h-5 text-primary" /> Personal Details
             </h2>
             
             <div className="space-y-4">
                <div className="bg-base-200/50 rounded-2xl p-4 border border-white/5 group hover:border-primary/20 transition-colors">
                  <div className="text-xs text-base-content/50 uppercase tracking-widest font-semibold mb-1">Full Name</div>
                  <p className="font-medium text-lg">{authUser?.fullName}</p>
                </div>
                
                <div className="bg-base-200/50 rounded-2xl p-4 border border-white/5 group hover:border-primary/20 transition-colors">
                  <div className="text-xs text-base-content/50 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1"><Mail className="w-3 h-3"/> Email Address</div>
                  <p className="font-medium text-lg truncate">{authUser?.email}</p>
                </div>
             </div>
          </div>

          <div className="bg-base-100/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/10 space-y-6 hover:shadow-2xl transition-shadow duration-300">
             <h2 className="text-lg font-bold border-b border-base-content/10 pb-3 flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-secondary" /> Account Status
             </h2>
             
             <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-2xl border border-white/5 group hover:border-secondary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary"><Calendar className="w-5 h-5" /></div>
                    <span className="font-medium">Member Since</span>
                  </div>
                  <span className="font-bold">{authUser.createdAt?.split("T")[0]}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-2xl border border-white/5 group hover:border-emerald-500/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                      <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <span className="font-medium">Status</span>
                  </div>
                  <span className="text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full">Active</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
