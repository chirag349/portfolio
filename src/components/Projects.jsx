import React from "react";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Student Management System",
      desc: "Python + Tkinter + DB",
      img: "/projects/sms.png", // replace with your image path
      github: "https://github.com/chirag349/student-management",
    },
    {
      title: "Garbage Management App",
      desc: "Flask + REST API",
      img: "/projects/garbage-app.png",
      github: "https://github.com/chirag349/garbage-management",
    },
    {
      title: "Invoice Generator",
      desc: "Python + GUI",
      img: "/projects/invoice-generator.png",
      github: "https://github.com/chirag349/invoice-generator",
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 md:px-20 bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-10 text-center">Projects</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="relative bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            {/* Project Image */}
            <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gray-900/80 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center p-4">
              <h3 className="text-xl font-semibold text-cyan-300">{p.title}</h3>
              <p className="text-gray-400 mt-2">{p.desc}</p>
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-lg transition"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
