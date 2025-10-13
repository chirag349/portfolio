import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-20 bg-gray-900 text-center text-white relative">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-cyan-400"
      >
        Contact Me
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col gap-4 max-w-md mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        ></textarea>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
        >
          Send Message
        </motion.button>
      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 text-gray-400"
      >
        You can also reach me on{" "}
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 text-cyan-400 font-semibold hover:underline mx-auto w-max"
        >
          <FaLinkedin /> LinkedIn
        </a>{" "}
        or{" "}
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 text-cyan-400 font-semibold hover:underline mx-auto w-max"
        >
          <FaGithub /> GitHub
        </a>.
      </motion.p>
    </section>
  );
};

export default Contact;
