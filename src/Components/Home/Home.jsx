import React from 'react';
import { motion } from 'framer-motion';
import Info from './Info';
import Social from './Social';
import './Home.css';

function Home({ mood }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1.2
      }
    },
    hover: {
      scale: 1.03,
      rotate: [0, 1, -1, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className='section home' id='home'>
      <motion.div 
        className="home-container container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="home-content">
          {/* Social Icons */}
          <motion.div 
            className="home-social-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Social mood={mood} />
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="home-img-container"
            variants={imageVariants}
            whileHover="hover"
            animate={floatAnimation}
          >
            <div className="home-img-wrapper">
              <div className="home-img-glow" />
              <div className={`home-img ${mood}`}>
                <div className="home-img-overlay">
                  <motion.div 
                    className="home-img-sparkle"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <div className="home-info-section">
            {/* تمرير النص المتحرك لمكون Info */}
            <Info mood={mood} />
            
            {/* Action Buttons */}
            <motion.div 
              className="home-info-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {/* Say Hello Button */}
              <motion.a 
                href="#contact" 
                className={`say-hello-btn main-btn ${mood}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="btn-text">Say Hello</span>
                <motion.svg
                  className="btn-arrow"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.a>

              {/* Scroll Button */}
              <motion.a 
                href="#about" 
                className={`home-info-scroll ${mood}`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  width="28px"
                  height="28px"
                  className="home-scroll-mouse"
                  viewBox="0 0 247 390"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="1.5"
                >
                  <path
                    className="wheel"
                    d="M123.359,79.775l0,72.843"
                    fill="none"
                    stroke={mood === "dark" ? "#fff" : "#1f1e1e"}
                    strokeWidth="20px"
                  ></path>
                  <path
                    id="mouse"
                    d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
                    fill="none"
                    stroke={mood === "dark" ? "#fff" : "#1f1e1e"}
                    strokeWidth="20px"
                  ></path>
                </svg>
                <span className='scroll-text'>Scroll Down</span>
                <i className="uil uil-arrow-down"></i>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div 
          className="home-decoration home-decoration-1"
          animate={{
            y: [0, -12, 0],
            x: [0, 6, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="home-decoration home-decoration-2"
          animate={{
            y: [0, 10, 0],
            x: [0, -8, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="home-decoration home-decoration-3"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 45, 90]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
}

export default Home;