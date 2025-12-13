import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = ({ 
  mood, 
  icon, 
  showMenu, 
  scrolled, 
  onShowMenu, 
  onHideMenu, 
  onToggleMood 
}) => {
  const [activeLink, setActiveLink] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);

  const menuItems = [
    { id: 1, icon: 'uil-estate', text: 'Home', href: '#home' },
    { id: 2, icon: 'uil-user', text: 'About', href: '#about' },
    { id: 3, icon: 'uil-lightbulb-alt', text: 'Skills', href: '#skills' },
    { id: 4, icon: 'uil-processor', text: 'Services', href: '#services' },
    { id: 5, icon: 'uil-scenery', text: 'Portfolio', href: '#portfolio' },
    { id: 6, icon: 'uil-message', text: 'Contact', href: '#contact' },
  ];

  // اكتشاف حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // إصلاح التمرير النشط
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => ({
        id: item.href.substring(1),
        element: document.getElementById(item.href.substring(1))
      }));

      const currentSection = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveLink(currentSection.id);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href.substring(1));
    onHideMenu();
    
    // Scroll إلى القسم مع offset للهيدر
    const element = document.getElementById(href.substring(1));
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  // إغلاق القائمة عند تغيير حجم النافذة
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && showMenu) {
        onHideMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showMenu, onHideMenu]);

  // إغلاق القائمة عند الضغط على ESC
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && showMenu) {
        onHideMenu();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [showMenu, onHideMenu]);

  // إصلاح: دالة واحدة للتبديل
  const handleToggleMenu = () => {
    if (showMenu) {
      onHideMenu();
    } else {
      onShowMenu();
    }
  };

  // إغلاق القائمة عند النقر على Overlay
  const handleOverlayClick = () => {
    onHideMenu();
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} ref={headerRef}>
      <motion.nav 
        className="nav-container"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 100, 
          damping: 20,
          mass: 0.5
        }}
      >
        <div className="nav-content">
          <motion.a 
            href="#home" 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
          >
            Zrari
          </motion.a>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            <ul className="desktop-list">
              {menuItems.map((item) => (
                <li className="desktop-item" key={item.id}>
                  <motion.a 
                    href={item.href} 
                    className={`desktop-link ${activeLink === item.href.substring(1) ? 'active-link' : ''}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                  >
                    <i className={`uil ${item.icon} desktop-icon`}></i> 
                    <span>{item.text}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.button 
              className="mood-toggle"
              onClick={onToggleMood}
              title={mood === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <i className={`uil uil-${icon}`}></i>
            </motion.button>
          </div>

          {/* Mobile Menu Toggle - نفس الزر للفتح والإغلاق */}
          <motion.button 
            className="mobile-toggle"
            onClick={handleToggleMenu}  // استخدم دالة التبديل
            aria-label={showMenu ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-expanded={showMenu}
          >
            <i className={`uil ${showMenu ? 'uil-times' : 'uil-bars'}`}></i>
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {showMenu && (
            <motion.div 
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleOverlayClick}  // إغلاق بالنقر على Overlay
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.aside 
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'tween',
                duration: 0.3,
                ease: 'easeInOut'
              }}
              aria-label="Mobile menu"
              aria-modal="true"
              role="dialog"
            >
              {/* تم إزالة رأس القائمة بالكامل */}
              
              <nav className="mobile-nav">
                <ul className='mobile-list'>
                  {menuItems.map((item, i) => (
                    <motion.li 
                      className='mobile-item' 
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: i * 0.05,
                        duration: 0.3,
                        ease: 'easeOut'
                      }}
                    >
                      <a 
                        href={item.href} 
                        className={`mobile-link ${activeLink === item.href.substring(1) ? 'active-link' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(item.href);
                        }}
                        aria-current={activeLink === item.href.substring(1) ? "page" : undefined}
                      >
                        <i className={`uil ${item.icon} mobile-icon`}></i> 
                        <span>{item.text}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <div className="mobile-footer">
                <motion.button 
                  className="mobile-mood-toggle"
                  onClick={onToggleMood}
                  title={mood === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Toggle theme"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <i className={`uil uil-${icon}`}></i>
                  <span>Switch to {mood === 'light' ? 'Dark' : 'Light'} Mode</span>
                </motion.button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Header;