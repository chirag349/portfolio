import React from "react";
import { motion } from "framer-motion";
import ProfilePic from "../assets/profile.png"; // Ensure path is correct

export default function Home() {
  // Container animation to stagger the appearance of text/buttons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.3 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center text-center px-6 bg-slate-50 overflow-hidden pt-40" // Added pt-32 for navbar spacing
    >
      {/* --- BACKGROUND ANIMATIONS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-100 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-100 blur-[120px]" 
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center"
      >
        
        {/* --- PROFILE PICTURE AREA --- */}
        <motion.div
          variants={itemVariants}
          className="relative w-56 h-56 sm:w-64 sm:h-64 mb-10"
        >
          {/* Pulsing Glow Layer */}
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1], 
              opacity: [0.4, 0.6, 0.4] 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-indigo-200 blur-3xl -z-10"
          />

          {/* Image Container with Floating Animation */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-full h-full rounded-full p-2 bg-white shadow-2xl shadow-indigo-100 overflow-hidden"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={ProfilePic}
              alt="Chirag Singh"
              className="w-full h-full rounded-full object-cover object-top border border-slate-100 transition-transform duration-300"
            />
          </motion.div>
        </motion.div>

        {/* --- TEXT CONTENT --- */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-indigo-600 font-bold tracking-[0.25em] uppercase text-xs sm:text-sm">
            Python Developer & Data Analyst
          </h2>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Chirag Singh</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mt-6 leading-relaxed mx-auto">
            I blend <span className="text-slate-900 font-semibold">AI with thoughtful design</span> to build 
            intelligent, seamless digital experiences and data-driven solutions.
          </p>
        </motion.div>

        {/* --- BUTTONS --- */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 mt-10 w-full sm:w-auto"
        >
          <motion.a
            href="#projects"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.2)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all text-center flex items-center justify-center gap-2"
          >
            View My Work
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(241, 245, 249, 1)" }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-slate-200 text-slate-700 px-10 py-4 rounded-2xl font-bold transition-all text-center"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-600 to-transparent"></div>
      </motion.div>
    </section>
  );
}