import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope, FaHeart, FaCode, FaStar,
} from "react-icons/fa";

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

function SocialBtn({ social, index }) {
  const Icon = social.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 200, damping: 20 });
  const my = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noreferrer"
      title={social.name}
      initial={{ opacity: 0, y: 40, scale: 0.6 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 180 }}
      viewport={{ once: true }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 500 }}
      className="relative group"
      whileTap={{ scale: 0.88 }}
    >
      {/* Glow blob behind */}
      <div
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: social.glow, filter: "blur(12px)" }}
      />

      {/* Card */}
      <motion.div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
          border: "1.5px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          transform: "translateZ(20px)",
        }}
        whileHover={{ borderColor: social.glowColor + "88" }}
        transition={{ duration: 0.2 }}
      >
        {/* Top shine */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
        />
        {/* Hover fill */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${social.glowColor}18` }}
        />
        <Icon
          size={22}
          className="relative z-10 transition-all duration-300"
          style={{ color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = social.glowColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        />
      </motion.div>

      {/* Tooltip */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap"
        style={{
          background: "rgba(5,10,30,0.95)",
          border: `1px solid ${social.glowColor}44`,
          color: social.glowColor,
          backdropFilter: "blur(10px)",
          boxShadow: `0 4px 16px ${social.glowColor}22`,
        }}
      >
        {social.name}
        {/* Tooltip arrow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
          style={{ background: "rgba(5,10,30,0.95)", border: `1px solid ${social.glowColor}44`, borderTop: "none", borderLeft: "none" }}
        />
      </div>
    </motion.a>
  );
}

export default function Footer() {
  const mouse = useMouseParallax();
  const year = new Date().getFullYear();

  const socials = [
    { icon: FaGithub,    link: "https://github.com/chirag349",                                   name: "GitHub",    glow: "linear-gradient(135deg,#ffffff33,#ffffff11)", glowColor: "#ffffff" },
    { icon: FaLinkedin,  link: "https://linkedin.com/in/chirag-singh-55149b277",                 name: "LinkedIn",  glow: "linear-gradient(135deg,#0077b555,#00558244)", glowColor: "#0077b5" },
    { icon: FaInstagram, link: "https://www.instagram.com/chirxg.04",                            name: "Instagram", glow: "linear-gradient(135deg,#833ab455,#fd1d1d44)", glowColor: "#e1306c" },
    { icon: FaWhatsapp,  link: "https://wa.me/918287746942",                                     name: "WhatsApp",  glow: "linear-gradient(135deg,#25D36655,#128C7E44)", glowColor: "#25D366" },
    { icon: FaEnvelope,  link: "mailto:skchiragsingh@gmail.com",                                 name: "Email",     glow: "linear-gradient(135deg,#EA433555,#c5221f44)", glowColor: "#EA4335" },
  ];

  const stack = ["React", "Framer Motion", "Tailwind", "Python", "Streamlit"];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-20 text-center"
      style={{
        background: "linear-gradient(135deg, #020818 0%, #0a0f2e 50%, #020818 100%)",
        borderTop: "1px solid rgba(99,102,241,0.15)",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {/* GRID */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* ORBS */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-10%", left: "-5%", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #3b82f655, #6366f100)",
          filter: "blur(2px)",
          boxShadow: "inset 0 0 60px #3b82f622, 0 0 80px #3b82f611",
        }}
        animate={{ x: mouse.x * -20, y: mouse.y * -15 }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%", right: "-5%", width: 280, height: 280, borderRadius: "50%",
          background: "radial-gradient(circle at 65% 35%, #a855f755, #a855f700)",
          filter: "blur(2px)",
          boxShadow: "inset 0 0 60px #a855f722, 0 0 80px #a855f711",
        }}
        animate={{ x: mouse.x * 18, y: mouse.y * 14 }}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
      />

      {/* PARTICLES */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: ["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ec4899"][i % 5],
          }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <span
            className="inline-block px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))",
              border: "1px solid rgba(99,102,241,0.35)",
              color: "#a5b4fc",
              boxShadow: "0 0 20px rgba(99,102,241,0.1)",
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">✦ Made with passion ✦</span>
          </span>
        </motion.div>

        {/* TAGLINE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-black mb-4 leading-tight"
          style={{
            background: "linear-gradient(135deg, #ffffff, #93c5fd, #c4b5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 30px rgba(99,102,241,0.3))",
          }}
        >
          Built with an{" "}
          <span style={{
            background: "linear-gradient(135deg, #818cf8, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Advanced Stack
          </span>{" "}
          & a Supportive Partner
        </motion.h2>

        {/* CREDITS */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          viewport={{ once: true }}
          className="text-sm mb-7"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <span className="flex items-center justify-center gap-2 flex-wrap">
            © {year}{" "}
            <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 800 }}>
              Chirag Singh
            </span>
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block" }}
            >
              <FaHeart size={11} style={{ color: "#ec4899" }} />
            </motion.span>
            
              <a
              href="https://mokshbhardwaj.netlify.app"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#818cf8", fontWeight: 800, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
            >
              Moksh Bhardwaj
            </a>
          </span>
        </motion.p>

        {/* TECH STACK PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {stack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.07, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.12, y: -4 }}
              className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest cursor-default relative overflow-hidden"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.22)",
                color: "rgba(165,180,252,0.85)",
              }}
            >
              <FaCode className="inline mr-1 opacity-50" size={8} />
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* STARS ROW — unique touch */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-8"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            >
              <FaStar size={10} style={{ color: ["#f59e0b","#818cf8","#ec4899","#06b6d4","#a78bfa"][i] }} />
            </motion.div>
          ))}
        </motion.div>

        {/* DIVIDER */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 rounded-full"
          style={{
            height: 1,
            maxWidth: 340,
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(168,85,247,0.5), transparent)",
          }}
        />

        {/* SOCIAL ICONS */}
        <div className="flex justify-center flex-wrap gap-4 sm:gap-5 mb-10">
          {socials.map((s, i) => (
            <SocialBtn key={i} social={s} index={i} />
          ))}
        </div>

        {/* BOTTOM TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.12)" }}
        >
          Designed & Developed in India 🇮🇳 · {year}
        </motion.p>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </motion.footer>
  );
}