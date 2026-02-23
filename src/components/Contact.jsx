import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane, FaWhatsapp } from "react-icons/fa";

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

function SocialCard({ item, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600 }}
      className="relative group block"
    >
      {/* Glow shadow */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: item.glow, filter: "blur(8px)" }}
      />
      <div
        className="relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          transform: "translateZ(20px)",
        }}
      >
        {/* Top shine */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
        {/* Hover fill */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: item.glow.replace("44","11") }}
        />

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 p-3 rounded-xl text-white flex-shrink-0"
          style={{
            background: item.glow,
            boxShadow: `0 4px 16px ${item.glowColor}44`,
          }}
        >
          {item.icon}
        </motion.div>

        <div className="relative z-10">
          <p className="text-[10px] uppercase font-black tracking-widest" style={{ color: item.glowColor }}>{item.label}</p>
          <p className="font-bold text-sm truncate w-32" style={{ color: "rgba(255,255,255,0.8)" }}>{item.value}</p>
        </div>
      </div>
    </motion.a>
  );
}

const Contact = () => {
  const mouse = useMouseParallax();
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const socialLinks = [
    {
      icon: <FaEnvelope size={16} />,
      label: "Email",
      value: "skchiragsingh@gmail.com",
      glow: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      glowColor: "#60a5fa",
      link: "mailto:skchiragsingh@gmail.com",
    },
    {
      icon: <FaLinkedin size={16} />,
      label: "LinkedIn",
      value: "chirag-singh",
      glow: "linear-gradient(135deg, #6366f1, #3b82f6)",
      glowColor: "#818cf8",
      link: "https://www.linkedin.com/in/chirag-singh-55149b277",
    },
    {
      icon: <FaGithub size={16} />,
      label: "GitHub",
      value: "chirag349",
      glow: "linear-gradient(135deg, #8b5cf6, #6366f1)",
      glowColor: "#a78bfa",
      link: "https://github.com/chirag349",
    },
    {
      icon: <FaWhatsapp size={16} />,
      label: "WhatsApp",
      value: "chirag singh",
      glow: "linear-gradient(135deg, #10b981, #06b6d4)",
      glowColor: "#34d399",
      link: "https://wa.me/8287746942",
    },
  ];

  const inputStyle = (field) => ({
    width: "100%",
    padding: "1rem 1.1rem",
    borderRadius: "14px",
    background: focused === field
      ? "rgba(99,102,241,0.08)"
      : "rgba(255,255,255,0.03)",
    border: focused === field
      ? "1.5px solid rgba(99,102,241,0.5)"
      : "1.5px solid rgba(255,255,255,0.07)",
    outline: "none",
    color: "rgba(255,255,255,0.9)",
    fontFamily: "'Syne', sans-serif",
    fontSize: "0.9rem",
    transition: "all 0.25s",
    boxShadow: focused === field
      ? "0 0 20px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.04)"
      : "inset 0 1px 0 rgba(255,255,255,0.03)",
  });

  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-20 overflow-hidden flex flex-col items-center min-h-screen"
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
        className="relative z-10 text-center mb-16"
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
          <span className="relative z-10">✦ Available for Opportunities ✦</span>
        </motion.div>

        <motion.h2
          className="text-5xl md:text-6xl font-black tracking-tighter"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #c4b5fd 80%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.4))",
          }}
        >
          Get in{" "}
          <span style={{
            background: "linear-gradient(135deg, #818cf8, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Touch
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

      {/* MAIN GRID */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

        {/* LEFT: Social Cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <motion.h3
            className="text-2xl md:text-3xl font-black mb-2 leading-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Let's build something <br />
            <span style={{
              background: "linear-gradient(135deg, #818cf8, #c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              amazing together.
            </span>
          </motion.h3>

          <p className="text-sm mb-8 font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            Open to freelance, collab, or full-time roles. Hit me up!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((item, i) => (
              <SocialCard key={i} item={item} index={i} />
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
          style={{ perspective: "1000px" }}
        >
          {/* Form card glow */}
          <motion.div
            className="absolute -inset-1 rounded-[2.8rem] pointer-events-none"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: "linear-gradient(135deg, #6366f133, #a855f722)",
              filter: "blur(10px)",
            }}
          />

          <div
            className="relative rounded-[2.5rem] p-8 md:p-10 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.05) 100%)",
              border: "1.5px solid rgba(99,102,241,0.2)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            {/* Inner grid */}
            <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] overflow-hidden" style={{
              backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }} />
            {/* Top shine */}
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-[2.5rem]" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, rgba(168,85,247,0.12), transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle at 0% 100%, rgba(99,102,241,0.1), transparent 70%)" }} />

            {!sent ? (
              <form
                className="relative z-10 flex flex-col gap-5"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>Full Name</label>
                    <input
                      type="text"
                      required
                      style={inputStyle("name")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>Email Address</label>
                    <input
                      type="email"
                      required
                      style={inputStyle("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>Your Message</label>
                  <textarea
                    rows="4"
                    required
                    style={{ ...inputStyle("msg"), resize: "none" }}
                    onFocus={() => setFocused("msg")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative mt-2 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "white",
                    boxShadow: "0 8px 32px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  />
                  <FaPaperPlane className="relative z-10" size={14} />
                  <span className="relative z-10">Send Message</span>
                </motion.button>
              </form>
            ) : (
              /* SUCCESS STATE */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative z-10 flex flex-col items-center justify-center py-16 text-center"
              >
                {/* Orbiting success icon */}
                <motion.div className="relative mb-6">
                  <motion.div
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-5 rounded-full"
                    style={{ border: "1px dashed rgba(99,102,241,0.4)" }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.2))",
                      border: "1.5px solid rgba(99,102,241,0.4)",
                      boxShadow: "0 0 40px rgba(99,102,241,0.3)",
                    }}
                  >
                    🚀
                  </motion.div>
                </motion.div>

                <h3
                  className="text-2xl font-black mb-2"
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #c4b5fd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
                  Chirag will get back to you soon ✦
                </p>
                <motion.button
                  onClick={() => setSent(false)}
                  whileHover={{ scale: 1.05 }}
                  className="mt-8 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest"
                  style={{
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    color: "#a5b4fc",
                  }}
                >
                  Send Another
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* FOOTER */}
      <motion.div
        className="relative z-10 mt-24 text-center w-full pt-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem", letterSpacing: "0.08em" }}>
          © 2026 Chirag Singh · Built with React & Framer Motion ✦
        </p>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </section>
  );
};

export default Contact;