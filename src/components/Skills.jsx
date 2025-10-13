import React from "react";
import { FaPython, FaReact, FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";

export default function Skills() {
  const icons = [FaPython, FaReact, FaJava, FaHtml5, FaCss3Alt];
  const names = ["Python", "React", "Java", "HTML", "CSS"];

  return (
    <section id="skills" className="py-20 px-6 md:px-20 text-center">
      <h2 className="text-3xl font-bold text-cyan-400 mb-10">My Skills</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {icons.map((Icon, i) => (
          <div key={i} className="flex flex-col items-center">
            <Icon size={60} className="text-cyan-400 mb-2" />
            <p className="text-gray-300">{names[i]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
