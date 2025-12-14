import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './Home.css';

function Info({ mood }) {
  const [animatedText, setAnimatedText] = useState('');
  const fullText = "Zerari Mohamed";
  const timerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isTypingRef = useRef(true);

  useEffect(() => {
    const startTyping = () => {
      if (isTypingRef.current) {
        // الكتابة
        if (currentIndexRef.current < fullText.length) {
          setAnimatedText(fullText.substring(0, currentIndexRef.current + 1));
          currentIndexRef.current++;
          timerRef.current = setTimeout(startTyping, 100);
        } else {
          // الانتظار بعد اكتمال الكتابة
          timerRef.current = setTimeout(() => {
            isTypingRef.current = false;
            startDeleting();
          }, 2000);
        }
      }
    };

    const startDeleting = () => {
      if (!isTypingRef.current) {
        // الحذف
        if (currentIndexRef.current > 0) {
          currentIndexRef.current--;
          setAnimatedText(fullText.substring(0, currentIndexRef.current));
          timerRef.current = setTimeout(startDeleting, 50);
        } else {
          // الانتظار بعد اكتمال الحذف
          timerRef.current = setTimeout(() => {
            isTypingRef.current = true;
            startTyping();
          }, 1000);
        }
      }
    };

    // بدء العملية
    timerRef.current = setTimeout(() => {
      startTyping();
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div 
      className='home-info'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Name with Typing Effect */}
      <motion.div 
        className="home-title-wrapper"
        variants={itemVariants}
      >
        <h1 className={`home-title ${mood}`}>
          {animatedText}
          <motion.span 
            className="typing-cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            |
          </motion.span>
        </h1>
      </motion.div>
      
      <motion.h3 
        className={`home-subtitle ${mood}`}
        variants={itemVariants}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Web Developer
      </motion.h3>
      
      <motion.p 
        className={`home-desc ${mood}`}
        variants={itemVariants}
      >
        Welcome, I am a skilled full stack web developer with a passion for building dynamic and responsive web applications. My expertise spans across both front-end and back-end development, allowing me to deliver complete and seamless user experiences.
      </motion.p>
    </motion.div>
  );
}

export default Info;