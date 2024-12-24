import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';
import { useTypingText } from '../utils/typingAnimation';

const Hero = () => {
  const canvasRef = useRef(null);

  const Particle = class {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = this.canvas.height + Math.random() * 100;
      this.radius = Math.random() * 2 + 1; // Slightly smaller
      this.speed = Math.random() * 2 + 1;
      this.color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`; // More transparency
    }

    update() {
      this.y -= this.speed;

      // Reset particle if it goes off screen
      if (this.y < -10) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.2)'; // Softer glow
      ctx.shadowBlur = 5; // Reduced blur
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0; // Reset shadow
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particlesArray = [];
    const particleCount = 200; // Slightly reduced count
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle(canvas));
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Very dark background with slight transparency
      ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'; // Very subtle grid
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      particlesArray.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const description = "A passionate teenager exploring the world of technology, software development, and innovation.";
  const TypingText = useTypingText(description);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black overflow-hidden py-20 md:pt-0"
      data-aos="fade"
      data-aos-duration="500"
    >
      {/* Interactive Background Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.80 }}
            className="flex justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
              }}
              className="w-64 h-64 md:w-80 md:h-80 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <img
                src='images/icon.png'
                alt="Haikal Mabrur"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Title and Description Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }}
            className="space-y-6 text-white pl-10"
          >
            <motion.div whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }}>
              <span className="text-sm md:text-base font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider">
                Pelajar
              </span>
            </motion.div>
            <motion.div whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }}>
              <h1 className="text-5xl md:text-6xl font-bold">
                I'm <span className="text-primary">Haikal</span>
              </h1>
            </motion.div>
            <motion.p
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-lg text-white/80 max-w-md"
            >
              <TypingText />
            </motion.p>
            <br />
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 text-white px-8 py-3 rounded-full hover:bg-white/30 backdrop-blur-sm transition duration-300"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;