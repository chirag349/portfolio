import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const socials = [
    { icon: FaGithub, link: "https://github.com/chirag349", name: "GitHub" },
    { icon: FaLinkedin, link: "https://linkedin.com/in/chirag349", name: "LinkedIn" },
    { icon: FaInstagram, link: "https://instagram.com", name: "Instagram" },
    { icon: FaWhatsapp, link: "https://wa.me/your-number", name: "WhatsApp" },
    { icon: FaEnvelope, link: "mailto:chirag@example.com", name: "Email" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden py-10 text-center bg-[#0b0b0b] text-[#f5f5f5]"
    >
      {/* Rotating border circle */}
      <motion.div
        className="absolute top-[-40px] right-[-40px] w-52 h-52 rounded-full border border-[#d9a85c]/20 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      />

      {/* Main Tagline */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-xl md:text-2xl font-semibold mb-4 text-[#d9a85c]"
      >
        Built with an Advanced Tech Stack and a Supportive Partner
      </motion.h2>

      {/* Credits */}
      <p className="text-sm text-[#bfbfbf] mb-6">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#d9a85c] font-semibold">Chirag Singh</span> &{" "}
        <a
          href="https://mokshbhardwaj.netlify.app"
          target="_blank"
          rel="noreferrer"
          className="text-[#d9a85c] hover:underline font-semibold"
        >
          Moksh Bhardwaj
        </a>
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 text-2xl">
        {socials.map((social, i) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, color: "#d9a85c" }}
              transition={{ type: "spring", stiffness: 300 }}
              title={social.name}
              className="text-[#f5f5f5] hover:text-[#d9a85c] transition-colors"
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>
    </motion.footer>
  );
}