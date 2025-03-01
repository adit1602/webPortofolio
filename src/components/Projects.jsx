import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaExternalLinkAlt, FaArrowRight, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import projectPictPortov1 from '../../images/1stportofolio.png';
import projectPictPortov2 from '../../images/screenshot-portofolio.png';
import projectPictNaturalSMP from '../../images/naturalsmp-screenshot.png';
import projectPictNaniKore from '../../images/nanikoregroup.png';
//import projectPictMTs from '../../images/PTSPMTs.png';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  const isCardInView = useInView(cardRef, { 
    once: false, 
    amount: 0.3,
    margin: "0px 0px -100px 0px" 
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      initial="hidden"
      animate={isCardInView ? "visible" : "hidden"}
      exit="exit"
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-lg card-on-dynamic-bg p-6 h-full"
        whileHover={{
          y: -5,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        }}
      >
        {/* Project Image with Overlay */}
        <div className="relative h-48 mb-4 overflow-hidden rounded-md">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isHovered ? 0.8 : 0.5 }}
          />
          <motion.img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute bottom-3 left-3 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 text-white bg-black bg-opacity-60 backdrop-blur-md rounded-full hover:bg-opacity-80 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 text-white bg-black bg-opacity-60 backdrop-blur-md rounded-full hover:bg-opacity-80 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Project Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
          
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies.map((tech, index) => (
            <span
              key={index}
                className="text-xs px-2 py-1 rounded-full 
                  bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30
                  text-blue-300"
            >
                {tech}
            </span>
          ))}
          </div>
          
          {/* Visit Project Button */}
          {project.link && (
            <motion.a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-sm text-white font-medium flex items-center justify-center py-2 rounded-md bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/40 hover:to-purple-500/40"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaExternalLinkAlt className="mr-2" />
              Visit Project
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.8 });

  const projects = [
    {
      id: 1,
      title: "Portfolio Website 2.0",
      description: "My personal portfolio website built with React and Tailwind CSS, featuring smooth animations and responsive design. It showcases my projects, skills, and experiences.",
      image: projectPictPortov2,
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/AnakTentara/Portofolio-2.0",
      link: "https://haikaldev.my.id"
    },
    {
      id: 2,
      title: "NaturalSMP Minecraft Server",
      description: "A custom Minecraft server network with unique gameplay features, custom plugins, and a dedicated community. Supports multiple game modes and events.",
      image: projectPictNaturalSMP,
      technologies: ["Java", "PaperMC"],
      link: "https://web.naturalsmp.xyz"
    },
    {
      id: 3,
      title: "First Portfolio Website",
      description: "My first portfolio website, designed and built from scratch to showcase my early development skills and projects.",
      image: projectPictPortov1,
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/AnakTentara/Portofolio",
      link: "https://v1.haikaldev.my.id"
    },
    {
      id: 4,
      title: "NaniKore Group Website",
      description: "A collaborative group website that features various projects and resources for the community.",
      image: projectPictNaniKore,
      technologies: ["React", "TailwindCSS", "Node.js"],
      github: "https://github.com/AnakTentara/NaniKore-Group",
      link: "https://group.haikaldev.my.id"
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-28 bg-transparent">
      {/* Hero Section with perfect centering */}
      <div className="flex justify-center w-full mb-16">
        <div 
          ref={headingRef} 
          className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center py-10 relative"
        >
          {/* Visual center guide - left */}
          <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-[5%] h-[1px] bg-gradient-to-r from-transparent to-blue-500/50"></div>
          
          {/* Content */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center w-full"
          >
            <strong className='font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider'>My Projects</strong>
          </motion.h2>

          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full my-6"
            initial={{ width: 0 }}
            animate={isHeadingInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 text-lg text-center max-w-2xl"
          >
            Here are some of my recent projects. Each project represents my skills and passion for creating innovative solutions.
          </motion.p>
          
          {/* Visual center guide - right */}
          <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-[5%] h-[1px] bg-gradient-to-l from-transparent to-purple-500/50"></div>
        </div>
      </div>

      {/* Project Grid Container */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/more-projects">
            <motion.div
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowRight className="mr-2" />
              Explore More Projects
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;