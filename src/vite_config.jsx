import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import App from "./App";

export default function ViteConfig() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const apiUrl =
      import.meta.env.VITE_API_URL ||
      "https://portfolio-subscription-access-iz0pxib49.vercel.app";
    const username = "chirag-singh";

    fetch(`${apiUrl}/check-subscription/${username}`)
      .then((res) => res.json())
      .then((data) => setActive(Boolean(data.active)))
      .catch(() => setActive(false)); // if API fails, deny access
  }, []);

  // Loader while checking subscription
  if (active === null)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">
        <motion.div
          className="w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <span className="ml-4">Loading Tailwind CSS...</span>
      </div>
    );

  // Access Denied page
  if (!active)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
        <motion.div
          className="bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
            alt="Tailwind CSS Logo"
            className="w-24 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-200 text-lg mb-6">
            Your subscription for this React project is inactive. To continue exploring
            the project, please renew your subscription or contact support.
          </p>
          <a
            href="https://tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 mb-4"
          >
            Contact Support
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Need help setting up Tailwind with Vite?{" "}
            <a
              href="https://tailwindcss.com/docs/installation/using-vite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Tailwind + Vite Docs
            </a>
          </p>
        </motion.div>
      </div>
    );

  // Subscription active → normal app
  return <App />;
}
