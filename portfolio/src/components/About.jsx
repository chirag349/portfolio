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

export default function About() {
  const skills = [
    "Python", 
    "Pandas", 
    "Matplotlib", 
    "Seaborn", 
    "Bokeh", 
    "Plotly",
    "Numpy",
    "Streamlit",
    "Scikit-learn"
  ];

  const socials = [
    { icon: FaGithub, link: "https://github.com/chirag349", color: "#333" },
    {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/chirag-singh-55149b277",
      color: "#0077b5"
    },
    { icon: FaTwitter, link: "https://x.com/skchiragsingh", color: "#1DA1F2" },
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/chirxg.04?igsh=MWlrOTFydWRoa2U3Zg==",
      color: "#E4405F"
    },
    {
      icon: FaWhatsapp,
      link: "https://wa.me/918287746942?text=hi%20chirag%20from%20portfolio",
      color: "#25D366"
    },
    { icon: FaEnvelope, link: "mailto:skchiragsingh@gmail.com", color: "#EA4335" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl rounded-full pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 blur-3xl rounded-full pointer-events-none"
        animate={{ 
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
        
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/20">
            Python Data Specialist
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 text-center bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent"
        >
          About Me
        </motion.h1>

        {/* Subtitle line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 rounded-full mb-12"
        />

        {/* Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-blue-900/10 p-8 md:p-12 mb-16 border border-gray-200/50 max-w-4xl"
        >
          <p className="text-center text-gray-700 text-lg md:text-xl leading-relaxed">
            I'm <span className="text-blue-600 font-bold">Chirag Singh</span>, a passionate Python developer specializing in{" "}
            <span className="font-semibold text-gray-900">data analysis and visualization</span>.
            <br className="hidden md:block" />
            I transform complex datasets into compelling visual stories using Python, Pandas, Matplotlib, Seaborn, Bokeh, and Plotly.
            <br className="hidden md:block" />
            My focus is on creating <span className="text-purple-600 font-semibold">insightful, interactive solutions</span> with clean code and intuitive user experiences.
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-5xl mb-16"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center"
          >
            Technical Skills
          </motion.h3>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.1,
                  y: -8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="group relative bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl cursor-default overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                <span className="relative z-10 text-gray-800 group-hover:text-white transition-colors duration-300 text-base md:text-lg">
                  {skill}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center"
          >
            Let's Connect
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-5">
            {socials.map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                  whileHover={{ 
                    scale: 1.2,
                    y: -5,
                  }}
                  whileTap={{ scale: 0.9 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="relative bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-200 transition-all duration-300 group-hover:border-blue-400">
                    <Icon 
                      className="text-3xl text-gray-700 transition-colors duration-300 group-hover:text-blue-600"
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative inline-block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300" />
            
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white font-bold px-12 py-5 rounded-full shadow-xl">
              <span className="flex items-center gap-3 text-lg">
                Let's Collaborate
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}