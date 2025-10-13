import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section id="home" className="h-screen flex flex-col justify-center items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-3"
      >
        Hi, I'm <span className="text-cyan-400">Chirag Rajput</span>
      </motion.h1>
      <p className="text-lg text-gray-400">A passionate Developer who loves building web apps 🚀</p>
      <a href="#projects" className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg">
        View My Work
      </a>
    </section>
  );
}
