export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#111927] p-6 flex items-center justify-between min-h-[72px]">
      {/* Text */}
      <div className="relative z-10">
        <p className="text-xl font-medium text-white flex items-center gap-2 mb-1">
          Welcome back, Sabrina
          <span>👋</span>
        </p>
        <p className="text-base text-[#9DA4AE]">
          Platform is running smoothly — 112 of 148 agencies are active.
        </p>
      </div>

      {/* Decorative arc rings */}
      <svg
        className="absolute right-0 top-0 h-full pointer-events-none"
        viewBox="0 0 220 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMid meet"
      >
        <circle
          cx="200"
          cy="40"
          r="55"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="40"
          r="38"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="40"
          r="22"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
