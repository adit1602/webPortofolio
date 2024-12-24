import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaWhatsapp, FaDiscord, FaYoutube } from 'react-icons/fa';
import { SiX } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaGithub, 
      link: 'https://github.com/AnakTentara',
      name: 'GitHub'
    },
    { 
      icon: FaInstagram, 
      link: 'https://instagram.com/haikal_mabrur',
      name: 'Instagram'
    },
    { 
      icon: SiX, 
      link: 'https://x.com/AnakTentara2',
      name: 'X (Twitter)'
    },
    { 
      icon: FaWhatsapp, 
      link: 'https://wa.me/6289675732001',
      name: 'WhatsApp'
    },
    { 
      icon: FaDiscord, 
      link: 'https://discord.com/users/804720825109315605',
      name: 'Discord'
    },
    { 
      icon: FaYoutube, 
      link: 'https://youtube.com/@AnakTentaraIDN',
      name: 'YouTube'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <motion.div
              whileTap={{ 
                scale: 1.05,
                rotate: [0, 5, -5, 1],
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }
              }}
              className="flex items-center space-x-4 mb-4"
            >
              <motion.img 
                src='images/icon.png' 
                alt="Haikal Mabrur Logo" 
                className="w-16 h-16"
                whileHover={{ rotate: 5 }}
                whileTap={{ rotate: 375 }}
              />
              <motion.h2 whileTap={{ scale: 0.98, rotate: 5  }} whileHover={{ scale: 1.05, rotate: -5 }} className="text-2xl font-bold">Haikal Mabrur</motion.h2>
            </motion.div>
            <motion.p whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} className="text-gray-400">
              A passionate teenager exploring technology, software development, and innovation.
            </motion.p>
          </div>

          {/* Quick Links */}
          <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>
            <motion.h3 whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} className="text-xl font-semibold mb-4">Quick Links</motion.h3>
            <motion.ul whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} className="space-y-2">
              {[
                { name: 'Home', link: '#home' },
                { name: 'About', link: '#about' },
                { name: 'Projects', link: '#projects' },
                { name: 'Contact', link: '#contact' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.link} 
                    className="text-gray-400 hover:text-primary-500 transition"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Social Media Links */}
          <motion.div whileTap={{ scale: 0.98 }}>
            <motion.h3 whileTap={{ scale: 0.98 }} className="text-xl font-semibold mb-4">Connect with Me</motion.h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-primary-500 transition"
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div whileTap={{ scale: 0.98 }} className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © {currentYear} Haikal Mabrur. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;