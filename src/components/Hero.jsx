import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (isTyping && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, 40); // Typing speed (lower = faster)
    } else if (displayText.length === text.length) {
      setIsTyping(false);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{
          opacity: [1, 0],
          transition: {
            duration: 0.7,
            repeat: Infinity,
            repeatType: 'reverse'
          }
        }}
        className="inline-block bg-primary w-1.5 h-5 ml-1"
      />
    </span>
  );
};

const Hero = () => {
  const description = "A passionate teenager exploring the world of technology, software development, and innovation.";

  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden" data-aos="fade"
    data-aos-duration="500">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left Content - Added pl-10 to move content to the right */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-white pl-10" // Added pl-10 (padding-left)
          >
            <span className="text-sm md:text-base font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider">
              Pelajar
            </span>
            <h1 className="text-5xl md:text-6xl font-bold">
              I'm <span className="text-primary">Haikal</span>
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              <TypingText text={description} />
            </p>
            <br/>
            <a href="#contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 text-white px-8 py-3 rounded-full hover:bg-white/30 backdrop-blur-sm transition duration-300"
              >
                Get in Touch
              </motion.button>
            </a>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="w-64 h-64 md:w-80 md:h-80 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <img 
                src="/src/components/images/icon.png"
                alt="Haikal Mabrur"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="background"></div>
    </section>
  );
};

export default Hero;