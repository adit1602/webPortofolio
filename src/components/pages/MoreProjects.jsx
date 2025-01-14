import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaDownload } from 'react-icons/fa';
import Timeline from '../../utils/Timeline'

const MoreProjects = () => {

  return (
    <div className="min-h-screen bg-gray-900 text-white py-32 px-4">
      <div className="container mx-auto">
        <Timeline />
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
      </div>
    </div >
  );
};


export default MoreProjects;