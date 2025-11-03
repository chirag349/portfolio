import React from "react";
import { motion } from "framer-motion";
import ProfilePic from "../assets/profile.png"; // change path as needed

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-x-hidden text-white px-6"
    >
      {/* Profile Picture */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full mb-6"
      >
        {/* Gradient glow behind image */}
        <div className="absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-tr from-[#d9a85c] to-transparent blur-xl opacity-70 animate-pulse"></div>

        {/* Profile Image */}
        <img
          src={ProfilePic}
          alt="Chirag Singh"
className="relative w-full h-full rounded-full border border-[#d9a85c]/80 object-cover object-[center_top] shadow-[0_0_25px_rgba(217,168,92,0.5)] scale-90"
        />
      </motion.div>

      {/* Name + Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
      >
        Hi 
        <br /> I'm <span className="text-[#d9a85c]">Chirag Singh</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mb-8 px-2"
      >
        I blend AI with thoughtful design to build intelligent, seamless digital experiences.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
      >
        <a
          href="#projects"
          className="bg-[#d9a85c] hover:bg-[#b98c49] text-[#0e1625] px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-[#d9a85c]/50 transition-all text-center"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="border border-[#d9a85c] text-[#d9a85c] px-8 py-3 rounded-lg font-semibold hover:bg-[#d9a85c]/10 transition-all text-center"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
}
