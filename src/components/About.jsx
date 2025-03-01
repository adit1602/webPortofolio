import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaServer, FaRobot, FaGraduationCap, FaEnvelope } from 'react-icons/fa';
import FadeUp from './FadeUp';

const About = () => {
  const [titleHover, setTitleHover] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const moreButtonRef = useRef(null);
  
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.7 });
  const isMoreButtonInView = useInView(moreButtonRef, { once: false, amount: 0.5 });
  
  // Hover animation variant
  const cardVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: {
      scale: 1.03,
      rotate: 0.5,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    tap: {
      scale: 0.98,
      rotate: -2,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
  };

  // Skills data
  const skills = [
    { icon: FaCode, title: "Web Development", description: "Building modern responsive websites with React, Tailwind, and more" },
    { icon: FaServer, title: "Server Management", description: "Setting up and managing servers for various applications" },
    { icon: FaRobot, title: "Bot Development", description: "Creating automation bots for Discord, WhatsApp and other platforms" },
    { icon: FaGraduationCap, title: "Minecraft Plugin Maker", description: "Creating custom plugins for Minecraft servers using Java" },
  ];

  // Languages
  const languages = [
    { title: "Indonesia", subtitle: "Native" },
    { title: "English", subtitle: "Fluent" },
    { title: "JavaScript", subtitle: "Advanced" },
    { title: "C++/C#", subtitle: "Normal" },
    { title: "Java", subtitle: "Beginner" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-28 bg-transparent">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <motion.h2
              onMouseEnter={() => setTitleHover(true)}
              onMouseLeave={() => setTitleHover(false)}
              className="text-4xl font-bold text-white relative inline-block"
            >
              <strong className='font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider'>About Me</strong>
              
              <AnimatePresence>
                {titleHover && (
                  <motion.span
                    key="emoji"
                    initial={{ opacity: 0, x: 10, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inline-block ml-2"
                  >
                    👋🏻
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-300 mt-4 max-w-2xl mx-auto"
            >
              A passionate teenage developer exploring technology and creating digital solutions.
            </motion.p>
          </motion.div>
        </div>

        {/* Main content: Bio + Photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
          {/* Bio Section */}
          <FadeUp>
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={isTitleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Who am I?
                  </span>
                </h3>
                <p className="text-gray-300 text-lg">
                  I'm Haikal, a passionate teenage developer from Indonesia. At 15 years old, 
                  I've already explored various aspects of technology and software development.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isTitleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    My Journey
                  </span>
                </h3>
                <p className="text-gray-300 text-lg">
                  My coding journey started with simple HTML websites, but I quickly expanded my skills to include JavaScript, React, and backend technologies. I enjoy learning new technologies and frameworks, and I'm constantly working on personal projects to improve my skills.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-3 pt-6"
                initial={{ opacity: 0 }}
                animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {["React", "JavaScript", "Node.js", "TailwindCSS", "Discord.js", "Java"].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </FadeUp>
          
          {/* Card with glowing border */}
          <FadeUp delay={200}>
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="relative rounded-xl overflow-hidden h-full"
            >
              {/* Glowing border effect */}
              <motion.div 
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              <div className="p-1 relative z-10 rounded-xl">
                <div className="bg-gray-900/90 p-8 rounded-lg">
                  <div className="flex flex-col space-y-8">
                    <motion.div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                        <FaGraduationCap size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">MAN 1 Muara Enim</h3>
                        <p className="text-gray-300">Islamic Senior High School Number 1 at Muara Enim, South Sumatera, Indonesia</p>
                      </div>
                    </motion.div>
                    
                    <motion.div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                        <FaEnvelope size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Contact</h3>
                        <p className="text-gray-300 mb-1">Want to connect? Feel free to reach out!</p>
                        <p className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                          me@haikaldev.my.id
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-wrap gap-3 pt-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-4 py-2 rounded-full text-pink-300 text-sm">
                        Gamer
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 rounded-full text-blue-300 text-sm">
                        Developer
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 rounded-full text-purple-300 text-sm">
                        Student
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeUp>
        </div>

        {/* Skills Section */}
        <FadeUp delay={400}>
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Skills
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="p-6 card-on-dynamic-bg rounded-lg cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
                      <skill.icon className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
                    <p className="text-gray-300 text-sm">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Languages Section */}
        <FadeUp delay={600}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Languages
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileTap="tap"
                  initial="initial"
                  whileHover="hover"
                  className="p-4 card-on-dynamic-bg rounded-lg cursor-pointer text-center"
                >
                  <h3 className="font-bold text-xl text-white">
                    {lang.title}
                  </h3>
                  <p className="text-gray-300">
                    {lang.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* New "More About Me" Button */}
        <div className="mt-12 flex justify-center md:justify-end" ref={moreButtonRef}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isMoreButtonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
            whileTap={{ 
              scale: 0.95,
              rotate: -3
            }}
          >
            <Link 
              to="/more-about"
              className="group inline-flex items-center justify-center 
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full 
              transition duration-300 transform hover:shadow-lg"
            >
              <motion.span 
                className="mr-2 relative"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3
                  }
                }}
              >
                More About Me
              </motion.span>
              <motion.span
                animate={{
                  x: [0, 5, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }
                }}
                className="relative"
              >
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                <motion.span
                  className="absolute top-0 left-0 w-full h-full"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [1, 1.5, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <FaArrowRight className="text-white opacity-50" />
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;