import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-4 text-center text-gray-400">
      © {new Date().getFullYear()} Chirag Rajput | All Rights Reserved
    </footer>
  );
}
