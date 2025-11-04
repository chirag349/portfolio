import React from "react";
import { motion } from "framer-motion";
import PythonIcon from "../assets/python.jpg";
import PandasIcon from "../assets/pandas.png";
import MatplotlibIcon from "../assets/matplot.jpg";
import BokehIcon from "../assets/bokeh.png";
import PlotlyIcon from "../assets/Plotly.png";
import seaborn from "../assets/seaborn.png";

export default function Skills() {
  const skills = [
    { name: "Python", icon: PythonIcon, level: 95, bg: "from-yellow-200 to-yellow-400" },
    { name: "Pandas", icon: PandasIcon, level: 90, bg: "from-green-200 to-green-400" },
    { name: "Matplotlib", icon: MatplotlibIcon, level: 85, bg: "from-blue-200 to-blue-400" },
    { name: "Bokeh", icon: BokehIcon, level: 80, bg: "from-pink-200 to-pink-400" },
    { name: "Plotly", icon: PlotlyIcon, level: 80, bg: "from-purple-200 to-purple-400" },
    { name: "Seaborn", icon: seaborn, level: 90, bg: "from-purple-200 to-purple-400" },
  ];

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-40 text-center relative overflow-hidden"
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

      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-[#d9a85c] mb-12"
      >
        My Skills
      </motion.h2>

      {/* Skill Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className={`relative flex flex-col items-center bg-gradient-to-br ${skill.bg} p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer`}
          >
            {/* Round Icon with Border */}
            <div className="w-24 h-24 mb-4 flex justify-center items-center rounded-full border-4 border-[#1a2b4b] overflow-hidden bg-white shadow-md">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Skill Name */}
            <p className="text-gray-900 font-semibold mb-3">{skill.name}</p>

            {/* Animated Skill Bar */}
            <div className="w-32 h-2 bg-white/30 border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
                className="h-full bg-[#1a2b4b] rounded-full"
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
