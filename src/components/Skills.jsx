import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaMousePointer, FaTimes, FaChartBar, FaRocket, FaBrain, FaStar } from "react-icons/fa";

import streamlitLogo from "../assets/streamlit.png";
import plotlyLogo from "../assets/Plotly.png";
import geminiLogo from "../assets/gemini.png";

/* ── Claude logo — inline SVG as data URL ── */
const claudeLogo = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><circle cx='20' cy='20' r='20' fill='%23CC785C'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='18' font-family='serif' font-weight='bold' fill='white'>C</text></svg>`;

function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) =>
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

/* ══════════════════════════════════════
   REGULAR SKILL CARD
══════════════════════════════════════ */
const SkillCard = ({ title, subtitle, icon: Icon, skills, accentColor, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.15, duration: 0.7, type: "spring" }}
      viewport={{ once: true }}
      className="relative w-full max-w-[340px] h-[480px]"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="absolute -inset-1 rounded-[2.8rem] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${accentColor}44, transparent, ${accentColor}22)`, filter: "blur(8px)" }}
      />
      <motion.div
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-full h-full cursor-pointer"
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            boxShadow: `0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)`,
          }}
        >
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at ${glowX} ${glowY}, ${accentColor}25 0%, transparent 65%)` }}
          />
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center"
            style={{ transform: "translateZ(60px)" }}
          >
            <motion.div
              animate={{ y: [0, -12, 0], rotateZ: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 p-5 rounded-3xl relative"
              style={{
                background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)`,
                border: `1px solid ${accentColor}33`,
                color: accentColor,
                boxShadow: `0 0 30px ${accentColor}33, inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              <Icon size={40} />
            </motion.div>
            <h3 className="text-3xl font-black mb-2 leading-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </h3>
            <p className="font-medium mb-12 text-xs uppercase tracking-widest"
              style={{ color: accentColor, opacity: 0.8 }}
            >
              {subtitle}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-tighter"
              style={{
                background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`,
                border: `1px solid ${accentColor}44`,
                color: accentColor,
              }}
            >
              <FaMousePointer className="animate-bounce" /> Flip Card
            </motion.div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 w-full h-full rounded-[2.5rem] p-8 flex flex-col"
          style={{
            transform: "rotateY(180deg) translateZ(1px)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            border: `1px solid ${accentColor}33`,
            backdropFilter: "blur(20px)",
            boxShadow: `0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)`,
          }}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-white leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              The Stack
            </h3>
            <div className="w-6 h-6 flex items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <FaTimes style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-grow overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {isFlipped && skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.08, type: "spring" }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="group flex flex-col items-center justify-center p-3 rounded-2xl relative overflow-hidden cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${accentColor}15, transparent)` }}
                  />
                  <img src={skill.img} alt={skill.name}
                    className="w-10 h-10 mb-2 object-contain relative z-10"
                  />
                  <span className="text-[9px] font-black uppercase tracking-tighter text-center leading-none relative z-10"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ══════════════════════════════════════
   AI POWER CARD — with Claude added
══════════════════════════════════════ */
const AIPowerCard = ({ skills, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const accentColor = "#a855f7";

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.8, type: "spring" }}
      viewport={{ once: true }}
      className="relative w-full max-w-[340px] h-[480px]"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Outer pulsing aura */}
      <motion.div
        className="absolute -inset-2 rounded-[3rem] pointer-events-none"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(135deg, #a855f744, #6366f122, #ec489922)",
          filter: "blur(12px)",
        }}
      />

      <motion.div
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.9, type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-full h-full cursor-pointer"
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(99,102,241,0.08) 50%, rgba(236,72,153,0.08) 100%)",
            border: "1.5px solid rgba(168,85,247,0.3)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(168,85,247,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.06) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }} />
          {/* Corner glows */}
          <motion.div
            className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ background: "radial-gradient(circle at 100% 0%, rgba(168,85,247,0.25), transparent 70%)" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            style={{ background: "radial-gradient(circle at 0% 100%, rgba(99,102,241,0.2), transparent 70%)" }}
          />
          {/* Top line */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)" }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center"
            style={{ transform: "translateZ(60px)" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="mb-3 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(99,102,241,0.15))",
                border: "1px solid rgba(168,85,247,0.4)",
                color: "#d8b4fe",
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10"></span>
            </motion.div>

            {/* Brain icon with orbits */}
            <motion.div
              animate={{ y: [0, -14, 0], rotateZ: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-5 relative"
            >
              
              {/* Ring 2 */}
              <motion.div
                animate={{ rotateZ: -360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-7 rounded-full pointer-events-none"
                style={{ border: "1px dashed rgba(99,102,241,0.2)" }}
              />
              {/* Orbiting dot */}
              <motion.div
                animate={{ rotateZ: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute pointer-events-none"
                style={{ top: "-16px", left: "50%", marginLeft: -4, width: 8, height: 8 }}
              >
                <div className="w-2 h-2 rounded-full"
                  style={{ background: "#a855f7", boxShadow: "0 0 8px #a855f7" }}
                />
              </motion.div>

              <div className="p-5 rounded-3xl relative"
                style={{
                  background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(99,102,241,0.2))",
                  border: "1.5px solid rgba(168,85,247,0.4)",
                  color: "#d8b4fe",
                  boxShadow: "0 0 40px rgba(168,85,247,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <FaBrain size={40} />
              </div>
            </motion.div>

            <h3 className="text-3xl font-black mb-1 leading-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #ffffff, #d8b4fe, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(168,85,247,0.5))",
              }}
            >
              AI Power
            </h3>

            {/* Stars */}
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                >
                  <FaStar size={10} style={{ color: "#f59e0b" }} />
                </motion.div>
              ))}
            </div>

            <p className="font-medium mb-10 text-xs uppercase tracking-widest"
              style={{ color: "#a855f7", opacity: 0.9 }}
            >
              LLMs & Neural Nets
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-tighter relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(99,102,241,0.2))",
                border: "1px solid rgba(168,85,247,0.5)",
                color: "#d8b4fe",
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <FaMousePointer className="animate-bounce relative z-10" />
              <span className="relative z-10">Flip Card</span>
            </motion.div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 w-full h-full rounded-[2.5rem] p-8 flex flex-col overflow-hidden"
          style={{
            transform: "rotateY(180deg) translateZ(1px)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(99,102,241,0.07) 50%, rgba(236,72,153,0.07) 100%)",
            border: "1.5px solid rgba(168,85,247,0.3)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(168,85,247,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }} />

          {/* Back header */}
          <div className="relative z-10 flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-black text-white leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                The Stack
              </h3>
              <p className="text-xs mt-1" style={{ color: "rgba(168,85,247,0.7)" }}>
                🧠 Chirag's AI Arsenal
              </p>
            </div>
            <div className="w-7 h-7 flex items-center justify-center rounded-full"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
            >
              <FaTimes style={{ color: "#a855f7", fontSize: 10 }} />
            </div>
          </div>

          {/* Skills grid — now 3 items: Gemini, ChatGPT, Claude */}
          <div className="grid grid-cols-2 gap-4 flex-grow overflow-y-auto custom-scrollbar relative z-10">
            <AnimatePresence>
              {isFlipped && skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.3, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -6, rotateZ: 2 }}
                  className="group flex flex-col items-center justify-center p-4 rounded-2xl relative overflow-hidden cursor-default"
                  style={{
                    background: skill.special
                      ? "linear-gradient(135deg, rgba(204,120,92,0.2), rgba(168,85,247,0.1))"
                      : "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(99,102,241,0.08))",
                    border: skill.special
                      ? "1px solid rgba(204,120,92,0.4)"
                      : "1px solid rgba(168,85,247,0.2)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: skill.special ? "radial-gradient(circle at 50% 50%, rgba(204,120,92,0.25), transparent)" : "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.2), transparent)" }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: skill.special ? "linear-gradient(90deg, transparent, rgba(204,120,92,0.5), transparent)" : "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }}
                  />
                  <img src={skill.img} alt={skill.name}
                    className="w-12 h-12 mb-2 object-contain relative z-10"
                    style={skill.special ? { borderRadius: "50%", filter: "drop-shadow(0 0 8px rgba(204,120,92,0.6))" } : {}}
                  />
                  <span className="text-[9px] font-black uppercase tracking-tighter text-center leading-none relative z-10"
                    style={{ color: skill.special ? "rgba(204,120,92,0.9)" : "rgba(255,255,255,0.7)" }}
                  >
                    {skill.name}
                  </span>
                  {/* Claude badge */}
                  {skill.special && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="mt-1 px-1.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest"
                      style={{
                        background: "rgba(204,120,92,0.2)",
                        border: "1px solid rgba(204,120,92,0.4)",
                        color: "rgba(204,120,92,0.9)",
                      }}
                    >
                      
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

/* ══════════════════════════════════════
   MAIN SKILLS COMPONENT
══════════════════════════════════════ */
export default function Skills() {
  const mouse = useMouseParallax();

  const vizSkills = [
    { name: "NumPy",      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Pandas",     img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "Matplotlib", img: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" },
    { name: "Seaborn",    img: "https://seaborn.pydata.org/_static/logo-mark-lightbg.png" },
    { name: "Plotly",     img: plotlyLogo },
  ];

  const aiSkills = [
    { name: "Gemini",  img: geminiLogo },
    { name: "ChatGPT", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
    {
      name: "Claude",
      img: claudeLogo,
      special: true,   /* ← Claude ko special styling milegi */
    },
  ];

  const uiSkills = [
    { name: "Streamlit", img: streamlitLogo },
    { name: "Docker",    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "FastAPI",   img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  ];

  return (
    <section
      className="relative py-24 flex flex-col items-center px-6 min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020818 0%, #0a0f2e 40%, #0d0820 70%, #020818 100%)",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {/* GRID */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }} />

      {/* ORBS */}
      <motion.div className="absolute pointer-events-none"
        style={{
          top: "5%", left: "0%", width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #3b82f666, #6366f100)",
          filter: "blur(2px)", boxShadow: "inset 0 0 80px #3b82f633, 0 0 120px #3b82f622",
        }}
        animate={{ x: mouse.x * -25, y: mouse.y * -18 }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{
          bottom: "0%", right: "0%", width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle at 65% 35%, #a855f766, #a855f700)",
          filter: "blur(2px)", boxShadow: "inset 0 0 80px #a855f733, 0 0 120px #a855f722",
        }}
        animate={{ x: mouse.x * 22, y: mouse.y * 18 }}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
      />

      {/* PARTICLES */}
      {[...Array(18)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            background: ["#3b82f6","#8b5cf6","#a855f7","#06b6d4","#f59e0b"][i % 5],
          }}
          animate={{ y: [0, -50, 0], opacity: [0, 0.7, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      {/* HEADING */}
      <div className="relative z-10 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-3 inline-block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))",
            border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">✦ What I Work With ✦</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black tracking-tighter uppercase"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #c4b5fd 80%, #ffffff 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.4))",
          }}
        >
          Technical{" "}
          <span style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Capabilities
          </span>
        </motion.h2>

        <motion.div className="flex justify-center gap-2 mt-5">
          {["#3b82f6","#6366f1","#a855f7","#ec4899","#f59e0b"].map((c, i) => (
            <motion.div key={i} className="rounded-full" style={{ background: c, height: 4 }}
              initial={{ width: 0 }} whileInView={{ width: i === 2 ? 30 : 10 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            />
          ))}
        </motion.div>
      </div>

      {/* CARDS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl justify-items-center">
        <SkillCard title="Data Engine"  subtitle="Analysis & Insights"  icon={FaChartBar} skills={vizSkills} accentColor="#6366f1"  index={0} />
        <AIPowerCard skills={aiSkills} index={1} />
        <SkillCard title="Product UI"   subtitle="Deployment & Ops"     icon={FaRocket}   skills={uiSkills}  accentColor="#10b981"  index={2} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.3); border-radius: 10px; }
      `}</style>
    </section>
  );
}