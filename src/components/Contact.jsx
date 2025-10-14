import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-20 relative overflow-hidden bg-gradient-to-br from-[#0e1625] via-[#1a2b4b] to-[#0e1625] text-[#f5f5f5] text-center"
    >
      {/* Floating Background Circles */}
      <motion.div
        className="absolute top-10 left-10 w-60 h-60 bg-[#d9a85c]/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-80 h-80 bg-[#1a2b4b]/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-[#d9a85c] mb-12"
      >
        Contact Me
      </motion.h2>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col gap-4 max-w-md mx-auto bg-[#1a2b4b]/80 p-8 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-4 border border-[#d9a85c]/50 rounded-lg bg-[#0e1625] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d9a85c] transition"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-4 border border-[#d9a85c]/50 rounded-lg bg-[#0e1625] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d9a85c] transition"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="p-4 border border-[#d9a85c]/50 rounded-lg bg-[#0e1625] text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d9a85c] transition"
        ></textarea>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px #d9a85c" }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#d9a85c] text-[#1a2b4b] py-3 rounded-lg font-semibold transition-all"
        >
          <FaEnvelope className="inline mr-2" /> Send Message
        </motion.button>
      </motion.form>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 flex flex-col md:flex-row justify-center items-center gap-6"
      >
      </motion.div>
    </section>
  );
};

export default Contact;
