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
    { 
      icon: FaGithub, 
      link: "https://github.com/chirag349", 
      name: "GitHub",
      color: "from-[#24292e] to-[#1b1f23]", // GitHub Dark Grey
      iconColor: "text-[#24292e]"
    },
    { 
      icon: FaLinkedin, 
      link: "https://linkedin.com/in/chirag349", 
      name: "LinkedIn",
      color: "from-[#0077b5] to-[#005582]", // LinkedIn Blue
      iconColor: "text-[#0077b5]"
    },
    { 
      icon: FaInstagram, 
      link: "https://instagram.com", 
      name: "Instagram",
      color: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045]", // Instagram Gradient
      iconColor: "text-[#e1306c]"
    },
    { 
      icon: FaWhatsapp, 
      link: "https://wa.me/your-number", 
      name: "WhatsApp",
      color: "from-[#25D366] to-[#128C7E]", // WhatsApp Green
      iconColor: "text-[#25D366]"
    },
    { 
      icon: FaEnvelope, 
      link: "mailto:chirag@example.com", 
      name: "Email",
      color: "from-[#EA4335] to-[#c5221f]", // Gmail/Email Red
      iconColor: "text-[#EA4335]"
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-16 text-center bg-white border-t border-slate-100"
    >
      {/* Background Decorative Animation (Left Only) */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-200 rounded-full blur-[80px] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Main Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-bold mb-4 text-slate-900 tracking-tight"
        >
          Built with an <span className="text-indigo-600">Advanced Stack</span> & a Supportive Partner
        </motion.h2>

        {/* Credits */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-slate-500 mb-10"
        >
          © {new Date().getFullYear()}{" "}
          <span className="text-slate-900 font-bold">Chirag Singh</span> &{" "}
          <a
            href="https://mokshbhardwaj.netlify.app"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:text-indigo-500 transition-colors font-bold underline decoration-indigo-200 underline-offset-4"
          >
            Moksh Bhardwaj
          </a>
        </motion.p>

        {/* Social Icons Container */}
        <div className="flex justify-center flex-wrap gap-4 sm:gap-6 perspective-1000">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                title={social.name}
                whileHover={{ 
                  scale: 1.15,
                  rotateX: 10,
                  rotateY: -10,
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-xl flex items-center justify-center">
                  {/* Icon with Brand Color */}
                  <Icon className={`text-2xl ${social.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.footer>
  );
}