import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = ["home", "about", "skills", "projects", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      menuItems.forEach((item) => {
        const section = document.getElementById(item);
        if (section) {
          const offsetTop = section.offsetTop - 80;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActiveSection(item);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-gray-900/80 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-cyan-400 cursor-pointer"
        >
          Chirag <span className="text-white">Singh</span>
        </motion.h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className={`capitalize hover:text-cyan-400 transition-colors ${
                  activeSection === item ? "text-cyan-400 font-semibold" : "text-white"
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl text-white cursor-pointer" onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col items-center bg-gray-900/95 space-y-4 py-4"
        >
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                onClick={() => setNavOpen(false)}
                className={`capitalize text-white hover:text-cyan-400 transition-colors ${
                  activeSection === item ? "text-cyan-400 font-semibold" : ""
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
}
