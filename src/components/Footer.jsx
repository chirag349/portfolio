import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const socials = [
    { icon: FaGithub, link: "https://github.com/chirag349", name: "GitHub" },
    { icon: FaLinkedin, link: "https://linkedin.com/in/chirag349", name: "LinkedIn" },
    { icon: FaTwitter, link: "https://twitter.com", name: "X" },
    { icon: FaInstagram, link: "https://instagram.com", name: "Instagram" },
    { icon: FaWhatsapp, link: "https://wa.me/your-number", name: "WhatsApp" },
    { icon: FaEnvelope, link: "mailto:chirag@example.com", name: "Email" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#1a2b4b] py-8 text-center text-[#f5f5f5] relative overflow-hidden"
    >
      <p className="text-[#d9a85c] font-semibold mb-4">
        © {new Date().getFullYear()} Chirag Singh | All Rights Reserved
      </p>

      <div className="flex justify-center flex-wrap gap-6 text-2xl">
        {socials.map((social, i) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, color: "#d9a85c" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              title={social.name}
              className="text-[#f5f5f5] hover:text-[#d9a85c] transition-colors"
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>

      {/* Floating Background Circle */}
      <motion.div
        className="absolute top-0 right-10 w-40 h-40 rounded-full border-2 border-[#d9a85c]/20 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      />
    </motion.footer>
  );
}
