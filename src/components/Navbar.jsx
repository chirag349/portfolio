import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const navLinks = [
  { name: "Home",     href: "#home"     },
  { name: "About",    href: "#about me"    },
  { name: "Skills",   href: "#skills"   },
  { name: "Projects", href: "#projects" },
  { name: "Contact",  href: "#contact"  },
];

/* ── MAGNETIC BUTTON HOOK ── */
function useMagnetic(strength = 0.35) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };
  return { sx, sy, onMouseMove, onMouseLeave };
}

/* ── NAV LINK with underline + magnetic ── */
function NavLink({ link, onClick }) {
  const mag = useMagnetic(0.25);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={link.href}
      onClick={onClick}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={() => { mag.onMouseLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      style={{ x: mag.sx, y: mag.sy }}
      className="relative text-sm font-black uppercase tracking-widest"
      style ={{
        color: hovered ? "#a5b4fc" : "rgba(255,255,255,0.5)",
        transition: "color 0.2s",
        letterSpacing: "0.1em",
        fontSize: "0.72rem",
        x: mag.sx,
        y: mag.sy,
      }}
    >
      {link.name}
      {/* Animated underline */}
      <motion.span
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute -bottom-1 left-0 h-px rounded-full"
        style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }}
      />
      {/* Glow dot */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            style={{ background: "#818cf8", boxShadow: "0 0 6px #818cf8" }}
          />
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [isOpen, setIsOpen]       = useState(false);
  const [activeSection, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Active section tracker
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hireMag = useMagnetic(0.3);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "circOut" }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 px-4 md:px-6 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 py-3.5 rounded-2xl transition-all duration-500 relative overflow-hidden"
        style={{
          background: scrolled || isOpen
            ? "linear-gradient(135deg, rgba(10,15,46,0.92), rgba(13,8,32,0.92))"
            : "transparent",
          border: scrolled || isOpen
            ? "1px solid rgba(99,102,241,0.25)"
            : "1px solid transparent",
          backdropFilter: scrolled || isOpen ? "blur(24px)" : "none",
          boxShadow: scrolled || isOpen
            ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "none",
        }}
      >
        {/* Top shine on scroll */}
        {(scrolled || isOpen) && (
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(168,85,247,0.4), transparent)" }}
          />
        )}

        {/* ── LOGO ── */}
        <motion.a
          href="#home"
          whileTap={{ scale: 0.95 }}
          className="relative group"
          style={{ textDecoration: "none" }}
        >
          {/* Logo glow on hover */}
          <motion.div
            className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent)", filter: "blur(6px)" }}
          />
          <div className="relative flex items-center gap-2">
            {/* CS monogram box */}
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              />
              <span className="relative z-10 text-white font-black text-sm">CS</span>
            </motion.div>
            <span
              className="font-black tracking-tighter hidden sm:block"
              style={{
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #ffffff, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chirag Singh
            </span>
          </div>
        </motion.a>

        {/* ── DESKTOP LINKS ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.name} link={link} />
          ))}
        </div>

        {/* ── HIRE ME BUTTON (magnetic) ── */}
        <motion.div
          className="hidden md:block"
          onMouseMove={hireMag.onMouseMove}
          onMouseLeave={hireMag.onMouseLeave}
          style={{ x: hireMag.sx, y: hireMag.sy }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-7 py-2.5 rounded-xl font-black text-white flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
            {/* Pulse dot */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full relative z-10"
              style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
            />
            <span className="relative z-10">Hire Me</span>
          </motion.a>
        </motion.div>

        {/* ── MOBILE HAMBURGER ── */}
        <motion.div
          className="md:hidden cursor-pointer p-2 rounded-xl relative"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          style={{
            background: isOpen ? "rgba(99,102,241,0.15)" : "transparent",
            border: isOpen ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
          }}
        >
          <motion.div
            animate={{ rotateZ: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
            transition={{ duration: 0.25 }}
            className="w-6 h-0.5 rounded-full mb-1.5"
            style={{ background: isOpen ? "#818cf8" : "rgba(255,255,255,0.7)" }}
          />
          <motion.div
            animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 10 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-0.5 rounded-full mb-1.5"
            style={{ background: "#818cf8" }}
          />
          <motion.div
            animate={{ rotateZ: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
            transition={{ duration: 0.25 }}
            className="w-6 h-0.5 rounded-full"
            style={{ background: isOpen ? "#818cf8" : "rgba(255,255,255,0.7)" }}
          />
        </motion.div>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.25, type: "spring", stiffness: 200, damping: 22 }}
            className="absolute top-full left-4 right-4 mt-3 p-6 rounded-2xl md:hidden flex flex-col gap-1 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(10,15,46,0.97), rgba(13,8,32,0.97))",
              border: "1px solid rgba(99,102,241,0.25)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Top shine */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }}
            />

            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl group"
                style={{ textDecoration: "none" }}
                whileHover={{
                  background: "rgba(99,102,241,0.1)",
                  x: 4,
                }}
              >
                <span
                  className="font-black uppercase tracking-widest"
                  style={{
                    fontSize: "0.8rem",
                    color: activeSection === link.href.replace("#", "")
                      ? "#a5b4fc"
                      : "rgba(255,255,255,0.6)",
                  }}
                >
                  {link.name}
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  style={{ color: "rgba(99,102,241,0.5)", fontSize: "0.8rem" }}
                >
                  →
                </motion.span>
              </motion.a>
            ))}

            {/* Divider */}
            <div className="my-2 h-px mx-4"
              style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }}
            />

            {/* Hire Me mobile */}
            <motion.a
              href="#contact"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden w-full text-center py-3.5 rounded-xl font-black text-white uppercase tracking-widest"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                fontSize: "0.78rem",
                boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                textDecoration: "none",
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
                />
                Hire Me
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </motion.nav>
  );
}


