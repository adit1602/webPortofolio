import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';
import { useTypingText } from '../utils/typingAnimation';
import $icon from '../../images/icon.png';
import { FaArrowDown, FaCode, FaServer, FaRobot } from 'react-icons/fa';

const Hero = () => {
  const icon = $icon;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create grid points
    const gridSize = 30;
    const points = [];
    const spacing = 80;
    
    for (let x = 0; x < canvas.width + spacing; x += spacing) {
      for (let y = 0; y < canvas.height + spacing; y += spacing) {
        points.push({
          x,
          y,
          originalX: x,
          originalY: y,
          size: Math.random() * 1.5 + 0.5,
          color: `rgba(255, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, ${Math.random() * 0.5 + 0.1})`,
          velocity: {
            x: Math.random() * 0.4 - 0.2,
            y: Math.random() * 0.4 - 0.2
          }
        });
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 10, 30, 0.9)');
      gradient.addColorStop(1, 'rgba(30, 10, 40, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      points.forEach(point => {
        // Update position with slight movement
        point.x += point.velocity.x;
        point.y += point.velocity.y;
        
        // Boundary check and reset
        if (point.x < 0 || point.x > canvas.width) point.velocity.x *= -1;
        if (point.y < 0 || point.y > canvas.height) point.velocity.y *= -1;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
        
        // Connect nearby points with lines
        points.forEach(otherPoint => {
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
      ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const description = "A passionate teenager exploring the world of technology, software development, and innovation.";
  const TypingText = useTypingText(description);

  const skills = [
    { icon: FaCode, text: "Web Development", delay: 0.2 },
    { icon: FaServer, text: "Server Management", delay: 0.4 },
    { icon: FaRobot, text: "Bot Development", delay: 0.6 }
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-40 md:pt-32"
      style={{ perspective: "1000px" }}
    >
      {/* Interactive Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{
          opacity,
          paddingTop: "0rem",
          height: "100%"
        }}
      >
        <div className="container mx-auto px-4 py-0 flex items-center justify-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto w-full">
            {/* Left Content: Text and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white space-y-5 order-2 md:order-1 text-center md:text-left px-4 md:px-0"
            >
              {/* Modernized Developer Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur"></div>
                  <div className="relative px-5 py-2 bg-black bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-full flex items-center gap-2">
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Student Developer
                    </span>
                  </div>
                </div>
              </motion.div>
              
              {/* Main Heading */}
              <motion.h1 
                className="text-5xl md:text-7xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ 
                  transform: `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px, 0px)`,
                  textShadow: "0 10px 30px rgba(0,0,0,0.5)"
                }}
              >
                I'm <span className="bg-gradient-to-r from-[#ff3d4d] to-[#ff6d7e] bg-clip-text text-transparent">Haikal</span>
              </motion.h1>
              
              {/* Description with typing effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg text-gray-300 max-w-md"
                style={{ 
                  transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px, 0px)` 
                }}
              >
                <TypingText />
              </motion.div>
              
              {/* Skills */}
              <motion.div 
                className="flex flex-wrap gap-3 pt-3 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: skill.delay + 0.7, duration: 0.5 }}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <skill.icon className="text-[#ff3d4d]" />
                    <span className="text-sm text-white">{skill.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="pt-4 flex justify-center md:justify-start hidden md:flex"
              >
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255, 61, 77, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#ff3d4d] to-[#ff6d7e] text-white px-8 py-3 rounded-full transition duration-300 flex items-center space-x-2"
                >
                  <span>Get in Touch</span>
          <motion.div
                    animate={{ 
                      y: [0, 5, 0],
                      transition: { repeat: Infinity, duration: 1.5 }
                    }}
                  >
                    <FaArrowDown />
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Right Content: Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center items-center order-1 md:order-2 py-4 md:py-0 mt-24 md:mt-0"
              style={{ 
                transform: `translate3d(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px, 0px)` 
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Glowing background effect */}
                <motion.div 
                  className="absolute inset-0 rounded-[45px] bg-gradient-to-r from-[#ff3d4d] to-[#ff6d7e] blur-xl opacity-30"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Profile image container - make it smaller on mobile */}
                <motion.div
                  className="w-48 h-48 md:w-80 md:h-80 bg-gradient-to-br from-gray-900 to-black rounded-[45px] p-1 relative z-10 overflow-hidden"
                  style={{ boxShadow: "0 0 30px rgba(255, 61, 77, 0.3)" }}
                >
                  <div className="w-full h-full rounded-[40px] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-4">
              <img
                src={icon}
                alt="Haikal Mabrur"
                      className="w-full h-full object-cover rounded-[35px]"
                    />
                  </div>
                  
                  {/* Animated border */}
                  <motion.div 
                    className="absolute inset-0 rounded-[45px] border-2 border-[#ff3d4d] opacity-50"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotate: { repeat: Infinity, duration: 10, ease: "linear" },
                      scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                    }}
              />
            </motion.div>
          </motion.div>
            </motion.div>
          </div>
        </div>
            </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        style={{ opacity }}
        animate={{ 
          y: [0, 10, 0],
          transition: { repeat: Infinity, duration: 1.5 }
        }}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center"
        >
          <FaArrowDown 
            className="text-[#ff3d4d] text-2xl" 
            style={{ filter: "drop-shadow(0 0 8px rgba(255, 61, 77, 0.5))" }}
          />
        </motion.div>
          </motion.div>
    </section>
  );
};

export default Hero;