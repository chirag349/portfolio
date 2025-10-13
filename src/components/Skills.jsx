import React from "react";
import { motion } from "framer-motion";
import { FaPython, FaReact, FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";

export default function Skills() {
  const skills = [
    { name: "Python", icon: FaPython },
    { name: "React", icon: FaReact },
    { name: "Java", icon: FaJava },
    { name: "HTML", icon: FaHtml5 },
    { name: "CSS", icon: FaCss3Alt },
  ];

  return (
    <section id="skills" className="py-20 px-6 md:px-20 text-center bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-10">My Skills</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex flex-col items-center bg-gray-800/60 p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-cyan-500/20 transition-transform cursor-pointer"
            >
              <Icon size={60} className="text-cyan-400 mb-3" />
              <p className="text-white font-medium">{skill.name}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
