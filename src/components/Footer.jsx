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
      className="py-6 text-center text-[#f5f5f5] relative overflow-hidden"
    >
      <hr className="opacity-30 mb-6" />

      <p className="text-[#d9a85c] font-semibold mb-1">
        © {new Date().getFullYear()} Chirag Singh
      </p>
      <p className="text-sm text-[#bfbfbf] mb-3">
        In collaboration with{" "}
        <a
          href="https://mokshbhardwaj.netlify.app"
          target="_blank"
          rel="noreferrer"
          className="text-[#d9a85c] hover:underline"
        >
          Moksh Bhardwaj
        </a>
      </p>

      <p className="text-xs italic text-[#999] mb-6">
        Built with an advanced tech stack and a supportive partner ✨
      </p>

      <div className="flex justify-center flex-wrap gap-5 text-2xl">
        {socials.map((social, i) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, color: "#d9a85c" }}
              transition={{ type: "spring", stiffness: 300 }}
              title={social.name}
              className="text-[#f5f5f5] hover:text-[#d9a85c] transition-colors"
            >
              <Icon />
            </motion.a>
          );
        })}
      </div>

      <motion.div
        className="absolute top-0 right-10 w-32 h-32 rounded-full border border-[#d9a85c]/20 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      />
    </motion.footer>
  );
}