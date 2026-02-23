import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope,
} from "react-icons/fa";

function use3DTilt(strength = 15) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 300, damping: 30 });
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);
  const onMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return { ref, rotateX, rotateY, glareX, glareY, onMouseMove, onMouseLeave };
}

function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function SkillChip({ skill, index }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt(20);
  const colors = [
    ["#3b82f6", "#8b5cf6"],
    ["#06b6d4", "#3b82f6"],
    ["#8b5cf6", "#ec4899"],
    ["#f59e0b", "#ef4444"],
    ["#10b981", "#06b6d4"],
  ];
  const [c1, c2] = colors[index % colors.length];
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600 }}
      initial={{ opacity: 0, y: 40, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, type: "spring" }}
      viewport={{ once: true }}
      className="relative cursor-default select-none"
    >
      <div className="absolute inset-0 rounded-2xl" style={{
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        transform: "translateZ(-8px) translateY(6px)",
        filter: "blur(8px)", opacity: 0.5,
      }} />
      <motion.div
        className="relative px-6 py-3 rounded-2xl font-bold text-white text-base overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${c1}22, ${c2}22)`,
          border: `1.5px solid ${c1}55`,
          backdropFilter: "blur(12px)",
        }}
        whileHover={{ background: `linear-gradient(135deg, ${c1}cc, ${c2}cc)`, scale: 1.08 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
          borderRadius: "inherit",
        }} />
        <span className="relative z-10" style={{ color: "white", textShadow: `0 0 20px ${c1}` }}>{skill}</span>
      </motion.div>
    </motion.div>
  );
}

function SocialIcon({ social, index }) {
  const Icon = social.icon;
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt(25);
  return (
    <motion.a
      ref={ref}
      href={social.link}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 500 }}
      initial={{ opacity: 0, scale: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: 0.9 + index * 0.1, type: "spring", stiffness: 200 }}
      whileTap={{ scale: 0.9 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: social.color, filter: "blur(12px)", transform: "translateZ(-10px) translateY(6px) scale(0.9)" }}
      />
      <motion.div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: "rgba(15,23,42,0.8)",
          border: "1.5px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          transformStyle: "preserve-3d",
        }}
        whileHover={{ borderColor: social.color + "88" }}
      >
        <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)", borderRadius: "inherit" }}
        />
        <Icon className="text-2xl relative z-10 transition-all duration-300" style={{ color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = social.color)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
        />
      </motion.div>
    </motion.a>
  );
}

function Orb({ style, color1, color2, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle at 35% 35%, ${color1}, ${color2}00)`,
        boxShadow: `inset 0 0 60px ${color1}44, 0 0 80px ${color1}22`,
        ...style,
      }}
      animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.1, 1], rotateZ: [0, 15, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function About() {
  const mouse = useMouseParallax();
  const bioTilt = use3DTilt(8);

  const skills = [
    "Python", "Pandas", "Matplotlib", "Seaborn",
    "Bokeh", "Plotly", "Numpy", "Streamlit", "Scikit-learn"
  ];

  const socials = [
    { icon: FaGithub,    link: "https://github.com/chirag349",                                   color: "#ffffff" },
    { icon: FaLinkedin,  link: "https://www.linkedin.com/in/chirag-singh-55149b277",             color: "#0077b5" },
    { icon: FaTwitter,   link: "https://x.com/skchiragsingh",                                   color: "#1DA1F2" },
    { icon: FaInstagram, link: "https://www.instagram.com/chirxg.04?igsh=MWlrOTFydWRoa2U3Zg==", color: "#E4405F" },
    { icon: FaWhatsapp,  link: "https://wa.me/918287746942?text=hi%20chirag%20from%20portfolio", color: "#25D366" },
    { icon: FaEnvelope,  link: "mailto:skchiragsingh@gmail.com",                                 color: "#EA4335" },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020818 0%, #0a0f2e 40%, #0d0820 70%, #020818 100%)",
        perspective: "1200px",
      }}
    >
      {/* GRID */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }} />

      {/* ORBS */}
      <motion.div className="absolute pointer-events-none"
        style={{
          top: "10%", left: "5%", width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #3b82f688, #6366f100)",
          filter: "blur(1px)",
          boxShadow: "inset 0 0 80px #3b82f633, 0 0 120px #3b82f622",
        }}
        animate={{ x: mouse.x * -30, y: mouse.y * -20 }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{
          bottom: "5%", right: "5%", width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle at 65% 35%, #8b5cf688, #a855f700)",
          filter: "blur(1px)",
          boxShadow: "inset 0 0 80px #8b5cf633, 0 0 120px #8b5cf622",
        }}
        animate={{ x: mouse.x * 25, y: mouse.y * 20 }}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
      />
      <Orb
        style={{ top: "50%", left: "50%", width: 200, height: 200, marginLeft: -100, marginTop: -100, opacity: 0.3 }}
        color1="#06b6d4" color2="#3b82f6" duration={10} delay={2}
      />

      {/* PARTICLES */}
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 4 + 1, height: Math.random() * 4 + 1,
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            background: ["#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b"][i % 4],
          }}
          animate={{ y: [0, -60, 0], opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">

        {/* BADGE */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotateX: -90 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="mb-6 px-6 py-2 rounded-full text-sm font-bold relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #3b82f622, #8b5cf622)",
              border: "1px solid #3b82f644",
              color: "#93c5fd",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 30px #3b82f622, inset 0 1px 0 rgba(255,255,255,0.1)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: "0.72rem",
            }}
          >
            <span className="relative z-10">✦ Python Data Specialist ✦</span>
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, type: "spring" }}
          className="text-6xl md:text-8xl font-black mb-4 text-center"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #c4b5fd 70%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.4))",
            letterSpacing: "-0.03em",
          }}
        >
          About Me
        </motion.h1>

        {/* UNDERLINE DOTS */}
        <motion.div className="mb-14 flex gap-2 items-center">
          {["#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b", "#ef4444"].map((c, i) => (
            <motion.div key={i} className="rounded-full" style={{ background: c, height: 4 }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: i === 2 ? 40 : 12, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
            />
          ))}
        </motion.div>

        {/* BIO CARD */}
        <motion.div
          ref={bioTilt.ref}
          onMouseMove={bioTilt.onMouseMove}
          onMouseLeave={bioTilt.onMouseLeave}
          style={{
            rotateX: bioTilt.rotateX,
            rotateY: bioTilt.rotateY,
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="w-full max-w-3xl mb-16"
        >
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
            />
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{ background: "radial-gradient(circle at 100% 0%, rgba(139,92,246,0.15), transparent 70%)" }}
            />
            <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
              style={{ background: "radial-gradient(circle at 0% 100%, rgba(59,130,246,0.12), transparent 70%)" }}
            />

            {/* ── UPDATED BIO TEXT WITH ML ── */}
            <p className="text-center leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem" }}>
              I'm{" "}
              <span className="font-black" style={{
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 12px rgba(99,102,241,0.6))",
              }}>
                Chirag Singh
              </span>
              , a passionate Python developer specializing in{" "}
              <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>
                data analysis, visualization, and machine learning
              </span>.
              <br className="hidden md:block" /><br className="hidden md:block" />
              I transform complex datasets into compelling visual stories using Python, Pandas, Matplotlib, Seaborn, Bokeh, and Plotly — and build{" "}
              <span style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}>
                predictive ML models
              </span>{" "}
              with Scikit-learn to uncover hidden patterns in data.
              <br className="hidden md:block" /><br className="hidden md:block" />
              From{" "}
              <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>
                regression & classification
              </span>{" "}
              to{" "}
              <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>
                clustering & feature engineering
              </span>
              , I turn raw numbers into actionable intelligence.
              <br className="hidden md:block" /><br className="hidden md:block" />
              My focus is on creating{" "}
              <span style={{
                background: "linear-gradient(135deg, #c4b5fd, #f0abfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}>
                insightful, interactive solutions
              </span>{" "}
              with clean code, intuitive dashboards, and AI-powered experiences that actually make a difference.
            </p>
          </div>
        </motion.div>

        {/* SKILLS */}
        <motion.div className="w-full max-w-4xl mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center font-black mb-10"
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: "1.8rem",
              background: "linear-gradient(135deg, #ffffff, #93c5fd)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Technical Skills
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => <SkillChip key={skill} skill={skill} index={i} />)}
          </div>
        </motion.div>

        {/* SOCIALS */}
        <motion.div className="mb-14" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center font-black mb-8"
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: "1.8rem",
              background: "linear-gradient(135deg, #ffffff, #c4b5fd)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Let's Connect
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s, i) => <SocialIcon key={i} social={s} index={i} />)}
          </div>
        </motion.div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ perspective: 600 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, rotateX: -5, y: -4 }}
            whileTap={{ scale: 0.95, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ transformStyle: "preserve-3d", display: "inline-block" }}
            className="relative group"
          >
            <motion.div
              className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
                filter: "blur(16px)",
                transform: "translateZ(-10px)",
              }}
            />
            <div className="relative px-14 py-5 rounded-full font-black text-white text-lg overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                Let's Collaborate
                <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
              </span>
            </div>
            <div className="absolute bottom-0 left-4 right-4 h-2 rounded-b-full"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #4338ca, #6d28d9)",
                transform: "translateY(4px) translateZ(-8px)",
                filter: "blur(2px)", opacity: 0.7,
              }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}