import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../assets/logo.png"; // transparent logo

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = ["home", "about", "skills", "projects", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 40);

      menuItems.forEach((item) => {
        const section = document.getElementById(item);
        if (section) {
          const offsetTop = section.offsetTop - 100;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
            setActiveSection(item);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full top-0 z-50 backdrop-blur-md transition-all duration-500 ${
        isScrolled ? "shadow-lg border-b border-[#d9a85c]/40" : ""
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="h-[3px] bg-[#d9a85c] rounded-r-full"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto flex justify-between items-center px-6 py-2">
        {/* 🔹 Logo + Name */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          {/* 🌀 Animated Rotating Logo */}
          <motion.img
            src={Logo}
            alt="Logo"
            className="w-12 h-12 object-contain mix-blend-multiply bg-transparent"
            style={{
              filter: "brightness(1.1) contrast(1.1)",
            }}
            animate={{
              rotate: [-8, 8, -8], // gentle left-right swing
            }}
            transition={{
              duration: 4, // smooth speed
              ease: "easeInOut",
              repeat: Infinity, // infinite loop
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              transition: { duration: 0.4 },
            }}
          />

          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            <span className="text-[#f5f5f5]">Chirag</span>{" "}
            <span className="text-[#d9a85c] drop-shadow-[0_0_6px_#d9a85c]">
              Singh
            </span>
          </h1>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <li key={item}>
              <motion.a
                href={`#${item}`}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`capitalize relative text-[17px] font-medium transition-all duration-300 ${
                  activeSection === item
                    ? "text-[#d9a85c]"
                    : "text-[#f5f5f5] hover:text-[#d9a85c]"
                }`}
              >
                {item}
                {activeSection === item && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#d9a85c] rounded-full shadow-[0_0_8px_#d9a85c]"
                  />
                )}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-3xl text-[#d9a85c] cursor-pointer"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="md:hidden flex flex-col items-center bg-[#0e1625]/95 space-y-5 py-6 border-t border-[#d9a85c]/30 shadow-lg"
        >
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                onClick={() => setNavOpen(false)}
                className={`capitalize text-lg transition-all ${
                  activeSection === item
                    ? "text-[#d9a85c] font-semibold"
                    : "text-[#f5f5f5] hover:text-[#d9a85c]"
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
