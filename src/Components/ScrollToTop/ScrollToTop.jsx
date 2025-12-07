import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ScrollToTop.css';

function ScrollToTop({ mood }) {
    const [showScroll, setShowScroll] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            
            setScrollProgress(progress);
            setShowScroll(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {/* Progress bar at the top */}
            <div 
                className="scroll-progress-bar" 
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Scroll to top button */}
            <motion.div 
                className={`scroll-to-top ${mood} ${showScroll ? 'visible' : ''}`}
                onClick={scrollToTop}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={showScroll ? 
                    { opacity: 1, scale: 1, y: 0 } : 
                    { opacity: 0, scale: 0.5, y: 20 }
                }
                transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20 
                }}
                whileHover={{ 
                    scale: 1.1, 
                    rotate: 360,
                    transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
            >
                <i className="uil uil-arrow-up"></i>
                
                {/* Tooltip on hover */}
                <div className="scroll-tooltip">
                    Back to Top
                </div>
            </motion.div>
        </>
    );
}

export default ScrollToTop;