import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function About() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-green-900 to-green-800 text-gray-100 px-6 relative">

      {/* Profile Image */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <img
          src="https://i.pravatar.cc/250" // replace with your actual image
          alt="Chirag Singh"
          className="w-40 h-40 rounded-full border-4 border-green-500 shadow-xl"
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-center text-green-300 mb-4"
      >
        Hi, I'm <span className="text-skin-500">Chirag Singh</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center text-gray-300 max-w-3xl mb-8 text-lg md:text-xl"
      >
        I'm a <span className="text-green-400 font-semibold">Frontend Developer</span> and designer, 
        passionate about crafting modern, user-friendly web experiences. 
        I specialize in React, Tailwind CSS, and creating interactive, animated interfaces.
      </motion.p>

      {/* Skills */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        {["React", "JavaScript", "Tailwind CSS", "Framer Motion", "Node.js", "HTML5", "CSS3"].map((skill) => (
          <span
            key={skill}
            className="bg-green-700 text-skin-500 px-4 py-2 rounded-full font-medium shadow-md hover:scale-105 transition-transform cursor-default"
          >
            {skill}
          </span>
        ))}
      </motion.div>

      {/* Social Icons */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex space-x-6 mb-8"
      >
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 transition-colors text-3xl"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 transition-colors text-3xl"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400 transition-colors text-3xl"
        >
          <FaTwitter />
        </a>
      </motion.div>

      {/* Call-to-Action */}
      <motion.a
        href="#contact"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="inline-block bg-green-400 hover:bg-green-500 text-gray-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        Let's Collaborate
      </motion.a>

      {/* Animated Background Shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute top-10 left-10 w-40 h-40 border-2 border-green-600 rounded-full opacity-20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        className="absolute bottom-20 right-20 w-60 h-60 border-4 border-green-500 rounded-full opacity-15"
      />
    </section>
  );
}
