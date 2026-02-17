import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simple function to close menu when link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 ${
        scrolled ? "pt-4" : "pt-10"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-8 py-4 rounded-3xl transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-lg shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-white/40"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-black text-slate-900 tracking-tighter cursor-pointer"
        >
          <a href="#home">Chirag Singh</a>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="bg-slate-900 text-white px-7 py-3 rounded-2xl text-sm font-extrabold transition-all shadow-xl shadow-indigo-100"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Menu Icon */}
        <div 
          className="md:hidden cursor-pointer p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`w-8 h-1 bg-slate-900 rounded-full mb-1 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></div>
          <div className={`w-5 h-1 bg-indigo-600 rounded-full transition-all ${isOpen ? "opacity-0" : ""}`}></div>
          <div className={`w-8 h-1 bg-slate-900 rounded-full mt-1 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 md:hidden flex flex-col gap-6 items-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-lg font-bold text-slate-700 hover:text-indigo-600 w-full text-center"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="w-full text-center bg-indigo-600 text-white py-4 rounded-2xl font-bold"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}