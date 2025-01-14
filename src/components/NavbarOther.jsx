import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, } from 'react-router-dom';
import $iconGR from '../../images/icon-bggradient.png'

const NavbarOther = () => {
  const navigate = useNavigate();
  const iconGR = $iconGR;

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <motion.nav
      className="fixed w-full top-4 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="container mx-auto rounded-full w-3/4 backdrop-blur-xl">
        <motion.div
          className="relative bg-white/90 dark:bg-gray-900/90 
          rounded-full shadow-2xl border border-gray-200/50 dark:border-gray-800/50 
          py-4 px-8 max-w-5xl mx-auto flex items-center justify-center transition-all duration-300"
          initial={{
            scale: 0.9,
            boxShadow: '0 0 6px -1px rgba(255,255,255,0.3), 0 -4px 4px -1px rgba(255, 255, 255, 0.06)'
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '2px 2px 25px -5px rgba(255,255,255,0.3), 0 0 10px -5px rgba(255, 255, 255, 0.3)',
            transition: {
              type: "tween",
              stiffness: 300,
              damping: 10,
              duration: 0.1
            }
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogoClick}
        >
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-4 group cursor-pointer"
            onClick={handleLogoClick}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1,
              bounce: 1,
              duration: 3,
              delay: 0.3,
            }}
            whileHover={{
              scale: 1.05,
              transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 300
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={iconGR}
              width="50px"
              alt="Logo"
              animate={{
                rotate: 0,
                scale: 1,
                transition: { duration: 0.1 }
              }}
              whileTap={{
                rotate: 375,
                scale: 1.2,
                transition: {
                  duration: 0.1,
                  ease: "easeInOut"
                }
              }}
              whileHover={{
                rotate: 365,
                scale: 1.2,
                transition: { duration: 0.5 }
              }}
              className="transition-transform duration-300"
            />
            <motion.span
              whileHover={{
                scale: 1.1,
                rotate: 2,
                transition: {
                  duration: 0.1,
                  type: "spring",
                  stiffness: 300
                }
              }}
              className="text-xl font-bold text-white transition-colors duration-300"
            >
              Haikal Mabrur
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
export default NavbarOther;