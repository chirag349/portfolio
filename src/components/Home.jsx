import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import ProfilePic from "../assets/profile.jpg"; // replace with your image path

export default function Home() {
  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Floating animated background circles */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-cyan-500 rounded-full opacity-20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 rounded-full opacity-20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Profile Image */}
      <motion.img
        src={ProfilePic}
        alt="Chirag Singh"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-cyan-400 mb-4 object-cover"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-2 text-white"
      >
        Hi, I'm <span className="text-cyan-400">Chirag Singh</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-lg md:text-xl text-gray-400 mb-6 max-w-xl"
      >
        A passionate Developer who loves building web apps 🚀
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="#projects"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg shadow-lg transition-all"
      >
        View My Work
      </motion.a>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex space-x-6 mt-6 text-white text-2xl"
      >
        <a href="https://github.com/chirag349" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/chirag349" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
          <FaLinkedin />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
          <FaTwitter />
        </a>
      </motion.div>
    </section>
  );
}
