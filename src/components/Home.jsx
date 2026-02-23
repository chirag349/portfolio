import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import ProfilePic from "../assets/profile.png";

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

function Typewriter({ words }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        }
      }
    }, deleting ? 45 : 90);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);

  return (
    <span>
      <span style={{
        background: "linear-gradient(135deg, #818cf8, #c4b5fd)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 12px rgba(129,140,248,0.5))",
      }}>
        {text}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ color: "#818cf8", marginLeft: 2 }}
      >|</motion.span>
    </span>
  );
}

function CodeTag({ label, style, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { delay, duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute pointer-events-none select-none hidden md:block"
      style={{
        ...style,
        background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))",
        border: "1px solid rgba(99,102,241,0.25)",
        backdropFilter: "blur(8px)",
        borderRadius: 10,
        padding: "5px 12px",
        fontSize: "0.7rem",
        fontFamily: "'DM Mono', monospace",
        color: "rgba(165,180,252,0.8)",
        fontWeight: 600,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {label}
    </motion.div>
  );
}

function Profile3D({ mouse }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 100, damping: 20 });
  const my = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-18deg", "18deg"]);

  useEffect(() => {
    x.set(mouse.x * 0.3);
    y.set(mouse.y * 0.3);
  }, [mouse]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="relative w-52 h-52 sm:w-64 sm:h-64"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-3 rounded-full pointer-events-none"
        style={{ border: "1.5px dashed rgba(99,102,241,0.35)" }}
      />
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-7 rounded-full pointer-events-none"
        style={{ border: "1px dashed rgba(168,85,247,0.2)" }}
      />
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute pointer-events-none"
        style={{ top: "-12px", left: "50%", marginLeft: -5, transformOrigin: "5px 118px" }}
      >
        <div className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#6366f1", boxShadow: "0 0 10px #6366f1, 0 0 20px #6366f144" }}
        />
      </motion.div>
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute pointer-events-none"
        style={{ top: "-28px", left: "50%", marginLeft: -4, transformOrigin: "4px 134px" }}
      >
        <div className="w-2 h-2 rounded-full"
          style={{ background: "#a855f7", boxShadow: "0 0 8px #a855f7" }}
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))",
          border: "2px solid rgba(99,102,241,0.4)",
          boxShadow: "0 0 60px rgba(99,102,241,0.3), 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          transform: "translateZ(30px)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none z-10"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)", borderRadius: "inherit" }}
        />
        <img
          src={ProfilePic}
          alt="Chirag Singh"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      <div
        className="absolute left-4 right-4 -bottom-6 rounded-full pointer-events-none"
        style={{
          height: 20,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.4), transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </motion.div>
  );
}

export default function Home() {
  const mouse = useMouseParallax();

  const words = [
    "Python Developer",
    "Data Analyst",
    "ML Engineer",
    "Streamlit Builder",
    "AI Enthusiast",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center text-center px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020818 0%, #0a0f2e 40%, #0d0820 70%, #020818 100%)",
        fontFamily: "'Syne', sans-serif",
        paddingTop: "clamp(6rem, 15vw, 10rem)",
      }}
    >

      {/* GRID */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
      }} />

      {/* ORBS */}
      <motion.div className="absolute pointer-events-none"
        style={{
          top: "5%", left: "-5%", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #3b82f655, #6366f100)",
          filter: "blur(2px)",
          boxShadow: "inset 0 0 100px #3b82f622, 0 0 150px #3b82f611",
        }}
        animate={{ x: mouse.x * -30, y: mouse.y * -20 }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{
          bottom: "0%", right: "-5%", width: 450, height: 450, borderRadius: "50%",
          background: "radial-gradient(circle at 65% 35%, #a855f755, #a855f700)",
          filter: "blur(2px)",
          boxShadow: "inset 0 0 100px #a855f722, 0 0 150px #a855f711",
        }}
        animate={{ x: mouse.x * 25, y: mouse.y * 20 }}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{
          top: "40%", left: "40%", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, #06b6d433, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: mouse.x * 15, y: mouse.y * 10, scale: [1, 1.1, 1] }}
        transition={{ type: "spring", stiffness: 40, damping: 20, scale: { duration: 4, repeat: Infinity } }}
      />

      {/* PARTICLES */}
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            background: ["#3b82f6","#8b5cf6","#a855f7","#06b6d4","#f59e0b","#ec4899"][i % 6],
          }}
          animate={{ y: [0, -60, 0], opacity: [0, 0.8, 0], scale: [0.5, 2, 0.5] }}
          transition={{ duration: 4 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 6 }}
        />
      ))}

      {/* FLOATING CODE TAGS */}
      <CodeTag label="import pandas as pd"  style={{ top: "22%", left: "4%"   }} delay={1.2} />
      <CodeTag label="model.fit(X, y)"      style={{ top: "35%", right: "3%"  }} delay={1.5} />
      <CodeTag label="plt.show()"           style={{ top: "60%", left: "5%"   }} delay={1.8} />
      <CodeTag label="streamlit.run()"      style={{ bottom: "25%", right: "4%" }} delay={2.0} />
      <CodeTag label="df.describe()"        style={{ top: "15%", right: "8%"  }} delay={2.3} />

      {/* MAIN CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center"
      >

        {/* STATUS BADGE */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))",
              border: "1px solid rgba(99,102,241,0.35)",
              color: "#a5b4fc",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full relative z-10"
              style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
            />
            <span className="relative z-10">Available for Opportunities</span>
          </motion.div>
        </motion.div>

        {/* 3D PROFILE */}
        <motion.div variants={itemVariants} className="mb-10">
          <Profile3D mouse={mouse} />
        </motion.div>

        {/* NAME */}
        <motion.div variants={itemVariants}>
          <h1
            className="font-black leading-none mb-3"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 40%, #c4b5fd 70%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 50px rgba(99,102,241,0.4))",
              letterSpacing: "-0.03em",
            }}
          >
            Chirag Singh
          </h1>
        </motion.div>

        {/* TYPEWRITER */}
        <motion.div variants={itemVariants} className="mb-6" style={{ minHeight: "2.5rem" }}>
          <h2
            className="font-black"
            style={{ fontSize: "clamp(1.1rem, 3vw, 1.8rem)", letterSpacing: "-0.01em" }}
          >
            <Typewriter words={words} />
          </h2>
        </motion.div>

        {/* BIO */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl mb-10 leading-relaxed mx-auto"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          I blend{" "}
          <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>AI with thoughtful design</span>{" "}
          to build intelligent, seamless digital experiences and{" "}
          <span style={{
            background: "linear-gradient(135deg, #c4b5fd, #f0abfc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
          }}>
            data-driven solutions.
          </span>
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-10 py-4 rounded-2xl font-black text-white flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 8px 32px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              textDecoration: "none",
            }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
            <div className="absolute bottom-0 left-2 right-2 h-1.5 rounded-b-2xl"
              style={{ background: "rgba(0,0,0,0.2)", filter: "blur(2px)" }}
            />
            <span className="relative z-10">View My Work</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="relative z-10"
            >→</motion.span>
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1.5px solid rgba(99,102,241,0.35)",
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              backdropFilter: "blur(10px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
              textDecoration: "none",
            }}
          >
            <span className="relative z-10">Contact Me</span>
          </motion.a>
        </motion.div>

      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1.5px solid rgba(99,102,241,0.4)" }}
        >
          <div className="w-1 h-2 rounded-full"
            style={{ background: "linear-gradient(180deg, #6366f1, transparent)" }}
          />
        </motion.div>
        <p className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.2)" }}>
          Scroll
        </p>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}