import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaEnvelope, FaGithub, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'; // Importing icons

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Left Side: Contact */}
          <div className="flex-1">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-10 shadow-xl transition-transform transform hover:scale-105">
              <h2 className="text-5xl font-extrabold text-center text-white mb-6">Mail Me!</h2>
              <a
                href="mailto:me@haikaldev.my.id"
                className="flex items-center justify-center bg-primary-600 text-white rounded-full px-6 py-3 transition duration-300 hover:bg-primary-500 transform hover:scale-105"
              >
                <FaEnvelope className="mr-2" />
                me@haikaldev.my.id
              </a>
              <br/>
              <h2 className="text-5xl font-extrabold text-center text-white mb-6">WhatsApp Me!</h2>
              <a
                href="https://wa.me/6289675732001"
                className="flex items-center justify-center bg-primary-600 text-white rounded-full px-6 py-3 transition duration-300 hover:bg-primary-500 transform hover:scale-105"
              >
                <FaWhatsapp className="mr-2" />
                (+62) 896 7573 2001
              </a>
              <br/>
              <h2 className="text-5xl font-extrabold text-center text-white mb-6">Discord Me!</h2>
              <a
                href="https://discord.com/users/804720825109315605"
                className="flex items-center justify-center bg-primary-600 text-white rounded-full px-6 py-3 transition duration-300 hover:bg-primary-500 transform hover:scale-105"
              >
                <FaDiscord className="mr-2" />
                haikalmabrur
              </a>
            </div>
          </div>

          {/* Right Side: Icon and Social Media Links */}
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg text-center transition-transform transform hover:scale-105">
            <img
              src="/src/components/images/icon.png"
              alt="Haikal Mabrur"
              className="w-24 h-24 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-white mb-4">Connect with Me</h3>
            <ul className="flex flex-col space-y-2">
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaDiscord /><a href="https://discord.com/users/804720825109315605">haikalmabrur</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaWhatsapp /><a href="https://wa.me/+6289675732001">(+62) 896 7573 2001</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaInstagram /><a href="https://instagram.com/haikal_mabrur">Instagram</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaYoutube /><a href="https://youtube.com/@AnakTentaraIDN">YouTube</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaGithub /><a href="https://github.com/AnakTentara">GitHub</a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;