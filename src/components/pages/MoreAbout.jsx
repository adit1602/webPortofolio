import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaDownload } from 'react-icons/fa';

const MoreAbout = () => {
  const [titleHover, setTitleHover] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const cardVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: {
      scale: 1.05,
      rotate: 1,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    tap: {
      scale: 0.95,
      rotate: -5,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
  }

  const titleVariants = {
    initial: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    hover: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
  };

  // Emoji animation
  const emojiVariants = {
    initial: {
      opacity: 0,
      x: 10,
      scale: 0.5
    },
    hover: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <div id="more-about" className="min-h-screen bg-gray-900 text-white flex items-center justify-center pt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        className="container mx-auto px-4 text-center"
      >
        <motion.h1 whileHover={{ scale: 1.03, rotate: 1 }} whileTap={{ scale: 0.95, rotate: -1 }} className="py-12 text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          More About Haikal Mabrur
        </motion.h1>
        <br />
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.99 }} className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
          <motion.h2 whileTap={{ scale: 0.95 }} className="text-3xl font-semibold mb-4">Background</motion.h2>
          <motion.p whileTap={{ scale: 0.95 }} className="text-gray-300 mb-4">
            I'm a passionate technology enthusiast from Indonesia, born in 2008.
            My journey in tech started with gaming and gradually evolved into software development.
          </motion.p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.99 }} className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
          <motion.h2 whileTap={{ scale: 0.95 }} className="text-3xl font-semibold mb-4">Skills & Expertise</motion.h2>
          <motion.p className="flex flex-wrap justify-center gap-4">
            {['JavaScript', 'React', 'Node.js', 'C++', 'C#', 'Python'].map((skill) => (
              <motion.span
                key={skill}
                className="bg-primary px-4 py-2 rounded-full text-sm"
                whileTap={{ scale: 0.80 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        <div>
          <motion.h2
            initial={{ x: 0 }}
            animate={{
              x: titleHover ? [-10, 10, -10, 10, 0] : 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
            onMouseEnter={() => setTitleHover(true)}
            onMouseLeave={() => setTitleHover(false)}
            className="text-4xl font-bold text-center text-white mb-12 inline-block relative"
          >
            <strong className='mb:16 font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider'>PC Specification</strong>
            <AnimatePresence>
              {titleHover && (
                <motion.span
                  key="emoji"
                  initial={{ opacity: 0, x: 10, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute inline-block ml-2 text-primary-600 dark:text-primary-400"
                >
                  🖥
                </motion.span>
              )}
            </AnimatePresence>
          </motion.h2>

          <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Intel Core i5 760", subtitle: "CPU" },
              { title: "16GB DDR3", subtitle: "RAM" },
              { title: "GT 220", subtitle: "GPU/VGA" },
              { title: "GA-H55M-UDH2", subtitle: "Motherboard" },
              { title: "1.5TB", subtitle: "Storage" },
              { title: "Windows 10", subtitle: "OS" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileTap={{ scale: 0.98, rotate: 1 }}
                initial="initial"
                whileHover={{ scale: 1.03, rotate: -2 }}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer"
              >
                <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: [0, 5, -5, 0],
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center 
    bg-primary text-white px-6 py-3 rounded-full 
    hover:bg-primary-600 transition duration-300"
            >
              <FaHome className="mr-2" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: [0, 5, -5, 0],
              transion: {
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/downloads"
              className="inline-flex items-center justify-center 
    bg-gray-700 text-white px-6 py-3 rounded-full 
    hover:bg-gray-600 transition duration-300"
            >
              <FaDownload className="mr-2" />
              Download
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};


export default MoreAbout;