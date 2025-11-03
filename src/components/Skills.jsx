import React from "react";
import { motion } from "framer-motion";
import PythonIcon from "../assets/python.jpg";
import PandasIcon from "../assets/pandas.png";
import MatplotlibIcon from "../assets/matplot.jpg";
import BokehIcon from "../assets/bokeh.png";
import PlotlyIcon from "../assets/Plotly.png";
import SeabornIcon from "../assets/seaborn.png";

export default function Skills() {
  const skills = [
    { name: "Python", icon: PythonIcon, level: 95 },
    { name: "Pandas", icon: PandasIcon, level: 90 },
    { name: "Matplotlib", icon: MatplotlibIcon, level: 85 },
    { name: "Seaborn", icon: SeabornIcon, level: 85 },
    { name: "Bokeh", icon: BokehIcon, level: 80 },
    { name: "Plotly", icon: PlotlyIcon, level: 80 },
  ];

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-20 text-center relative overflow-hidden bg-gradient-to-b from-[#0e0f12] via-[#14161a] to-[#0e0f12]"
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
        className="text-4xl md:text-5xl font-extrabold text-[#d9a85c] mb-16 tracking-wide"
      >
        My Skills
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-10">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="relative flex flex-col items-center backdrop-blur-lg bg-white/10 border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-[#d9a85c]/50 hover:scale-105 transition-all duration-300"
          >
            {/* Icon */}
            <div className="w-20 h-20 mb-5 flex justify-center items-center">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-16 h-16 object-contain bg-transparent mix-blend-multiply"
                style={{
                  filter: "brightness(1.1) contrast(1.15)",
                }}
              />
            </div>

            {/* Skill Name */}
            <p className="text-lg font-semibold text-gray-100 mb-3 tracking-wide">
              {skill.name}
            </p>

            {/* Skill Bar */}
            <div className="w-40 h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
                className="h-full bg-gradient-to-r from-[#d9a85c] to-[#f2d27d] rounded-full"
              />
            </div>

            {/* Skill Level */}
            <span className="text-sm mt-2 text-gray-300">{skill.level}%</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
