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
      color: "from-slate-800 to-black" 
    },
    { 
      icon: FaLinkedin, 
      link: "https://linkedin.com/in/chirag349", 
      name: "LinkedIn",
      color: "from-blue-600 to-indigo-700"
    },
    { 
      icon: FaInstagram, 
      link: "https://instagram.com", 
      name: "Instagram",
      color: "from-pink-500 via-red-500 to-yellow-500" 
    },
    { 
      icon: FaWhatsapp, 
      link: "https://wa.me/your-number", 
      name: "WhatsApp",
      color: "from-green-400 to-emerald-600"
    },
    { 
      icon: FaEnvelope, 
      link: "mailto:chirag@example.com", 
      name: "Email",
      color: "from-blue-400 to-cyan-500"
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-16 text-center bg-white border-t border-slate-100"
    >
      {/* Background Decorative Animations */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-200 rounded-full blur-[80px] pointer-events-none"
      />
      
      <motion.div
        className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full border border-indigo-100 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
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

        {/* Social Icons Container with Perspective for 3D effect */}
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
                // 3D Tilt and Color Pop Effect
                whileHover={{ 
                  scale: 1.2,
                  rotateX: 15,
                  rotateY: -15,
                  z: 50
                }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
              >
                <div className={`p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-transparent flex items-center justify-center`}>
                  {/* Colored Icon that appears on hover */}
                  <Icon className="text-2xl text-slate-400 group-hover:hidden" />
                  
                  {/* Gradient Icon/Background that reveals on hover */}
                  <div className={`hidden group-hover:flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${social.color} text-white shadow-lg`}>
                    <Icon className="text-xl" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.footer>
  );
}