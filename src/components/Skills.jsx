import React from "react";
import { motion } from "framer-motion";
import PythonIcon from "../assets/python.jpg";
import PandasIcon from "../assets/pandas.png";
import MatplotlibIcon from "../assets/matplot.jpg";
import BokehIcon from "../assets/bokeh.png";
import PlotlyIcon from "../assets/Plotly.png";

export default function Skills() {
  const skills = [
    { name: "Python", icon: PythonIcon, level: 95 },
    { name: "Pandas", icon: PandasIcon, level: 90 },
    { name: "Matplotlib", icon: MatplotlibIcon, level: 85 },
    { name: "Bokeh", icon: BokehIcon, level: 80 },
    { name: "Plotly", icon: PlotlyIcon, level: 80 },
  ];

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-20 text-center relative overflow-hidden"
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
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="relative flex flex-col items-center bg-gray-200 p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-gray-600 transition-transform cursor-pointer"
          >
            {/* Icon with background removed visually */}
            <div className="w-20 h-20 mb-4 flex justify-center items-center bg-transparent">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-16 h-16 object-contain mix-blend-multiply bg-transparent"
                style={{
                  filter: "brightness(1.1) contrast(1.1)",
                }}
              />
            </div>

            {/* Skill Name */}
            <p className="text-gray-900 font-semibold mb-3">{skill.name}</p>

            {/* Animated Skill Bar */}
            <div className="w-32 h-2 bg-[#f5f5f5]/20 border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
                className="h-full bg-[#d9a85c] rounded-full"
              />
            </div>

            {/* Skill Level */}
            <span className="text-sm mt-2 text-gray-800">{skill.level}%</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
