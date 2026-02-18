import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const socialLinks = [
    { 
      icon: <FaEnvelope />, 
      label: "Email", 
      value: "chirag singh", 
      color: "from-blue-500 to-cyan-500", 
      link: "mailto:skchiragsingh@.com" 
    },
    { 
      icon: <FaLinkedin />, 
      label: "LinkedIn", 
      value: "chirag-singh", 
      color: "from-blue-700 to-indigo-800", 
      link: "https://www.linkedin.com/in/chirag-singh-55149b277" 
    },
    { 
      icon: <FaGithub />, 
      label: "GitHub", 
      value: "chirag349", 
      color: "from-slate-800 to-black", 
      link: "https://github.com/chirag349" 
    },
    { 
      icon: <FaWhatsapp />, 
      label: "WhatsApp", 
      value: "chirag singh", 
      color: "from-green-500 to-emerald-600", 
      link: "https://wa.me/8287746942" 
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-20 relative bg-slate-50 overflow-hidden flex flex-col items-center"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />

      {/* Heading Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-2 block">Available for Opportunities</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Get in <span className="text-indigo-600">Touch</span>
        </h2>
      </motion.div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Left Side: 3D Social Cards */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-4"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Let's build something <br/> amazing together.</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                // 3D Tilt Effect
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: 10, 
                  rotateY: -10,
                  boxShadow: "0px 20px 30px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="perspective-1000"
              >
                <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm h-full group">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:shadow-indigo-200 transition-all`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{item.label}</p>
                    <p className="text-slate-700 font-semibold text-sm truncate w-32">{item.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Side: The Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-slate-100"
        >
          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-slate-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder=""
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-slate-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Your Message</label>
              <textarea
                placeholder=""
                rows="4"
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-slate-700 resize-none"
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, backgroundColor: "#4338ca" }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 transition-colors"
            >
              <FaPaperPlane size={14} /> 
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <motion.div 
        className="mt-24 text-center border-t border-slate-200 pt-10 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <p className="text-slate-400 text-sm">© 2026 Chirag Singh. Built with React & Framer Motion.</p>
      </motion.div>
    </section>
  );
};

export default Contact;