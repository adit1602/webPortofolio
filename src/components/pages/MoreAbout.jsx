import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaDownload } from 'react-icons/fa';

const MoreAbout = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

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
        <br/>
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
              transition: {
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