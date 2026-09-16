import { Outlet } from 'react-router-dom';

export function Illustration() {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center bg-[#F6F6FB] relative overflow-hidden">
      <div className="absolute w-[420px] h-[420px] bg-primary-100 rounded-full opacity-60" />
      <svg viewBox="0 0 400 320" className="relative w-[420px] h-auto">
        {/* desk */}
        <rect x="60" y="210" width="280" height="10" rx="4" fill="#6C5CE7" />
        <rect x="75" y="220" width="8" height="60" fill="#6C5CE7" />
        <rect x="320" y="220" width="8" height="60" fill="#6C5CE7" />
        {/* monitor */}
        <rect x="90" y="120" width="90" height="65" rx="6" fill="#22D3EE" />
        <rect x="128" y="185" width="14" height="18" fill="#1E1B39" />
        {/* laptop */}
        <rect x="190" y="150" width="110" height="70" rx="8" fill="#EC4899" />
        <circle cx="245" cy="185" r="8" fill="#fff" opacity="0.5" />
        {/* plant */}
        <rect x="330" y="240" width="34" height="40" rx="6" fill="#FBBF24" />
        <path d="M347 240 C330 220 330 200 347 190 C364 200 364 220 347 240 Z" fill="#22C55E" />
        {/* person */}
        <circle cx="245" cy="95" r="26" fill="#FCD9B8" />
        <path d="M215 130 C215 110 275 110 275 130 L275 175 L215 175 Z" fill="#6C5CE7" />
        <rect x="225" y="175" width="18" height="45" fill="#1E1B39" />
        <rect x="255" y="175" width="18" height="45" fill="#1E1B39" />
        <rect x="220" y="215" width="26" height="12" rx="6" fill="#EC4899" />
        <rect x="250" y="215" width="26" height="12" rx="6" fill="#EC4899" />
      </svg>
    </div>
  );
}

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-full lg:w-[440px] shrink-0 px-6 sm:px-10 lg:px-14 py-10 flex flex-col">
        <Outlet />
      </div>
      <Illustration />
    </div>
  );
}
