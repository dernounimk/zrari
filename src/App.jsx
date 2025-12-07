import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './App.css';

// Lazy load components
const Header = lazy(() => import('./Components/Header/Header'));
const Home = lazy(() => import('./Components/Home/Home'));
const AboutQualification = lazy(() => import('./Components/AboutMe/AboutMe'));
const Skills = lazy(() => import('./Components/Skills/Skills'));
const Services = lazy(() => import('./Components/Services/Services'));
const Portfolio = lazy(() => import('./Components/Portfolio/Portfolio'));
const Contact = lazy(() => import('./Components/Contact/Contact'));
const Footer = lazy(() => import('./Components/Footer/Footer'));
const ScrollToTop = lazy(() => import('./Components/ScrollToTop/ScrollToTop'));
const AnimatedBackground = lazy(() => import('./Components/AnimatedBackground/AnimatedBackground')); // المكون الجديد

// Loading component
const LoadingScreen = () => (
  <motion.div 
    className="page-transition"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="loader"></div>
  </motion.div>
);

// Old floating background (optional - يمكن إزالته أو الاحتفاظ به)
const FloatingBackground = () => (
  <div className="floating-background">
    {[...Array(15)].map((_, i) => (
      <div 
        key={i}
        className="floating-element"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 20 + 5}px`,
          height: `${Math.random() * 20 + 5}px`,
          animationDelay: `${Math.random() * 20}s`,
          animationDuration: `${Math.random() * 30 + 20}s`,
          opacity: `${Math.random() * 0.3 + 0.1}`
        }}
      />
    ))}
  </div>
);

function App() {
  const [mood, setMood] = useState(() => {
    const savedMood = localStorage.getItem('portfolio-mood');
    return savedMood || 'light';
  });
  const [icon, setIcon] = useState(mood === 'light' ? 'moon' : 'sun');
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Section inView observers
  const [homeRef, homeInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [portfolioRef, portfolioInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Handle scroll for header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle overflow when menu is open
  useEffect(() => {
    if (showMenu) {
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
      document.body.style.overflow = 'auto';
    };
  }, [showMenu]);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Save mood preference
  useEffect(() => {
    localStorage.setItem('portfolio-mood', mood);
    if (mood === 'light') {
      document.body.classList.remove('dark-mood');
      setIcon('moon');
    } else {
      document.body.classList.add('dark-mood');
      setIcon('sun');
    }
  }, [mood]);

  // Menu handlers
  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const handleMood = () => {
    setMood(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="app"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="app-container"
        >
          {/* الخلفية المتحركة الجديدة */}
          <Suspense fallback={null}>
            <AnimatedBackground mood={mood} />
          </Suspense>

          {/* الخلفية العائمة القديمة (اختياري) */}
          <FloatingBackground />
          
          {/* Header Component */}
          <Suspense fallback={<div className="header-loading"></div>}>
            <Header
              mood={mood}
              icon={icon}
              showMenu={showMenu}
              scrolled={scrolled}
              onShowMenu={handleShowMenu}
              onHideMenu={handleHideMenu}
              onToggleMood={handleMood}
            />
          </Suspense>

          {/* Main Content */}
          <main className="main">
            <Suspense fallback={<div className="section-loading"></div>}>
              {/* Home Section */}
              <section id="home" ref={homeRef} className="page-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={homeInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Home mood={mood} />
                </motion.div>
              </section>

              {/* About & Qualification Section */}
              <section id="about" ref={aboutRef} className="page-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <AboutQualification mood={mood} />
                </motion.div>
              </section>

              {/* Skills Section */}
              <section id="skills" ref={skillsRef} className="page-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Skills mood={mood} />
                </motion.div>
              </section>

              {/* Services Section */}
              <section id="services" ref={servicesRef} className="page-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Services mood={mood} />
                </motion.div>
              </section>

              {/* Portfolio Section */}
              <section id="portfolio" ref={portfolioRef} className="page-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Portfolio mood={mood} />
                </motion.div>
              </section>

              {/* Contact Section */}
              <section id="contact" ref={contactRef} className="page-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Contact mood={mood} />
                </motion.div>
              </section>
            </Suspense>
          </main>

          {/* Footer and ScrollToTop Components */}
          <Suspense fallback={null}>
            <Footer mood={mood} />
            <ScrollToTop mood={mood} />
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;