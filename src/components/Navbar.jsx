import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 bg-gray-900 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-cyan-400">Chirag<span className="text-white">Rajput</span></h1>
        <ul className="flex space-x-6">
          {["home", "about", "skills", "projects", "contact"].map((item) => (
            <li key={item}>
              <a href={`#${item}`} className="hover:text-cyan-400 capitalize">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
