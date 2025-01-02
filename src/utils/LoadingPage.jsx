import React from 'react';
import { motion } from 'framer-motion';

const LoadingPage = () => {
  // Variasi warna gradient
  const gradientColors = [
    'from-primary-400 to-primary-600',
    'from-blue-500 to-purple-600',
    'from-green-400 to-teal-600',
  ];

  // Animasi particle
  const ParticleEffect = () => {
    return (
      <>
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * window.innerWidth - window.innerWidth / 2,
              y: Math.random() * window.innerHeight - window.innerHeight / 2
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [
                Math.random() * window.innerWidth - window.innerWidth / 2, 
                Math.random() * window.innerWidth - window.innerWidth / 2,
                Math.random() * window.innerWidth - window.innerWidth / 2
              ],
              y: [
                Math.random() * window.innerHeight - window.innerHeight / 2,
                Math.random() * window.innerHeight - window.innerHeight / 2,
                Math.random() * window.innerHeight - window.innerHeight / 2
              ]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut'
            }}
            className="absolute w-2 h-2 rounded-full bg-white/30"
          />
        ))}
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0">
        <ParticleEffect />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/90 mix-blend-overlay"></div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Animated Logo/Icon */}
        <motion.div
          initial={{ 
            scale: 0, 
            rotate: -180,
            opacity: 0 
          }}
          animate={{ 
            scale: [0, 1.2, 1],
            rotate: 0,
            opacity: 1,
            transition: {
              duration: 1,
              type: "spring",
              stiffness: 120,
              damping: 10
            }
          }}
          className={`
            w-32 h-32 
            bg-gradient-to-br ${gradientColors[Math.floor(Math.random() * gradientColors.length)]} 
            rounded-full 
            flex items-center justify-center
            shadow-2xl
            mb-8
          `}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
            className="w-24 h-24 bg-black/20 rounded-full"
          />
        </motion.div>

        {/* Loading Text */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.5
            }
          }}
          className="text-2xl font-bold text-white tracking-wider"
        >
          Loading
        </motion.h2>

        {/* Animated Loading Bar */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ 
            width: ['0%', '50%', '100%'],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }
          }}
          className="mt-4 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
        />

        {/* Subtle Pulsing Text */}
        <motion.p
          animate={{
            opacity: [0.6, 1, 0.6],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }
          }}
          className="mt-4 text-sm text-white/70"
        >
          Preparing your experience...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingPage;