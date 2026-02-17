import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaBrain, FaGithub, FaChartLine, FaCode } from "react-icons/fa";

export default function Projects() {
  const [isFlipped, setIsFlipped] = useState(false);

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  // Dynamic Glow position
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="projects" className="py-24 flex flex-col items-center bg-white relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 px-6 relative z-10"
      >
        <span className="text-indigo-600 font-black tracking-[0.3em] uppercase text-xs mb-3 block">Featured Work</span>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
          PROJECT <span className="text-indigo-600">SHOWCASE</span>
        </h2>
        <div className="h-1.5 w-24 bg-indigo-600 mx-auto mt-6 rounded-full" />
      </motion.div>

      {/* 3D PROJECT CARD */}
      <div 
        className="relative w-[340px] h-[460px] cursor-pointer perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          style={{ 
            rotateX: isFlipped ? 0 : rotateX, 
            rotateY: isFlipped ? 180 : rotateY,
            transformStyle: "preserve-3d" 
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
          className="relative w-full h-full shadow-2xl rounded-[2.5rem]"
        >
          
          {/* FRONT SIDE */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-[2.5rem] border border-slate-100 p-10 flex flex-col items-center justify-center overflow-hidden"
            style={{ transform: "translateZ(0px)" }}
          >
            {/* Interactive Glow Effect */}
            <motion.div 
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ 
                background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(99, 102, 241, 0.15) 0%, transparent 70%)` 
              }}
            />

            <div className="relative z-10 flex flex-col items-center" style={{ transform: "translateZ(50px)" }}>
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-slate-100"
              >
                <FaBrain size={48} className="text-indigo-600" />
              </motion.div>
              
              <h3 className="text-3xl font-black text-slate-900 mb-3 text-center leading-tight">
                AI Marks <br/> Analyzer
              </h3>
              <div className="flex items-center gap-2 text-indigo-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-10">
                <FaChartLine /> Machine Learning
              </div>
              
              <div className="flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                <FaCode className="animate-pulse" /> Explore Project
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden bg-slate-900 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{ transform: "rotateY(180deg) translateZ(1px)" }}
          >
             {/* Subtle Background Pattern for Back */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Specs</h3>
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                   <FaBrain size={18} />
                </div>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                Predictive analytics engine using Scikit-Learn to decode student performance trends and provide actionable academic feedback.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Python", "ML", "Streamlit", "Pandas"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white/5 text-white text-[9px] font-black uppercase tracking-widest rounded-xl border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <motion.a
              href="https://github.com/chirag349/ai-assisted-marks-analyzer"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative z-10 w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl"
            >
              <FaGithub size={20} />
              GitHub Repository
            </motion.a>
          </div>

        </motion.div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1200px; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
    </section>
  );
}