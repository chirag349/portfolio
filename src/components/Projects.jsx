import React from "react";

export default function Projects() {
  const projects = [
    { title: "Student Management System", desc: "Python + Tkinter + DB" },
    { title: "Garbage Management App", desc: "Flask + REST API" },
    { title: "Invoice Generator", desc: "Python + GUI" },
  ];

  return (
    <section id="projects" className="py-20 px-6 md:px-20 bg-gray-900">
      <h2 className="text-3xl font-bold text-cyan-400 mb-10">Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-cyan-300">{p.title}</h3>
            <p className="text-gray-400 mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
