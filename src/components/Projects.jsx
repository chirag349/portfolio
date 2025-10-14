import React from "react";
import { motion } from "framer-motion";
import { FaPython, FaReact, FaDatabase, FaFlask, FaFileInvoice } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "Student Management System",
      desc: "Python + Tkinter + Database",
      icon: FaPython,
      github: "https://github.com/chirag349/student-management",
      color: "#d9a85c",
    },
    {
      title: "Garbage Management App",
      desc: "Flask + REST API",
      icon: FaFlask,
      github: "https://github.com/chirag349/garbage-management",
      color: "#1a2b4b",
    },
    {
      title: "Invoice Generator",
      desc: "Python + GUI",
      icon: FaFileInvoice,
      github: "https://github.com/chirag349/invoice-generator",
      color: "#d9a85c",
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-20 relative overflow-hidden bg-gradient-to-br from-[#0e1625] via-[#1a2b4b] to-[#0e1625] text-[#f5f5f5]"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-[#d9a85c] mb-12 text-center"
      >
        Projects
      </motion.h2>

      {/* Project Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {projects.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative flex flex-col items-center justify-center p-8 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform bg-[#1a2b4b]/70"
            >
              {/* Animated Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-6 p-6 rounded-full bg-[#d9a85c]/20"
              >
                <Icon size={50} className="text-[#d9a85c]" />
              </motion.div>

              {/* Project Title */}
              <h3 className="text-xl font-semibold text-[#d9a85c] mb-2 text-center">{p.title}</h3>

              {/* Project Description */}
              <p className="text-gray-300 text-center mb-4">{p.desc}</p>

              {/* GitHub Link */}
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-2 bg-[#d9a85c] hover:bg-[#b98c49] text-[#0e1625] font-semibold rounded-full shadow-md transition-all"
              >
                GitHub
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Background Shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
        className="absolute top-10 left-10 w-40 h-40 border-2 border-[#d9a85c]/30 rounded-full opacity-20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        className="absolute bottom-10 right-20 w-64 h-64 border-4 border-[#1a2b4b]/40 rounded-full opacity-15"
      />
    </section>
  );
}
