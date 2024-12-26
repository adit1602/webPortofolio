import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import $iconGR from '../../images/icon-bggradient.png'

const Navbar = () => {
  const iconGR = $iconGR;
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pressEffect, setPressEffect] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  }

  const handleNavPress = (e) => {
    if (!navRef.current) return;

    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const navWidth = rect.width;

    // Calculate press position relative to nav width
    const pressPosition = x / navWidth;

    // Create tilt effect based on press position
    const tiltX = (pressPosition - 0.5) * 3; // Range from -1 to 1
    setPressEffect({
      x: tiltX,
      y: 0.4 // Fixed downward press  
    });
  };

  const handleNavRelease = () => {
    setPressEffect({ x: 0, y: 0 });
  };

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
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      navigate('/', { state: { handleScrollTo: sectionId } });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: 0
        }} 
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        onMouseDown={handleNavPress}
        onMouseUp={handleNavRelease}
        onMouseLeave={handleNavRelease}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className="fixed w-full top-4 left-0 right-0 z-50"
      >
        <div className="container mx-auto rounded-full w-3/4 backdrop-blur-xl transition-all duration-100 ease-in-out">
          <motion.div
            className="relative bg-white/90 dark:bg-gray-900/90 
            rounded-full shadow-2xl border border-gray-200/50 dark:border-gray-800/50 
            py-4 px-8 max-w-5xl mx-auto flex justify-between items-center transition-all duration-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] ease-in-out"
            initial={{
              scale: 0.9,
              boxShadow: '0 0 6px -1px rgba(255,255,255,0.3), 0 -4px 4px -1px rgba(255, 255, 255, 0.06)'
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '2px 2px 25px -5px rgba(255,255,255,0.3), 0 0 10px -5px rgba(255, 255, 255, 0.3)',
              transition: {
                type: "tween",
                stiffness: 400,
                damping: 10,
                duration: 0.1
              }
            }}
            animate={{
              scale: 1,
              rotateX: pressEffect.y * 10,
              rotateY: pressEffect.x * 10,
              z: pressEffect.y * -10,
              boxShadow: pressEffect.y
                ? '0 10px 30px -5px rgba(0,0,0,0.3)'
                : '0 0 6px -1px rgba(255,255,255,0.3), 0 -4px 4px -1px rgba(255, 255, 255, 0.06)'
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            whileTap={{ scale: 0.98 }}
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
                src={iconGR}
                width="50px"
                alt="Logo"
                animate={{
                  rotate: 0,
                  scale: 1,
                  transition: { duration: 0.1 }
                }}
                whileTap={{
                  rotate: 380,
                  scale: 1.2,
                  transition: {
                    duration: 0.1,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{
                  rotate: 370,
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

const NavLinks = ({ activeSection, handleScrollTo, isMobile = false }) => {
  const location = useLocation();

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/' },
    { id: 'projects', label: 'Projects', path: '/' },
    { id: 'contact', label: 'Contact', path: '/' }
  ];

  return navLinks.map((link, index) => (
    <motion.a
      key={link.id}
      href={link.path === '/' ? `#${link.id}` : link.path}
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
          stiffness: 200,
          damping: 15
        }
      }}
      whileHover={{
        scale: 1.03,
        transition: {
          duration: 0.3
        }
      }}
      whileTap={{ scale: 0.97 }}
      className={`
        ${isMobile
          ? "text-3xl font-bold text-gray-800 dark:text-white"
          : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-500 relative group font-medium"
        }
        ${!isMobile && (location.pathname === '/' && activeSection === link.id
          ? 'text-primary-600 dark:text-primary-400'
          : '')
        }
      `}
    >
      {link.label}
      {!isMobile && (
        <>
          <motion.span
            layoutId={`underline-${link.id}`}
            className={`
              absolute bottom-0 left-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-500
              ${activeSection === link.id ? 'w-full' : 'w-0'} group-hover:w-full
            `}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          />
          {activeSection === link.id && (
            <motion.span
              layoutId={`active-indicator-${link.id}`}
              className="absolute bottom-0 left-0 h-0.5 bg-primary-600 dark:bg-primary-400 w-full"
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
            />
          )}
        </>
      )}
    </motion.a>
  ));
};

export default Navbar;