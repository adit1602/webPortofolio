import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import NavbarOther from './components/NavbarOther';
import Navbar from './components/Navbar';

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MoreAbout from './components/pages/MoreAbout';
import Downloads from './components/pages/Downloads';
import Download from './components/pages/direct-page/Download';
import Unduh from './components/pages/direct-page/Unduh';
import More from './components/pages/direct-page/More';
import NotFound from './components/pages/direct-page/404';

import { PreventInteractions } from './utils/preventInteractions';

function App() {
  const location = useLocation();

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-gray-100">
      <PreventInteractions />

      {location.pathname === '/' ? <Navbar /> : <NavbarOther />}

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </>
        } />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/unduh" element={<Unduh />} />
        <Route path="/download" element={<Download />} />
        <Route path="/more-about" element={<MoreAbout />} />
        <Route path="/more" element={<More />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;