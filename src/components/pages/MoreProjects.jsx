import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaHome, FaDownload, FaGithub, FaExternalLinkAlt, FaCode, FaCalendarAlt, FaFilm, FaYoutube, FaPlay, FaArrowLeft } from 'react-icons/fa';

// Import images (using the same ones from Projects component)
import projectPictPortov1 from '../../../images/1stportofolio.png';
import projectPictPortov2 from '../../../images/screenshot-portofolio.png';
import projectPictNaturalSMP from '../../../images/naturalsmp-screenshot.png';
import projectPictNaniKore from '../../../images/nanikoregroup.png';

const ProjectCard = ({ project, index, priority = false }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: false, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  // Create a YouTube embed URL that shows thumbnail and requires click to play
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    // Add parameters to show thumbnail and require click to play
    if (url.includes('youtube.com/embed/')) {
      return `${url}?showinfo=0&rel=0`;
    }
    return url;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`w-full ${priority ? 'col-span-1 md:col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
        whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)" }}
      >
        {/* Project Image/Video with Overlay */}
        <div className="relative h-56 overflow-hidden">
          {project.isVideoEdit ? (
            // For video editing projects, show the embedded YouTube player with thumbnail
            <div className="w-full h-full bg-black">
              <iframe
                src={getYouTubeEmbedUrl(project.videoUrl)}
                className="w-full h-full"
                frameBorder="0"
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            // For development projects, show the image with hover overlay
            <>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10"
                animate={{ opacity: isHovered ? 0.9 : 0.6 }}
              />
              <motion.img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Hover Actions */}
              <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center opacity-0 gap-4"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 text-white bg-black/70 backdrop-blur-md rounded-full hover:bg-black/90 transition-all"
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
                    className="flex items-center justify-center w-12 h-12 text-white bg-blue-600/90 backdrop-blur-md rounded-full hover:bg-blue-600 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </motion.a>
                )}
              </motion.div>
            </>
          )}
        </div>

        {/* Project Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <div className="flex items-center text-xs text-gray-400">
              <FaCalendarAlt className="mr-1" />
              <span>{project.date}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4">{project.description}</p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-full 
                  bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20
                  text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 flex items-center">
              {project.isVideoEdit ? (
                <><FaFilm className="mr-2" /> Video Edit</>
              ) : (
                <><FaCode className="mr-2" /> {project.type}</>
              )}
            </span>

            {project.status && (
              <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                  project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                }`}>
                {project.status}
              </span>
            )}
          </div>

          {/* YouTube Link Button for Video Projects */}
          {project.isVideoEdit && project.youtubeLink && (
            <motion.a
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center mt-4 py-2 px-4 rounded-md bg-red-600/20 hover:bg-red-600/30 text-red-300 text-sm transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaYoutube className="mr-2" />
              Watch on YouTube
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const MoreProjects = () => {
  const headerRef = useRef(null);
  const devSectionRef = useRef(null);
  const videoSectionRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 });
  const isDevSectionInView = useInView(devSectionRef, { once: false, amount: 0.2 });
  const isVideoSectionInView = useInView(videoSectionRef, { once: false, amount: 0.2 });

  // These are the same 4 projects from the main Projects component
  const projects = [
    {
      id: 1,
      title: "Portfolio Website 2.0",
      description: "My personal portfolio website built with React and Tailwind CSS, featuring smooth animations and responsive design. It showcases my projects, skills, and experiences.",
      image: projectPictPortov2,
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/AnakTentara/Portofolio-2.0",
      link: "https://haikaldev.my.id",
      date: "2025",
      type: "Web App",
      status: "In Progress"
    },
    {
      id: 2,
      title: "NaturalSMP Minecraft Server",
      description: "A custom Minecraft server network with unique gameplay features, custom plugins, and a dedicated community. Supports multiple game modes and events.",
      image: projectPictNaturalSMP,
      technologies: ["Java", "PaperMC"],
      link: "https://web.naturalsmp.xyz",
      date: "2023",
      type: "Game Server (Minecraft)",
      status: "In Progress"
    },
    {
      id: 3,
      title: "First Portfolio Website",
      description: "My first portfolio website, designed and built from scratch to showcase my early development skills and projects.",
      image: projectPictPortov1,
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/AnakTentara/Portofolio",
      link: "https://v1.haikaldev.my.id",
      date: "2024",
      type: "Web App",
      status: "Completed"
    },
    {
      id: 4,
      title: "NaniKore Group Website",
      description: "A collaborative group website that features various projects and resources for the community.",
      image: projectPictNaniKore,
      technologies: ["React", "TailwindCSS", "Node.js"],
      github: "https://github.com/AnakTentara/NaniKore-Group",
      link: "https://group.haikaldev.my.id",
      date: "2025",
      type: "Web App",
      status: "Active"
    }
  ];

  // Video editing projects data - Keeping the editing journey
  const videoProjects = [
    {
      id: 11,
      title: "My First Big Project",
      description: "Learned about how to shoot with many actors, balancing complex shots and managing multiple on-screen performances.",
      image: projectPictNaniKore, // Placeholder - should be a thumbnail
      technologies: ["Adobe Premiere Pro", "Multi-Camera Editing", "Directing"],
      youtubeLink: "https://www.youtube.com/watch?v=7ZLEr6J2Spc",
      videoUrl: "https://www.youtube.com/embed/7ZLEr6J2Spc",
      date: "2025",
      isVideoEdit: true,
      status: "Completed"
    },
    {
      id: 12,
      title: "Searching for Backsounds",
      description: "Learned about the magic of backsound selection and how audio choices dramatically impact the emotional tone of visual content.",
      image: projectPictNaturalSMP, // Placeholder - should be a thumbnail
      technologies: ["Audio Editing", "Sound Design", "Music Selection"],
      youtubeLink: "https://www.youtube.com/watch?v=RTUjUz0EX7E",
      videoUrl: "https://www.youtube.com/embed/RTUjUz0EX7E",
      date: "2024",
      isVideoEdit: true,
      status: "Completed"
    },
    {
      id: 13,
      title: "Using Video Editing Techniques",
      description: "Learned advanced editing techniques using Adobe Premiere Pro, including transitions, effects, and dynamic pacing.",
      image: projectPictPortov1, // Placeholder - should be a thumbnail
      technologies: ["Adobe Premiere Pro", "Transitions", "Visual Effects"],
      youtubeLink: "https://www.youtube.com/watch?v=fiwWnCcFbk0",
      videoUrl: "http://youtube.com/embed/fiwWnCcFbk0",
      date: "2024",
      isVideoEdit: true,
      status: "Completed"
    },
    {
      id: 14,
      title: "Color Grading and Correction",
      description: "Learned about color grading and correction techniques using Adobe Premiere Pro to enhance visual storytelling.",
      image: projectPictPortov2, // Placeholder - should be a thumbnail
      technologies: ["Adobe Premiere Pro", "Color Grading", "Color Correction"],
      youtubeLink: "https://www.youtube.com/watch?v=eTjX_RZ-Aao",
      videoUrl: "http://youtube.com/embed/eTjX_RZ-Aao",
      date: "2023",
      isVideoEdit: true,
      status: "Completed"
    },
    {
      id: 15,
      title: "Video Editing Basics",
      description: "Learned the basics of video editing using Adobe Premiere Pro, establishing a foundation in non-linear editing techniques.",
      image: projectPictNaniKore, // Placeholder - should be a thumbnail
      technologies: ["Adobe Premiere Pro", "Basic Editing"],
      youtubeLink: "https://www.youtube.com/watch?v=XWERBANyAY4",
      videoUrl: "https://www.youtube.com/embed/XWERBANyAY4",
      date: "2022",
      isVideoEdit: true,
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-20 pb-16">
      {/* Header */}
      <div ref={headerRef} className="container mx-auto px-4 py-12 text-center">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Project Archive
          </span>
        </motion.h1>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore my complete collection of projects, including development work,
          video editing, and experiments I've created throughout my journey.
        </motion.p>
      </div>

      {/* Development Projects Section */}
      <motion.section
        ref={devSectionRef}
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={isDevSectionInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isDevSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold mb-4 text-white inline-flex items-center">
            <FaCode className="mr-3 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Development Projects
            </span>
          </h2>
          <p className="text-gray-300">
            Software development projects spanning web applications, tools, and platforms.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                priority={index < 2}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Video Editing Projects Section */}
      <motion.section
        ref={videoSectionRef}
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={isVideoSectionInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        id="edit"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVideoSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold mb-4 text-white inline-flex items-center">
            <FaFilm className="mr-3 text-red-400" />
            <span className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
              Video Editing Journey
            </span>
          </h2>
          <p className="text-gray-300">
            Creative video edits showcasing my skills in motion graphics, visual effects, and storytelling.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Back to Home */}
      <div className="container mx-auto px-4 py-12 text-center">
        <Link to="/">
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            style={{ marginRight: "1rem" }}
          >
            <FaArrowLeft className="inline mr-2" />
            Back to Home
          </motion.button>
        </Link>
        <Link to="/downloads">
          <motion.button
            className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="inline mr-2" />
            Downloads
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default MoreProjects;