import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaEnvelope, FaGithub, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 dark:bg-gray-900">
    <section data-aos="zoom-in">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Left Side: Contact */}
          <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.04 }} className="flex-1">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-10 shadow-xl transition-transform transform">
              <h2 className="text-5xl font-extrabold text-center text-white mb-6">Mail Me!</h2>
              <a
                href="mailto:me@haikaldev.my.id"
                target="_blank"
                className="flex items-center justify-center bg-primary-600 text-white rounded-full px-6 py-3 transition duration-300 hover:bg-primary-500 transform hover:scale-105"
              >
                <FaEnvelope className="mr-2" />
                me@haikaldev.my.id
              </a>
              <br/>
              <h2 className="text-5xl font-extrabold text-center text-white mb-6">WhatsApp Me!</h2>
              <a
                href="https://wa.me/6289675732001"
                target="_blank"
                className="flex items-center justify-center bg-primary-600 text-white rounded-full px-6 py-3 transition duration-300 hover:bg-primary-500 transform hover:scale-105"
              >
                <FaWhatsapp className="mr-2" />
                (+62) 896 7573 2001
              </a>
              <br/>
              <h2 className="text-5xl font-extrabold text-center text-white mb-6">Discord Me!</h2>
              <a
                href="https://discord.com/users/804720825109315605"
                target="_blank"
                className="flex items-center justify-center bg-primary-600 text-white rounded-full px-6 py-3 transition duration-300 hover:bg-primary-500 transform hover:scale-105"
              >
                <FaDiscord className="mr-2" />
                haikalmabrur
              </a>
            </div>
          </motion.div>

          {/* Right Side: Icon and Social Media Links */}
          <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.04 }} className="bg-gray-800 rounded-lg p-8 shadow-lg text-center transition-transform transform hover:scale-105">
            <motion.img
              src='images/icon.png'
              alt="Haikal Mabrur"
              whileHover={{ 
                scale: 1.1,
                rotate: [5, -5, 5, -5, 5],
                transition: {
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }
              }}
              whileTap={{ 
                scale: 1.05,
                rotate: [0, 5, -5, 3],
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }
              }}
              className="w-24 h-24 mx-auto mb-4 cursor-pointer"
            />
            <motion.h3 
              className="text-xl font-bold text-white mb-4"
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.1,
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className='pl-3 pr-3 pb-1 bg-black rounded-full'>
                <motion.span 
                  className='bg-gradient-to-r from-pink-600 via-purple-400 to-blue-500 bg-clip-text text-transparent'
                  initial={{ scale: 1 }}
                  whileHover={{ 
                    scale: 1.2,
                    transition: {
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300
                    }
                  }}
                >
                  Connect
                </motion.span>
                </span> with me
            </motion.h3>
            <motion.ul whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} className="flex flex-col space-y-2">
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaDiscord /><a target="_blank" href="https://discord.com/users/804720825109315605">haikalmabrur</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaWhatsapp /><a target="_blank" href="https://wa.me/+6289675732001">(+62) 896 7573 2001</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaInstagram /><a target="_blank" href="https://instagram.com/haikal_mabrur">Instagram</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaYoutube /><a target="_blank" href="https://youtube.com/@AnakTentaraIDN">YouTube</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <FaGithub /><a target="_blank" href="https://github.com/AnakTentara">GitHub</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 hover:text-primary-600 transition duration-300">
                <SiX /><a target="_blank" href="https://x.com/AnakTentara2">Haikaru (X)</a>
              </li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </section>
  );
};

export default Contact;