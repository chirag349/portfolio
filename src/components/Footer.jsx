import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 py-6 text-center text-gray-400"
    >
      <p>© {new Date().getFullYear()} Chirag Singh | All Rights Reserved</p>

      <div className="flex justify-center space-x-6 mt-3 text-gray-400 text-xl">
        <a
          href="https://github.com/chirag349"
          target="_blank"
          rel="noreferrer"
          className="hover:text-cyan-400 transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/chirag349"
          target="_blank"
          rel="noreferrer"
          className="hover:text-cyan-400 transition-colors"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-cyan-400 transition-colors"
        >
          <FaTwitter />
        </a>
      </div>
    </motion.footer>
  );
}
