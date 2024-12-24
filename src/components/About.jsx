import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [titleHover, setTitleHover] = useState(false);
  // Hover animation variant
  const cardVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: {
      scale: 1.05,
      rotate: 1,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    tap: {
      scale: 0.95,
      rotate: -5,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
  };

  // Title hover animation
  const titleVariants = {
    initial: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    hover: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
  };

  // Emoji animation
  const emojiVariants = {
    initial: {
      opacity: 0,
      x: 10,
      scale: 0.5
    },
    hover: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4" data-aos="slide-right">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Animated Title */}
          <motion.h2 
            initial={{ x: 0 }}
            animate={{ 
              x: titleHover ? [-10, 10, -10, 10, 0] : 0,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
            onMouseEnter={() => setTitleHover(true)}
            onMouseLeave={() => setTitleHover(false)}
            className="text-4xl font-bold text-center text-white mb-12 inline-block relative"
          >
            <strong className='mb:16 font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider'>About Me</strong>
            <AnimatePresence>
              {titleHover && (
                <motion.span 
                  key="emoji"
                  initial={{ opacity: 0, x: 10, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute inline-block ml-2 text-primary-600 dark:text-primary-400"
                >
                  👋🏻
                </motion.span>
              )}
            </AnimatePresence>
          </motion.h2>

          <motion.p whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            I am a passionate teenager with a keen interest in technology and software development. I have experience in creating and managing Minecraft servers, as well as developing SA:MP servers. Additionally, I have built Discord and WhatsApp bots, and I am proficient in deploying applications on platforms such as Azure. As an avid gamer, I continuously seek to enhance my skills and knowledge in the tech field.
          </motion.p>

          {/* Personal Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { title: "Haikal", subtitle: "First Name" },
              { title: "Mabrur", subtitle: "Last Name" },
              { title: "2008", subtitle: "Age" },
              { title: "Indonesia", subtitle: "Nationality" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer"
              >
                <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Email Card with Hover */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="mt-12 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer"
          >
            <h3 className="font-bold text-xl text-gray-800 dark:text-white">
              hakalmabrur125@gmail.com
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Email</p>
          </motion.div>

          {/* Languages and Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { title: "Indonesia", subtitle: "Language" },
              { title: "English", subtitle: "Language" },
              { title: "JavaScript", subtitle: "Language" },
              { title: "C++/C#", subtitle: "Language" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileTap="tap"
                initial="initial"
                whileHover="hover"
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer"
              >
                <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tags Card with Hover */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="mt-12 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer"
          >
            <h3 className="font-bold text-xl text-gray-800 dark:text-white">
              Gamer, Developer
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Tag For Me!</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;