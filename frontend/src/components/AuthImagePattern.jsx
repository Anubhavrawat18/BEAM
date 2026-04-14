const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200/50 p-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-md text-center z-10">
        <div className="relative w-64 h-64 mx-auto mb-12">
          {/* Main central floating block */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/80 rounded-3xl shadow-2xl animate-[bounce_8s_infinite] backdrop-blur-3xl flex items-center justify-center border border-white/20">
            <div className="w-1/2 h-1/2 bg-base-100/30 rounded-xl" />
          </div>

          {/* Floating elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-accent/60 rounded-2xl shadow-xl animate-[bounce_6s_infinite_0.5s] backdrop-blur-xl border border-white/20" />
          <div className="absolute -bottom-8 -right-4 w-24 h-24 bg-primary/60 rounded-full shadow-xl animate-[bounce_7s_infinite_1s] backdrop-blur-xl border border-white/20" />
          <div className="absolute top-1/2 -right-8 w-16 h-16 bg-secondary/50 rounded-xl shadow-lg animate-[bounce_5s_infinite_1.5s] backdrop-blur-xl border border-white/20" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">{title}</h2>
        <p className="text-base-content/60 text-lg leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
