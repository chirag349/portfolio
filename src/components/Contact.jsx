import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="p-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-5">Contact Me</h2>

      <form className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>

      <p className="mt-6 text-gray-500">
        You can also reach me on{" "}
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 font-semibold hover:underline"
        >
          LinkedIn
        </a>{" "}
        or{" "}
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 font-semibold hover:underline"
        >
          GitHub
        </a>.
      </p>
    </section>
  );
};

export default Contact;
