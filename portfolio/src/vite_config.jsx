import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import App from "./App";

// Text Reveal Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40, skewY: 7 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
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
    }, 3500); // 3.5s to allow the grand animation to play out

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] overflow-hidden font-sans selection:bg-indigo-100">
      {/* Soft Light Theme Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-50 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-50 blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {/* --- CASE 1: GRAND WELCOME LOADER --- */}
        {active === null && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen"
          >
            {/* MASSIVE SOPHISTICATED SPINNER */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-16">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 border-[3px] border-gray-100 border-t-indigo-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
              {/* Middle Pulse */}
              <motion.div
                className="absolute inset-8 border-[1px] border-indigo-200 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              {/* Inner Spinning Geometry */}
              <motion.div
                className="absolute inset-16 border-t-2 border-indigo-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
            </div>

            {/* HUGE REVEALING TEXT */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <div className="overflow-hidden py-2">
                <motion.h1 
                  variants={childVariants}
                  className="text-7xl md:text-9xl font-black text-gray-900 tracking-tighter"
                >
                  WELCOME
                </motion.h1>
              </div>
              
              <div className="overflow-hidden">
                <motion.p 
                  variants={childVariants}
                  className="text-lg md:text-xl text-indigo-600 font-medium tracking-[0.4em] uppercase mt-4"
                >
                  Chirag Singh <span className="text-gray-300 mx-2"></span> 
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* --- CASE 2: ACCESS DENIED (LIGHT THEME) --- */}
        {active === false && (
          <motion.div
            key="denied"
            className="relative z-10 flex items-center justify-center min-h-screen px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-12 text-center shadow-[0_32px_64px_-15px_rgba(0,0,0,0.08)] max-w-lg">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Vault Locked</h1>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                This portfolio is currently private. Please verify your subscription status to proceed.
              </p>
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="block w-full py-5 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-600 transition-all duration-300"
              >
                Request Access
              </motion.a>
            </div>
          </motion.div>
        )}

        {/* --- CASE 3: APP ACCESS --- */}
        {active === true && (
          <motion.div
            key="app"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2 }}
          >
            <App />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}