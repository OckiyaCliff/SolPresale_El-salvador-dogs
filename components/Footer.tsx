import React from "react";
import { FaTwitter, FaTelegramPlane } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center items-center py-4 bg-black text-white">
      <div className="flex space-x-4">
        <a href="https://twitter.com/yourtwitterhandle" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
          <FaTwitter size={30} />
        </a>
        <a href="https://t.me/Elsalvadordogss" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
          <FaTelegramPlane size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;