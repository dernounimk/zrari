import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AboutMe.css';
import AboutData from './AboutData.jsx';
import CV from '../../assets/Zrari.pdf';

function AboutMe({ mood }) {
    const [activeTimelineTab, setActiveTimelineTab] = useState('education');
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const timelineData = {
        education: [
            {
                id: 1,
                title: "University of Mohamed Khider Biskra",
                subtitle: "Bachelor in Computer Science",
                period: "2022 - Present",
                description: "Studying advanced algorithms, data structures, and software engineering principles.",
                icon: "uil-graduation-cap",
                isCurrent: true,
                tags: ["Computer Science", "Algorithms", "Software Engineering"],
                color: "#4f46e5"
            },
            {
                id: 2,
                title: "Self-Learning Journey",
                subtitle: "Full Stack Web Development",
                period: "2021 - Present",
                description: "Mastering MERN stack through online courses and hands-on projects.",
                icon: "uil-book-open",
                isCurrent: false,
                tags: ["MERN Stack", "Online Learning", "Projects"],
                color: "#10b981"
            }
        ],
        experience: [
            {
                id: 1,
                title: "Fiverr Freelancer",
                subtitle: "Full Stack Web Developer",
                period: "2023 - Present",
                description: "Building responsive websites and web applications for international clients.",
                icon: "uil-briefcase-alt",
                isCurrent: true,
                tags: ["Freelance", "Web Development", "MERN Stack"],
                color: "#f59e0b"
            },
            {
                id: 2,
                title: "Khamasat Platform",
                subtitle: "Freelance Developer",
                period: "2023 - Present",
                description: "Creating custom solutions for various business needs.",
                icon: "uil-window",
                isCurrent: false,
                tags: ["CMS", "E-commerce", "Business Solutions"],
                color: "#8b5cf6"
            }
        ]
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
                duration: 0.8
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            rotateX: -10
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.5
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.9,
            rotateY: -5
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                mass: 0.8
            }
        },
        hover: {
            y: -8,
            scale: 1.02,
            rotateY: 2,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15
            }
        },
        tap: {
            scale: 0.98,
            rotateY: -1
        }
    };

    const floatAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const glowAnimation = {
        boxShadow: [
            "0 0 20px rgba(var(--primary-color-rgb), 0)",
            "0 0 30px rgba(var(--primary-color-rgb), 0.3)",
            "0 0 20px rgba(var(--primary-color-rgb), 0)"
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const currentTimelineData = timelineData[activeTimelineTab];

    return (
        <section className="section about-me" id='about'>
            {/* Animated Background Elements */}
            {isVisible && (
                <>
                    <motion.div 
                        className="floating-shape shape-1"
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div 
                        className="floating-shape shape-2"
                        animate={{
                            y: [0, -30, 0],
                            x: [0, -15, 0],
                            rotate: [0, -8, 0]
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    />
                </>
            )}

            {/* Section Header with Enhanced Animation */}
            <div className="section-header about-header">
                <motion.div
                    className="title-wrapper"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    <motion.h2 
                        className='section-title'
                        initial={{ opacity: 0, y: -30, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                        }}
                        viewport={{ once: true }}
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            About
                        </motion.span>
                        <motion.span
                            className="highlight-word"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Me
                        </motion.span>
                    </motion.h2>
                </motion.div>
                
                <motion.span 
                    className='section-subtitle'
                    initial={{ opacity: 0, y: -15, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                        duration: 0.6, 
                        delay: 0.4,
                        type: "spring",
                        stiffness: 150
                    }}
                    viewport={{ once: true }}
                >
                    Developer & Creative Problem Solver
                </motion.span>

                {/* Animated Underline */}
                <motion.div 
                    className="animated-underline"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                />
            </div>

            {/* Main Content Container */}
            <motion.div 
                className="about-container container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* Introduction Card */}
                <motion.div 
                    className="intro-card"
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <div className="intro-header">
                        <motion.div 
                            className="avatar-container"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: 0.2
                            }}
                            whileHover={{ rotate: 360 }}
                        >
                            <motion.div 
                                className="avatar"
                                animate={floatAnimation}
                                whileHover={{ scale: 1.1 }}
                            >
                                <i className="uil uil-user-circle"></i>
                            </motion.div>
                            <motion.div 
                                className="avatar-ring"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                        
                        <div className="intro-text">
                            <motion.h3 
                                className="intro-title"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Hi, I'm <motion.span 
                                    className="highlight-name"
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >Zrari Mohamed</motion.span>
                            </motion.h3>
                            
                            <motion.p 
                                className="intro-subtitle"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.span
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    MERN Stack Developer & Web Solutions Architect
                                </motion.span>
                            </motion.p>
                        </div>
                    </div>

                    <motion.p 
                        className="intro-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Passionate full-stack developer with 3+ years of experience creating 
                        innovative web solutions. Specializing in building dynamic, responsive applications 
                        with focus on performance, scalability, and exceptional user experiences.
                    </motion.p>

                    {/* Animated Divider */}
                    <motion.div 
                        className="animated-divider"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    />

                    {/* Stats Grid */}
                    <motion.div 
                        className="stats-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <AboutData mood={mood} />
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                        className="action-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.a 
                            download="" 
                            href={CV} 
                            className={`btn btn-primary btn-${mood}`}
                            whileHover={{ 
                                scale: 1.08, 
                                y: -5,
                                boxShadow: "0 10px 30px rgba(var(--primary-color-rgb), 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            animate={glowAnimation}
                        >
                            <motion.i 
                                className="uil uil-import"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            />
                            Download CV
                        </motion.a>
                        
                        <motion.a 
                            href='mailto:dernounimk@gmail.com' 
                            target='_blank' 
                            rel='noopener noreferrer'
                            className={`btn btn-outline-${mood}`}
                            whileHover={{ 
                                scale: 1.08, 
                                y: -5,
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.i 
                                className="uil uil-envelope"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            Contact Me
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Timeline Section */}
                <motion.div 
                    className="timeline-card"
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <div className="timeline-header">
                        <div className="timeline-title-container">
                            <motion.h3 
                                className="timeline-title"
                                animate={{ 
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                My Journey Timeline
                            </motion.h3>
                            <p className="timeline-subtitle">Education & Experience</p>
                        </div>
                        
                        <motion.div 
                            className="timeline-tabs"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.button
                                className={`timeline-tab ${activeTimelineTab === 'education' ? 'active' : ''}`}
                                onClick={() => setActiveTimelineTab('education')}
                                whileHover={{ 
                                    scale: 1.1,
                                    y: -3
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <motion.i 
                                    className="uil uil-graduation-cap"
                                    animate={activeTimelineTab === 'education' ? {
                                        rotate: [0, 10, -10, 0]
                                    } : {}}
                                    transition={{ duration: 0.5 }}
                                />
                                Education
                            </motion.button>
                            
                            <motion.button
                                className={`timeline-tab ${activeTimelineTab === 'experience' ? 'active' : ''}`}
                                onClick={() => setActiveTimelineTab('experience')}
                                whileHover={{ 
                                    scale: 1.1,
                                    y: -3
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <motion.i 
                                    className="uil uil-briefcase-alt"
                                    animate={activeTimelineTab === 'experience' ? {
                                        rotate: [0, 10, -10, 0]
                                    } : {}}
                                    transition={{ duration: 0.5 }}
                                />
                                Experience
                            </motion.button>
                        </motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div 
                            className="timeline-content"
                            key={activeTimelineTab}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentTimelineData.map((item, index) => (
                                <motion.div 
                                    className="timeline-item"
                                    key={item.id}
                                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ 
                                        delay: index * 0.15,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 12
                                    }}
                                    whileHover={{ 
                                        x: 10,
                                        scale: 1.02,
                                        borderLeftColor: item.color
                                    }}
                                    custom={index}
                                >
                                    <div className="timeline-item-header">
                                        <motion.div 
                                            className="timeline-icon"
                                            style={{ background: item.color }}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <i className={item.icon}></i>
                                        </motion.div>
                                        <div className="timeline-item-info">
                                            <h4 className="timeline-item-title">{item.title}</h4>
                                            <span className="timeline-item-subtitle">{item.subtitle}</span>
                                        </div>
                                        {item.isCurrent && (
                                            <motion.span 
                                                className="current-badge"
                                                animate={{
                                                    scale: [1, 1.1, 1],
                                                    boxShadow: [
                                                        "0 0 10px rgba(var(--primary-color-rgb), 0.5)",
                                                        "0 0 20px rgba(var(--primary-color-rgb), 0.8)",
                                                        "0 0 10px rgba(var(--primary-color-rgb), 0.5)"
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                Current
                                            </motion.span>
                                        )}
                                    </div>
                                    
                                    <p className="timeline-item-description">{item.description}</p>
                                    
                                    <div className="timeline-footer">
                                        <div className="timeline-period">
                                            <motion.i 
                                                className="uil uil-calendar-alt"
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            />
                                            <span>{item.period}</span>
                                        </div>
                                        <div className="timeline-tags">
                                            {item.tags.map((tag, tagIndex) => (
                                                <motion.span 
                                                    key={tag} 
                                                    className="timeline-tag"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.15 + tagIndex * 0.1 }}
                                                    whileHover={{ 
                                                        scale: 1.1,
                                                        y: -2,
                                                        backgroundColor: item.color
                                                    }}
                                                >
                                                    {tag}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Call to Action with Enhanced Animation */}
                <motion.div 
                    className="cta-card"
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.02,
                        y: -5
                    }}
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <div className="cta-content">
                        <motion.h3 
                            className="cta-title"
                            animate={{ 
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            Ready to Bring Your Vision to Life?
                        </motion.h3>
                        <motion.p 
                            className="cta-description"
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Let's collaborate on your next project. Available for freelance work 
                            and passionate about creating exceptional digital experiences.
                        </motion.p>
                        
                        <div className="cta-buttons">
                            <motion.a 
                                href='#contact' 
                                className={`btn btn-primary btn-${mood}`}
                                whileHover={{ 
                                    scale: 1.08, 
                                    y: -3,
                                    boxShadow: "0 15px 35px rgba(var(--primary-color-rgb), 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: [
                                        "0 5px 15px rgba(var(--primary-color-rgb), 0.2)",
                                        "0 10px 30px rgba(var(--primary-color-rgb), 0.4)",
                                        "0 5px 15px rgba(var(--primary-color-rgb), 0.2)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <motion.i 
                                    className="uil uil-message"
                                    animate={{ 
                                        rotate: [0, 20, -20, 0],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }}
                                />
                                Start a Project
                            </motion.a>
                            
                            <motion.a 
                                href='#portfolio' 
                                className={`btn btn-outline-${mood}`}
                                whileHover={{ 
                                    scale: 1.08, 
                                    y: -3,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.i 
                                    className="uil uil-eye"
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                        rotateY: [0, 180, 360]
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity
                                    }}
                                />
                                View Portfolio
                            </motion.a>
                        </div>
                    </div>
                    
                    {/* Floating Particles in CTA */}
                    {[1, 2, 3, 4].map(i => (
                        <motion.div 
                            key={i}
                            className="floating-particle"
                            initial={{ 
                                opacity: 0,
                                scale: 0,
                                x: Math.random() * 100 - 50,
                                y: Math.random() * 100 - 50
                            }}
                            animate={{ 
                                opacity: [0, 0.6, 0],
                                scale: [0, 1, 0],
                                x: [0, Math.random() * 200 - 100],
                                y: [0, Math.random() * 200 - 100]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Animated Scroll Indicator */}
            <motion.div 
                className="scroll-indicator"
                animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <i className="uil uil-angle-down"></i>
            </motion.div>
        </section>
    );
}

export default AboutMe;