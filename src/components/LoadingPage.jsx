import React from 'react';
import { motion } from 'framer-motion';

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-24 h-24 mb-6 mx-auto relative"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "linear" 
          }}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 border-t-4 border-blue-500 rounded-full"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 border-r-4 border-purple-500 rounded-full" style={{ transform: 'rotate(45deg)' }}></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 border-b-4 border-pink-500 rounded-full" style={{ transform: 'rotate(90deg)' }}></div>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-bold text-white mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Loading...
        </motion.h2>
        
        <motion.p 
          className="text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Preparing your files
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingPage; 