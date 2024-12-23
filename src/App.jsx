import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import icon from '../images/icon.png';
import naturalsmpPNG from '../images/naturalsmp.png';
import iconGradient from '../images/icon-bggradient.png'
import projectPictPortov1 from '../images/1stportofolio.png';
import projectPictPortov2 from '../images/screenshot-portofolio.png';
import projectPictNaturalSMP from '../images/naturalsmp-screenshot.png';


function App() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;