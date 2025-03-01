import React, { useEffect, useRef, useState, useMemo } from 'react';

const InteractiveDivider = () => {
  const sectionRef = useRef(null);
  const lettersRef = useRef([]);
  const debugRef = useRef(null);
  const topSeparatorRef = useRef(null);
  const bottomSeparatorRef = useRef(null);
  const [debug, setDebug] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchActive, setTouchActive] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const [devicePerformance, setDevicePerformance] = useState('high'); // 'low', 'medium', 'high'
  const lastFrameTimeRef = useRef(0);
  const targetFpsRef = useRef(60);
  const frameInterval = useRef(1000 / 60);
  const throttleRef = useRef(false);
  
  // Main text
  const text = "HAIKAL";
  
  // Performance settings based on device capability
  const performanceSettings = useMemo(() => ({
    low: {
      waveSegments: 15,
      waveCount: 1,
      frameSkip: 3,
      effectQuality: 0.5,
      targetFps: 30
    },
    medium: {
      waveSegments: 10,
      waveCount: 2,
      frameSkip: 2,
      effectQuality: 0.8,
      targetFps: 45
    },
    high: {
      waveSegments: 5,
      waveCount: 3,
      frameSkip: 1,
      effectQuality: 1,
      targetFps: 60
    }
  }), []);
  
  // Detect device performance level on mount
  useEffect(() => {
    const detectPerformance = () => {
      // Check if it's mobile
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      
      // Check if navigator.deviceMemory is available (Chrome/Edge)
      const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
      const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores if not available
      
      if (isMobileDevice) {
        return memory >= 4 && cores >= 4 ? 'medium' : 'low';
      }
      
      if (memory >= 4 && cores >= 4) {
        return 'high';
      } else if (memory >= 2 && cores >= 2) {
        return 'medium';
      } else {
        return 'low';
      }
    };
    
    const perfLevel = detectPerformance();
    setDevicePerformance(perfLevel);
    targetFpsRef.current = performanceSettings[perfLevel].targetFps;
    frameInterval.current = 1000 / targetFpsRef.current;
  }, [performanceSettings]);
  
  // Initialize dimensions
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const updateDimensions = () => {
      if (sectionRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setDimensions({ width, height });
        
        // Update mobile status on resize
        setIsMobile(width < 768);
      }
    };
    
    // Throttle resize events
    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        updateDimensions();
      }, 100);
    };
    
    updateDimensions();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);
  
  // Debug mode toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setDebug(prev => !prev);
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Mouse tracking effect (throttled)
  useEffect(() => {
    let throttleTimeout = null;
    
    const handleMouseMove = (e) => {
      if (!throttleRef.current) {
        throttleRef.current = true;
        
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        });
        
        setTimeout(() => {
          throttleRef.current = false;
        }, 16); // ~60fps throttle
      }
    };
    
    // Touch support for mobile
    const handleTouchStart = () => {
      setTouchActive(true);
    };
    
    const handleTouchMove = (e) => {
      if (!throttleRef.current && e.touches[0]) {
        throttleRef.current = true;
        
        setMousePosition({
          x: e.touches[0].clientX / window.innerWidth,
          y: e.touches[0].clientY / window.innerHeight
        });
        
        setTimeout(() => {
          throttleRef.current = false;
        }, 32); // Lower frequency for touch events (30fps)
      }
    };
    
    const handleTouchEnd = () => {
      setTouchActive(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);
  
  // Separator animation effect
  useEffect(() => {
    if (!topSeparatorRef.current || !bottomSeparatorRef.current) return;
    
    const topSeparator = topSeparatorRef.current;
    const bottomSeparator = bottomSeparatorRef.current;
    let animationFrame;
    let phase = 0;
    
    const animateSeparators = () => {
      phase += 0.01;
      if (phase > Math.PI * 2) phase = 0;
      
      // Create pulsing effect with slight offset between top and bottom
      const intensity1 = (Math.sin(phase) * 0.3) + 0.7;
      const intensity2 = (Math.sin(phase + Math.PI / 4) * 0.3) + 0.7; // Phase offset
      const width1 = Math.sin(phase * 0.5) * 10 + 90;
      const width2 = Math.sin((phase + Math.PI / 3) * 0.5) * 10 + 90; // Different phase offset
      
      topSeparator.style.opacity = intensity1.toString();
      topSeparator.style.width = `${width1}%`;
      
      bottomSeparator.style.opacity = intensity2.toString();
      bottomSeparator.style.width = `${width2}%`;
      
      animationFrame = requestAnimationFrame(animateSeparators);
    };
    
    animationFrame = requestAnimationFrame(animateSeparators);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  // Text animation based on scroll
  useEffect(() => {
    if (!sectionRef.current) return;
    
    let animationFrameId;
    let frameCount = 0;
    const settings = performanceSettings[devicePerformance];
    
    // Scroll handler with throttling
    let scrollTimeout;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          setCurrentScrollY(lastScrollY);
          scrollTimeout = null;
        }, 16); // ~60fps throttle
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Animation function for text only
    const animate = (timestamp) => {
      // Frame rate control
      if (timestamp - lastFrameTimeRef.current < frameInterval.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      // Update frame timing
      const elapsed = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;
      frameCount++;
      
      // Skip frames based on performance setting
      if (frameCount % settings.frameSkip !== 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      // Only update if in view
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight + 100 && rect.bottom > -100;
      
      if (!isInView) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      // Get section position relative to viewport
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - viewportCenter);
      const maxDistance = window.innerHeight / 2 + rect.height / 2;
      const visibilityFactor = isInView ? 1 - distanceFromCenter / maxDistance : 0;
      
      // Update letter styles
      updateLetterStyles(visibilityFactor, settings.effectQuality);
      
      // Update debug info
      if (debug && debugRef.current && frameCount % 10 === 0) {
        const fps = Math.round(1000 / (elapsed || 16));
        debugRef.current.innerHTML = `
          <div>FPS: ${fps}</div>
          <div>Performance: ${devicePerformance}</div>
          <div>Mobile: ${isMobile ? 'Yes' : 'No'}</div>
          <div>Visibility: ${(visibilityFactor * 100).toFixed(0)}%</div>
        `;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Update letter styles efficiently
    const updateLetterStyles = (visibilityFactor, quality) => {
      if (lettersRef.current.length) {
        const letterProgress = Math.max(0, Math.min(1, visibilityFactor * 1.5));
        
        // Batch DOM operations by preparing all styles first
        lettersRef.current.forEach((letter, index) => {
          if (!letter) return;
          
          // Calculate mouse/touch influence
          const interactionStrength = touchActive ? 1.5 : 1.0; // Stronger effect on touch
          const mouseInfluence = {
            x: (mousePosition.x - 0.5) * 15 * letterProgress * interactionStrength,
            y: (mousePosition.y - 0.5) * 7 * letterProgress * quality * interactionStrength
          };
          
          // Create 3D perspective effect - reduced for mobile
          const perspective = isMobile ? 500 : 800;
          // Less extreme effects on mobile
          const mobileReducer = isMobile ? 0.7 : 1;
          const positionZ = -50 + (letterProgress * 100 * mobileReducer); // Reduced range
          
          // Calculate letter position with 3D transformation
          const rotateY = (index - text.length / 2) * 0.08 + mouseInfluence.x * 0.01;
          const rotateX = mouseInfluence.y * 0.01;
          
          // Apply efficient transforms - reduced for mobile
          letter.style.transform = `
            perspective(${perspective}px)
            rotateY(${rotateY * mobileReducer}rad)
            rotateX(${rotateX * mobileReducer}rad)
            translateZ(${positionZ}px)
            scale(${0.8 + letterProgress * 0.4 * mobileReducer})
          `;
          
          letter.style.opacity = letterProgress;
          
          // Use blur only on high performance devices and non-mobile
          if (quality > 0.7 && !isMobile) {
            letter.style.filter = `blur(${Math.max(0, 2 - letterProgress * 2)}px)`;
          } else {
            letter.style.filter = 'none';
          }
          
          // Less expensive color calculations
          const hue = (210 + index * 10) % 360;
          const saturation = 70 + letterProgress * 30 * quality;
          const lightness = 50 + letterProgress * 20 * quality;
          letter.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          
          // Simplified glow effect - reduced for mobile
          const glowSize = letterProgress * 10 * quality * mobileReducer;
          const glowColor = `hsla(${hue}, 100%, 70%, ${letterProgress * 0.6 * quality})`;
          letter.style.textShadow = `0 0 ${glowSize}px ${glowColor}`;
        });
      }
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [mousePosition, currentScrollY, debug, text.length, devicePerformance, performanceSettings, isMobile, touchActive]);
  
  return (
    <div 
      ref={sectionRef}
      className="relative w-full overflow-visible flex justify-center items-center"
      style={{ 
        height: '120px',
        background: 'linear-gradient(to bottom, rgba(15, 7, 30, 0.9), rgba(25, 15, 40, 0.85))',
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
    >
      {/* Top border separator effect */}
      <div
        ref={topSeparatorRef}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[1px] rounded-full"
        style={{
          width: '90%',
          background: 'linear-gradient(90deg, transparent, rgba(120, 170, 255, 0.3), rgba(120, 170, 255, 0.7), rgba(120, 170, 255, 0.3), transparent)',
          boxShadow: '0 0 8px rgba(120, 170, 255, 0.6), 0 0 12px rgba(120, 170, 255, 0.4)',
          zIndex: 4,
          opacity: 0.7
        }}
      />
      
      {/* 3D rotating text container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          zIndex: 2,
          transform: 'translateZ(0px)',
          transformStyle: 'preserve-3d',
          width: '100%',
          left: 0,
          right: 0,
          margin: '0 auto',
          willChange: 'transform'
        }}
      >
        {/* Text elements */}
        <div className="relative flex justify-center w-full">
          {text.split('').map((char, index) => (
            <span
              key={index}
              ref={el => (lettersRef.current[index] = el)}
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold inline-block mx-1"
              style={{
                padding: '0 0.1em',
                opacity: 0,
                willChange: 'transform, opacity',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                transition: 'transform 0.08s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
                transformOrigin: 'center center',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom border separator effect */}
      <div
        ref={bottomSeparatorRef}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[1px] rounded-full"
        style={{
          width: '90%',
          background: 'linear-gradient(90deg, transparent, rgba(120, 170, 255, 0.3), rgba(120, 170, 255, 0.7), rgba(120, 170, 255, 0.3), transparent)',
          boxShadow: '0 0 8px rgba(120, 170, 255, 0.6), 0 0 12px rgba(120, 170, 255, 0.4)',
          zIndex: 4,
          opacity: 0.7
        }}
      />
      
      {/* Interactive hint - shows different message on mobile */}
      <div 
        className="absolute bottom-3 left-0 right-0 mx-auto text-center text-xs text-white/50 tracking-widest pointer-events-none select-none"
        style={{ zIndex: 3, opacity: 0.6 }}
      >
        {isMobile ? 'TAP & DRAG TO INTERACT' : 'MOVE MOUSE TO INTERACT'}
      </div>
      
      {/* Debug panel */}
      {debug && (
        <div 
          ref={debugRef}
          className="fixed top-2 right-2 bg-black/80 text-white text-xs px-3 py-2 rounded z-50 font-mono"
        ></div>
      )}
    </div>
  );
};

export default InteractiveDivider; 