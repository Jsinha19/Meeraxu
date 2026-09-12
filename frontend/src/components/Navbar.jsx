import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Home as HomeIcon,
  Info,
  Mail,
} from "lucide-react";

// Kinetic Logo Component
const KineticLogo = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="hdrWing1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="hdrWing2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#4C1D95" />
      </linearGradient>
    </defs>

    <g className="origin-[50px_42.5px] animate-[spin_12s_linear_infinite]">
      <circle
        cx="50"
        cy="42.5"
        r="38"
        stroke="#A855F7"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        className="opacity-60"
      />
      <circle
        cx="50"
        cy="42.5"
        r="30"
        stroke="#C4B5FD"
        strokeWidth="0.8"
        strokeDasharray="2 4"
        className="opacity-40"
      />
    </g>

    <line
      x1="50"
      y1="2"
      x2="50"
      y2="83"
      stroke="#A855F7"
      strokeWidth="0.5"
      strokeDasharray="2 3"
      className="opacity-30"
    />
    <line
      x1="8"
      y1="42.5"
      x2="92"
      y2="42.5"
      stroke="#A855F7"
      strokeWidth="0.5"
      strokeDasharray="2 3"
      className="opacity-30"
    />

    <path
      d="M34 9 L10 72.5 L50 42.5 Z"
      fill="url(#hdrWing1)"
      className="opacity-95"
    />
    <path
      d="M66 9 L90 72.5 L50 42.5 Z"
      fill="url(#hdrWing2)"
      className="opacity-95"
    />
    <path
      d="M50 42.5 L90 72.5 L50 62.5 L10 72.5 Z"
      fill="#D8B4FE"
      stroke="#D8B4FE"
      strokeWidth="1"
      strokeLinejoin="round"
      className="opacity-[0.98]"
    />
    <circle cx="50" cy="42.5" r="3.5" fill="#FFFFFF" />
  </svg>
);

// Kinetic Logo with Text Component
const KineticLogoWithText = ({ isCollapsed = false }) => (
  <div className="flex items-center gap-3">
    <KineticLogo size={40} />
    <div
      className={`flex flex-col overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isCollapsed
          ? "max-w-0 -translate-x-3.5 opacity-0"
          : "max-w-[240px] translate-x-0 opacity-100"
      }`}
    >
      <span className="font-display text-[0.95rem] font-extrabold leading-none tracking-wider text-[var(--white)]">
        MEERAXU
      </span>
      <span className="mt-1 font-mono text-[0.65rem] font-semibold leading-none tracking-widest text-[#C4B5FD]">
        INTELLIGENCE
      </span>
    </div>
  </div>
);

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navRef = useRef(null);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 18);
      setIsCollapsed(scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handlePointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setMenuOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const items = [
    { id: "home", label: "Home", path: "/", icon: HomeIcon },
    { id: "about", label: "About", path: "/about", icon: Info },
    { id: "contact", label: "Support", path: "/contact", icon: Mail },
  ];

  const activePage =
    location.pathname === "/about"
      ? "about"
      : location.pathname === "/contact"
        ? "contact"
        : "home";

  return (
    <div ref={navRef}>
      {/* Fixed Navbar */}
      <header
        className={`fixed left-0 right-0 top-0 z-[9999] transition-all duration-350 ${
          isScrolled
            ? "border-b border-[#8B5CF6]/20 bg-[#09090B]/80 shadow-[0_8px_24px_rgba(2,6,23,0.22)] backdrop-blur-xl saturate-120"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 md:gap-10 md:px-12">
          {/* Logo Section */}
          <button
            onClick={() => navigate("/")}
            className="flex shrink-0 items-center rounded-xl border-0 bg-transparent p-0 transition-opacity duration-300 hover:opacity-80"
          >
            <KineticLogoWithText isCollapsed={isCollapsed} />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden items-center gap-8 md:flex">
            {items.map((it) => {
              const active = activePage === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => navigate(it.path)}
                  className={`relative cursor-pointer border-0 bg-transparent p-0 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                    active
                      ? "text-[var(--white)]"
                      : "text-slate-400/60 hover:text-[var(--white)]"
                  }`}
                >
                  {it.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-sm bg-[var(--purple)] shadow-[0_0_8px_var(--purple)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <button
              onClick={() => navigate("/contact#contact-form")}
              className="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-[#A855F7]/60 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#7C3AED] bg-[length:200%_100%] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_22px_rgba(124,58,237,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[position:100%_0] hover:shadow-[0_12px_30px_rgba(168,85,247,0.42)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative">Book a call</span>
              <ArrowRight
                size={14}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 text-[var(--white)] md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9997] bg-[#050D12]/55 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 top-20 z-[9998] px-4 pb-4 md:hidden"
            >
              <div className="flex flex-col gap-1 rounded-[22px] border border-[#8B5CF6]/20 bg-gradient-to-b from-[#0D1C25]/95 to-[#081218]/98 p-2.5 shadow-[0_25px_70px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl">
                {items.map((it) => {
                  const active = activePage === it.id;
                  const Icon = it.icon;
                  return (
                    <button
                      key={it.id}
                      onClick={() => navigate(it.path)}
                      className={`relative flex w-full items-center gap-3 rounded-xl p-3.5 text-left text-sm transition-colors ${
                        active
                          ? "bg-gradient-to-r from-[#8B5CF6]/20 to-[#8B5CF6]/5 font-bold text-[var(--white)]"
                          : "font-medium text-[#EAF6F3]/65"
                      }`}
                    >
                      {active && (
                        <span className="absolute bottom-[22%] left-0 top-[22%] w-0.5 rounded-full bg-[var(--purple)] shadow-[0_0_8px_var(--purple)]" />
                      )}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          active
                            ? "bg-[#8B5CF6]/25 text-[var(--purple)]"
                            : "bg-[#8B5CF6]/10 text-[#EAF6F3]/45"
                        }`}
                      >
                        <Icon size={16} strokeWidth={2.25} />
                      </span>
                      {it.label}
                    </button>
                  );
                })}

                <div className="my-1.5 h-px bg-[#8B5CF6]/15" />

                <button
                  onClick={() => navigate("/contact#contact-form")}
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-[#A855F7]/50 bg-gradient-to-r from-[var(--purple)] to-[var(--purple-dark)] p-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(139,92,246,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(139,92,246,0.45)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-full" />
                  <span className="relative">Book a call</span>
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap behind fixed navbar */}
      <div className="h-[76px] pointer-events-none" />
    </div>
  );
}
