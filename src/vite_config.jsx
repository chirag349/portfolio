import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import App from "./App";

// Letter Assembly Variants
const letterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

const individualLetterVariants = {
  hidden: { 
    opacity: 0, 
    scale: 2,
    filter: "blur(15px)",
    rotateX: 45,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

// Internal Particle Animation (The "Assembly" dust)
const dustVariants = {
  hidden: { x: 0, y: 0, opacity: 0 },
  animate: (i) => ({
    x: [Math.random() * 100 - 50, 0],
    y: [Math.random() * 100 - 50, 0],
    opacity: [0, 1, 0],
    scale: [0, 1.5, 0],
    transition: {
      duration: 1.5,
      repeat: 1,
      delay: i * 0.02,
    }
  })
};

export default function ViteConfig() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-subscription-access-iz0pxib49.vercel.app";
    const username = "chirag-singh";

    const timer = setTimeout(() => {
      fetch(`${apiUrl}/check-subscription/${username}`)
        .then((res) => res.json())
        .then((data) => setActive(Boolean(data.active)))
        .catch(() => setActive(false));
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] overflow-hidden font-sans selection:bg-indigo-100">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-50 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-50 blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {active === null && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen"
          >
            {/* 3D CORE SPINNER WITH "CS" */}
            <div className="relative w-48 h-48 mb-16 flex items-center justify-center perspective-1000">
              {/* Outer Rotating Ring */}
              <motion.div
                animate={{ rotate: 360, rotateY: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[1px] border-indigo-100 rounded-full"
              />
              {/* Inner Rotating Ring */}
              <motion.div
                animate={{ rotate: -360, rotateX: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-t-2 border-b-2 border-indigo-500 rounded-full"
              />
              
              {/* CENTER "CS" LOGO */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-20 flex items-center justify-center"
              >
                <motion.span 
                  animate={{ 
                    textShadow: ["0 0 10px rgba(79,70,229,0)", "0 0 20px rgba(79,70,229,0.5)", "0 0 10px rgba(79,70,229,0)"],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-3xl font-black text-indigo-600 tracking-tighter"
                >
                  CS
                </motion.span>
                {/* Glow behind letters */}
                <div className="absolute w-12 h-12 bg-indigo-500/10 blur-xl rounded-full -z-10" />
              </motion.div>
            </div>

            {/* PARTICLE ASSEMBLY TEXT */}
            <motion.div
              variants={letterContainerVariants}
              initial="hidden"
              animate="visible"
              className="text-center relative"
            >
              <div className="flex justify-center items-center">
                {"WELCOME".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={individualLetterVariants}
                    className="relative inline-block text-7xl md:text-9xl font-black text-gray-900 tracking-tighter"
                  >
                    {char}
                    
                    {/* Inner Letter Particles - creating the 'Forming' effect */}
                    <span className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          custom={i + index}
                          variants={dustVariants}
                          animate="animate"
                          className="absolute w-2 h-2 bg-indigo-500 rounded-full blur-[1px]"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </span>
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-6 flex items-center justify-center gap-4"
              >
                <span className="h-[1px] w-8 bg-gray-200" />
                <p className="text-indigo-600 font-medium tracking-[0.5em] uppercase text-sm md:text-base">
                  Chirag Singh
                </p>
                <span className="h-[1px] w-8 bg-gray-200" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* --- ACCESS DENIED --- */}
        {active === false && (
          <motion.div
            key="denied"
            className="relative z-10 flex items-center justify-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center max-w-sm border border-gray-50">
               <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
               </div>
               <h2 className="text-3xl font-bold text-gray-900 mb-2">Vault Locked</h2>
               <p className="text-gray-500 mb-8">Access restricted. Please verify subscription.</p>
               <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-colors">Request Access</button>
            </div>
          </motion.div>
        )}

        {/* --- APP ACCESS --- */}
        {active === true && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <App />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}