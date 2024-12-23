import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = ['home', 'about', 'projects', 'contact'];

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop - 100;
          const bottom = top + element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        className="fixed w-full top-4 left-0 right-0 z-50"
      >
        <div className="container mx-auto rounded-full w-3/4 backdrop-blur-xl transition-all duration-100 ease-in-out">
          <motion.div
            className="relative bg-white/90 dark:bg-gray-900/90 
      rounded-full shadow-2xl border border-gray-200/50 dark:border-gray-800/50 
      py-4 px-8 max-w-5xl mx-auto flex justify-between items-center transition-all duration-100 ease-in-out"
            initial={{
              scale: 0.9,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            whileHover={{
              scale: 1.02, // Slightly larger on hover
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
            animate={{
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            whileTap={{ scale: 0.98 }} // Slight squeeze on tap
          >
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleScrollTo('home'); }}
              className="flex items-center space-x-4 group"
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }
              }}
            >
              <motion.img
                src="/src/components/images/icon.png"
                width="50px" // Slightly larger icon
                alt="Logo"
                animate={{
                  rotate: 0,
                  scale: 1,
                  transition: { duration: 0.1 }
                }}
                whileHover={{
                  rotate: 375,
                  scale: 1.2,
                  transition: {
                    duration: 0.1,
                    ease: "easeInOut"
                  }
                }}
                className="transition-transform duration-300"
              />
              <motion.span
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.1,
                    type: "spring",
                    stiffness: 300
                  }
                }}
                className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300"
              >
                Haikal Mabrur
              </motion.span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLinks
                activeSection={activeSection}
                handleScrollTo={handleScrollTo}
              />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              {isMobileMenuOpen ? (
                <motion.button
                  onClick={toggleMobileMenu}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-800 dark:text-white focus:outline-none"
                >
                  <FaTimes size={24} />
                </motion.button>
              ) : (
                <motion.button
                  onClick={toggleMobileMenu}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-800 dark:text-white focus:outline-none"
                >
                  <FaBars size={24} />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl z-40 md:hidden"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex flex-col items-center justify-center h-full space-y-8"
            >
              <NavLinks
                activeSection={activeSection}
                handleScrollTo={handleScrollTo}
                isMobile={true}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// NavLinks Component
const NavLinks = ({ activeSection, handleScrollTo, isMobile = false }) => {
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return navLinks.map((link, index) => (
    <motion.a
      key={link.id}
      href={`#${link.id}`}
      onClick={(e) => {
        e.preventDefault();
        handleScrollTo(link.id);
      }}
      initial={{ opacity: 0, y: isMobile ? 20 : 0 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: isMobile ? index * 0.1 : 0,
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${isMobile
          ? "text-3xl font-bold text-gray-800 dark:text-white"
          : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 relative group font-medium"
        }
        ${!isMobile && (activeSection === link.id
          ? 'text-primary-600 dark:text-primary-400'
          : '')
        }
      `}
    >
      {link.label}
      {!isMobile && (
        <motion.span
          layoutId="underline"
          className={`
            absolute bottom-0 left-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300
            ${activeSection === link.id ? 'w-full' : 'w-0'} group-hover:w-full
          `}
        />
      )}
    </motion.a>
  ));
};

export default Navbar;