import React from "react";
import { motion } from "framer-motion";
import { FaPython, FaReact, FaJava, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt } from "react-icons/fa";

export default function Skills() {
  const skills = [
    { name: "Python", icon: FaPython, level: 90 },
    { name: "React", icon: FaReact, level: 85 },
    { name: "Java", icon: FaJava, level: 75 },
    { name: "HTML", icon: FaHtml5, level: 95 },
    { name: "CSS", icon: FaCss3Alt, level: 90 },
    { name: "Node.js", icon: FaNodeJs, level: 80 },
    { name: "Git", icon: FaGitAlt, level: 85 },
  ];

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-20 text-center relative overflow-hidden bg-gradient-to-br from-[#0e1625] via-[#1a2b4b] to-[#0e1625] text-[#f5f5f5]"
    >
      {/* Floating glowing shapes */}
      <motion.div
        className="absolute top-10 left-10 w-60 h-60 bg-[#d9a85c] opacity-20 blur-3xl rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-80 h-80 bg-[#1a2b4b] opacity-30 blur-3xl rounded-full"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-[#d9a85c] mb-12"
      >
        My Skills
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative flex flex-col items-center bg-[#1a2b4b]/70 p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-[#d9a85c]/20 transition-transform cursor-pointer"
            >
              {/* Icon */}
              <Icon size={60} className="text-[#d9a85c] mb-4" />

              {/* Skill Name */}
              <p className="text-[#f5f5f5] font-semibold mb-3">{skill.name}</p>

              {/* Animated Skill Bar */}
              <div className="w-32 h-2 bg-[#f5f5f5]/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.2 }}
                  className="h-full bg-[#d9a85c] rounded-full"
                />
              </div>

              {/* Skill Level */}
              <span className="text-sm mt-2 text-[#f5f5f5]/80">{skill.level}%</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
