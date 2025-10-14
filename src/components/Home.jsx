import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import ProfilePic from "../assets/profile.jpg"; // local image only

export default function Home() {
  const socials = [
    { icon: FaGithub, link: "https://github.com/chirag349", name: "GitHub" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/chirag-singh-55149b277", name: "LinkedIn" },
    { icon: FaTwitter, link: "https://x.com/skchiragsingh", name: "X" },
    { icon: FaInstagram, link: "https://www.instagram.com/chirxg.04?igsh=MWlrOTFydWRoa2U3Zg==", name: "Instagram" },
    { icon: FaWhatsapp, link: "https://wa.me/918287746942?text=hi%20chirag%20from%20portfolio", name: "WhatsApp" },
    { icon: FaEnvelope, link: "mailto:skchiragsingh@gmail.com", name: "Email" },
  ];

  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#0e1625] via-[#1a2b4b] to-[#0e1625] relative overflow-hidden"
    >
      {/* Floating animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-48 h-48 bg-[#d9a85c] rounded-full opacity-20 blur-2xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-64 h-64 bg-[#1a2b4b] rounded-full opacity-30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Profile Image with glow */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#d9a85c] to-[#1a2b4b] blur-md opacity-70 animate-pulse"></div>
        <img
          src={ProfilePic}
          alt="Chirag Singh"
          className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-[#d9a85c] object-cover shadow-lg"
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-3 text-[#f5f5f5]"
      >
        Hi, I’m <span className="text-[#d9a85c]">Chirag Singh</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl px-4"
      >
        A creative <span className="text-[#d9a85c] font-medium">Full Stack Developer</span> who
        loves crafting elegant, user-friendly web experiences 🚀
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a
          href="#projects"
          className="bg-[#d9a85c] hover:bg-[#b98c49] text-[#0e1625] px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-[#d9a85c]/50 transition-all"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="border border-[#d9a85c] text-[#d9a85c] px-8 py-3 rounded-lg font-semibold hover:bg-[#d9a85c]/10 transition-all"
        >
          Contact Me
        </a>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex flex-wrap justify-center gap-6 mt-8 text-2xl"
      >
        
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 text-[#d9a85c] text-sm tracking-wider"
      >
        ↓ Scroll Down
      </motion.div>
    </section>
  );
}
