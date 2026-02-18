import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaMousePointer, FaTimes, FaChartBar, FaRocket, FaBrain } from "react-icons/fa";

// Assets local imports
import streamlitLogo from "../assets/streamlit.png";
import plotlyLogo from "../assets/Plotly.png"; 
import geminiLogo from "../assets/gemini.png"; // Your local Gemini asset

const SkillCard = ({ title, subtitle, icon: Icon, skills, accentColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Mouse movement values for 3D tilt effect
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
    <div 
      className="relative w-full max-w-[340px] h-[480px] perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
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
        className="relative w-full h-full cursor-pointer"
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl overflow-hidden">
          {/* Dynamic Glow Effect */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ background: `radial-gradient(circle at ${glowX} ${glowY}, ${accentColor}15 0%, transparent 70%)` }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center" style={{ transform: "translateZ(60px)" }}>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 p-5 rounded-3xl shadow-inner bg-slate-50" 
              style={{ color: accentColor }}
            >
              <Icon size={40} />
            </motion.div>
            <h3 className="text-3xl font-black text-slate-800 mb-2 leading-tight">{title}</h3>
            <p className="text-slate-400 font-medium mb-12 text-sm uppercase tracking-widest">{subtitle}</p>
            <div className="flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-tighter shadow-lg">
              <FaMousePointer className="animate-bounce" /> Flip Card
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 flex flex-col"
          style={{ transform: "rotateY(180deg) translateZ(1px)" }}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 leading-none">The Stack</h3>
            <FaTimes className="text-slate-300" size={14} />
          </div>

          <div className="grid grid-cols-2 gap-4 flex-grow overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {isFlipped && skills.map((skill, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all"
                >
                  <img 
                    src={skill.img} 
                    alt={skill.name} 
                    className="w-10 h-10 mb-2 object-contain" 
                  />
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter text-center leading-none">{skill.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Skills() {
  const vizSkills = [
    { name: "NumPy", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "Matplotlib", img: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" },
    { name: "Seaborn", img: "https://seaborn.pydata.org/_static/logo-mark-lightbg.png" },
    { name: "Plotly", img: plotlyLogo },
  ];

  const aiSkills = [
    { name: "Gemini", img: geminiLogo }, // Local asset used here
    { name: "ChatGPT", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  ];

  const uiSkills = [
    { name: "Streamlit", img: streamlitLogo }, 
    { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "FastAPI", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    
  ];

  return (
    <section className="py-24 bg-white flex flex-col items-center px-6 min-h-screen font-sans">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Technical <span className="text-indigo-600">Capabilities</span>
        </motion.h2>
        <div className="h-1.5 w-24 bg-indigo-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* Responsive Grid for 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl justify-items-center">
        {/* Card 1 */}
        <SkillCard 
          title="Data Engine"
          subtitle="Analysis & Insights"
          icon={FaChartBar}
          skills={vizSkills}
          accentColor="#6366f1"
        />

        {/* Card 2: AI Powered Tools */}
        <SkillCard 
          title="AI Power"
          subtitle="LLMs & Neural Nets"
          icon={FaBrain}
          skills={aiSkills}
          accentColor="#8b5cf6"
        />
        
        {/* Card 3 */}
        <SkillCard 
          title="Product UI"
          subtitle="Deployment & Ops"
          icon={FaRocket}
          skills={uiSkills}
          accentColor="#10b981"
        />
      </div>

      <style>{`
        .perspective-1000 { perspective: 1200px; }
        .backface-hidden { 
          backface-visibility: hidden; 
          -webkit-backface-visibility: hidden; 
        }
        /* Custom scrollbar for the skill grid */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}