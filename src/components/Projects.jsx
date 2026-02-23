import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaBrain, FaGithub, FaChartLine, FaCode } from "react-icons/fa";

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

export default function Projects() {
  const [isFlipped, setIsFlipped] = useState(false);
  const mouse = useMouseParallax();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="projects"
      className="relative py-24 flex flex-col items-center min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020818 0%, #0a0f2e 40%, #0d0820 70%, #020818 100%)",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {/* GRID */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* ORBS */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "5%", left: "0%", width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #3b82f666, #6366f100)",
          filter: "blur(2px)",
          boxShadow: "inset 0 0 80px #3b82f633, 0 0 120px #3b82f622",
        }}
        animate={{ x: mouse.x * -25, y: mouse.y * -18 }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "0%", right: "0%", width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle at 65% 35%, #6366f166, #a855f700)",
          filter: "blur(2px)",
          boxShadow: "inset 0 0 80px #6366f133, 0 0 120px #6366f122",
        }}
        animate={{ x: mouse.x * 22, y: mouse.y * 18 }}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
      />

      {/* PARTICLES */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: ["#3b82f6","#8b5cf6","#6366f1","#06b6d4","#f59e0b"][i % 5],
          }}
          animate={{ y: [0, -50, 0], opacity: [0, 0.7, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-20 px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-3 inline-block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#a5b4fc",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">✦ Featured Work ✦</span>
        </motion.div>

        <motion.h2
          className="text-5xl md:text-6xl font-black tracking-tighter uppercase"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #c4b5fd 80%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.4))",
          }}
        >
          Project{" "}
          <span style={{
            background: "linear-gradient(135deg, #818cf8, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Showcase
          </span>
        </motion.h2>

        <motion.div className="flex justify-center gap-2 mt-5">
          {["#3b82f6","#6366f1","#a855f7","#ec4899","#f59e0b"].map((c, i) => (
            <motion.div
              key={i} className="rounded-full" style={{ background: c, height: 4 }}
              initial={{ width: 0 }} whileInView={{ width: i === 2 ? 40 : 12 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* FLIP CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
        className="relative z-10"
        style={{ perspective: "2000px" }}
      >
        <motion.div
          className="absolute -inset-3 rounded-[3rem] pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(135deg, #6366f144, #a855f722, #3b82f633)",
            filter: "blur(12px)",
          }}
        />

        <div
          className="relative w-[340px] h-[480px] cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            style={{
              rotateX: isFlipped ? 0 : rotateX,
              rotateY: isFlipped ? 180 : rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateY: isFlipped ? 180 : 0,
              scale: isFlipped ? 1.04 : 1,
            }}
            transition={{
              duration: 0.9,
              type: "spring",
              stiffness: 55,
              damping: 13,
            }}
            className="relative w-full h-full"
          >

            {/* FRONT */}
            <div
              className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(1px)",
                background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(59,130,246,0.06) 50%, rgba(168,85,247,0.08) 100%)",
                border: "1.5px solid rgba(99,102,241,0.25)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }} />
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(99,102,241,0.2) 0%, transparent 65%)` }}
              />
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)" }} />
              <motion.div
                className="absolute top-0 right-0 w-36 h-36 pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ background: "radial-gradient(circle at 100% 0%, rgba(99,102,241,0.2), transparent 70%)" }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-36 h-36 pointer-events-none"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                style={{ background: "radial-gradient(circle at 0% 100%, rgba(59,130,246,0.15), transparent 70%)" }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-10" style={{ transform: "translateZ(60px)" }}>
                <motion.div
                  animate={{ y: [0, -14, 0], rotateZ: [0, 6, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative mb-8"
                >
                  <motion.div
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-5 rounded-full pointer-events-none"
                    style={{ border: "1px dashed rgba(99,102,241,0.35)" }}
                  />
                  <motion.div
                    animate={{ rotateZ: -360 }}
                    transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-9 rounded-full pointer-events-none"
                    style={{ border: "1px dashed rgba(168,85,247,0.2)" }}
                  />
                  <motion.div
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute pointer-events-none"
                    style={{ top: "-20px", left: "50%", marginLeft: -4 }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: "#6366f1", boxShadow: "0 0 8px #6366f1" }} />
                  </motion.div>

                  <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(168,85,247,0.2))",
                      border: "1.5px solid rgba(99,102,241,0.4)",
                      boxShadow: "0 0 40px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                    }}
                  >
                    <FaBrain size={48} style={{ color: "#a5b4fc" }} />
                  </div>
                </motion.div>

                <h3
                  className="text-3xl font-black mb-2 text-center leading-tight uppercase tracking-tighter"
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #c4b5fd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 16px rgba(99,102,241,0.5))",
                  }}
                >
                  AI Marks <br /> Analyzer
                </h3>

                <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em] mb-10" style={{ color: "#818cf8" }}>
                  <FaChartLine /> Machine Learning
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.2))",
                    border: "1px solid rgba(99,102,241,0.5)",
                    color: "#c4b5fd",
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                  <FaCode className="animate-pulse relative z-10" />
                  <span className="relative z-10">Click to Reveal</span>
                </motion.div>
              </div>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 w-full h-full rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden"
              style={{
                transform: "rotateY(180deg) translateZ(1px)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(59,130,246,0.07) 50%, rgba(168,85,247,0.1) 100%)",
                border: "1.5px solid rgba(99,102,241,0.3)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }} />
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, rgba(168,85,247,0.15), transparent 70%)" }} />
              <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(circle at 0% 100%, rgba(99,102,241,0.12), transparent 70%)" }} />

              <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                <div className="flex justify-between items-center mb-6">
                  <h3
                    className="text-2xl font-black uppercase tracking-tighter"
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #c4b5fd)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Specs
                  </h3>
                  <div className="p-2 rounded-xl" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}>
                    <FaBrain size={18} style={{ color: "#a5b4fc" }} />
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-8 font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Predictive analytics engine using Scikit-Learn to decode student performance trends and provide actionable academic feedback.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Python", "ML", "Streamlit", "Pandas"].map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))",
                        border: "1px solid rgba(99,102,241,0.3)",
                        color: "#c4b5fd",
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.a
                href="https://github.com/chirag349/ai-assisted-marks-analyzer"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
                <FaGithub size={20} className="relative z-10" />
                <span className="relative z-10">GitHub Repository</span>
              </motion.a>
            </div>

          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}