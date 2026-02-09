import React from "react";
import { motion } from "framer-motion";
import { FaBrain } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "AI-Assisted Marks Analyzer",
      desc: "Python + Machine Learning + NLP + Streamlit",
      icon: FaBrain,
      github: "https://github.com/chirag349/ai-assisted-marks-analyzer",
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold text-[#d9a85c] mb-14 text-center"
      >
        Project
      </motion.h2>

      {/* Project Card */}
      <div className="flex justify-center">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#1a2b4b]/70 border border-[#d9a85c]/30 rounded-2xl p-10 w-full max-w-md flex flex-col items-center text-center shadow-xl hover:scale-105 transition-transform"
            >
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-6 p-6 rounded-full bg-[#d9a85c]/20"
              >
                <Icon size={52} className="text-[#d9a85c]" />
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#d9a85c] mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-6">
                {project.desc}
              </p>

              {/* GitHub Button */}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 bg-[#d9a85c] hover:bg-[#b98c49] text-[#0e1625] font-semibold rounded-full transition"
              >
                View on GitHub
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Background Animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        className="absolute top-10 left-10 w-40 h-40 border-2 border-[#d9a85c]/30 rounded-full opacity-20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        className="absolute bottom-10 right-20 w-64 h-64 border-4 border-[#1a2b4b]/40 rounded-full opacity-15"
      />
    </section>
  );
}
