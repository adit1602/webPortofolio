import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

import projectPictPortov1 from '../../images/1stportofolio.png';
import projectPictPortov2 from '../../images/screenshot-portofolio.png';
import projectPictNaturalSMP from '../../images/naturalsmp-screenshot.png';

const ProjectCard = ({ img, title, description, tags, link }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleOpenInNewTab = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
    setIsPreviewOpen(false);
  };

  return (
    <section>
      <motion.div 
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOpenPreview}
        className="bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer"
        
      >
        <div className="h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden">
          <img 
            src={img} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-primary-900 text-primary-100 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black text-white bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl"
            >
              {/* Popup Header */}
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold">{title}</h2>
                <button 
                  onClick={handleClosePreview}
                  className="text-white hover:text-white"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Popup Content */}
              <div className="p-4 text-white">
                {/* Preview Section */}
                <div className="w-full h-[360px] bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  <iframe 
                    src={link} 
                    title={title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenInNewTab}
                    className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Yes, Open in New Tab
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      img: `${projectPictPortov1}`, // Add your image paths
      title: "My First Portfolio Website",
      description: "My first modern web portfolio built with HTML, CSS, and little JavaScript",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://v1.haikaldev.my.id" // Add actual project links
    },
    {
      img: `${projectPictNaturalSMP}`,
      title: "Natural Survival Multiplayer",
      description: "An economy Minecraft server from Indonesia and for Asia",
      tags: ["Paper", "Bungeecord", "SMP", "RPG", "SlimeFun"],
      link: "https://web.naturalsmp.xyz"
    },
    {
      img: `${projectPictPortov2}`,
      title: "This Portfolio Website",
      description: "My recent Portfolio Website built with AI",
      tags: ["JSX", "CSS", "HTML"],
      link: "https://haikaldev.my.id"
    }
  ];

  return (
    <section id="projects" className='py-20 bg-gray-800'>
      <section data-aos="fade-left">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
    </section>
  );
};

export default Projects;