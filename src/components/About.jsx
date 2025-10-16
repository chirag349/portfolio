import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope, FaPython } from "react-icons/fa";

export default function About() {
  const skills = ["Python", "Pandas", "Matplotlib", "Bokeh", "Plotly"];

  const socials = [
    { icon: FaGithub, link: "https://github.com/chirag349" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/chirag-singh-55149b277" },
    { icon: FaTwitter, link: "https://x.com/skchiragsingh" },
    { icon: FaInstagram, link: "https://www.instagram.com/chirxg.04?igsh=MWlrOTFydWRoa2U3Zg==" },
    { icon: FaWhatsapp, link: "https://wa.me/918287746942?text=hi%20chirag%20from%20portfolio" },
    { icon: FaEnvelope, link: "mailto:skchiragsingh@gmail.com" },
  ];

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">

      {/* Background Orbs */}
      <motion.div
        className="absolute top-16 left-10 w-64 h-64 bg-[#d9a85c] opacity-20 blur-3xl rounded-full"
        animate={{ scale: [1, 1.25, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-24 right-16 w-80 h-80 bg-[#1a2b4b] opacity-30 blur-3xl rounded-full"
        animate={{ scale: [1, 1.15, 1], rotate: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* Heading */}
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-[#d9a85c] mb-4 text-center"
      >
        About <span className="text-[#f5f5f5]">Me</span>
      </motion.h1>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center max-w-4xl text-gray-300 text-lg md:text-xl leading-relaxed mb-12"
      >
        I’m <span className="text-[#d9a85c] font-semibold">Chirag Singh</span>, a Python developer focused on <span className="font-medium">data analysis and visualization</span> using Python, Pandas, Matplotlib, Bokeh, and Plotly. I create insightful and interactive data solutions with clean code and seamless UX.
      </motion.p>

      {/* Skills */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
        }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            whileHover={{ scale: 1.1, y: -5, backgroundColor: "#d9a85c", color: "#0e1625" }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-[#1a2b4b]/60 text-[#d9a85c] border border-[#d9a85c]/40 px-5 py-2 rounded-full font-medium shadow-md cursor-default hover:shadow-[#d9a85c]/30 hover:bg-[#1a2b4b]/80 transition-all flex items-center gap-2"
          >
            <FaPython /> {skill}
          </motion.span>
        ))}
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-6 mb-12"
      >
        {socials.map((social, i) => {
          const Icon = social.icon;
          return (
            <a key={i} href={social.link} target="_blank" rel="noreferrer" className="text-3xl text-[#f5f5f5] hover:text-[#d9a85c] transition-colors">
              <Icon />
            </a>
          );
        })}
      </motion.div>

      {/* CTA Button */}
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="inline-block bg-[#d9a85c] text-[#0e1625] font-semibold px-10 py-4 rounded-full shadow-md hover:bg-[#b98c49] hover:shadow-[#d9a85c]/50 transition-all"
      >
        Let’s Collaborate
      </motion.a>
    </section>
  );
}
