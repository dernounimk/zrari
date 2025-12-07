import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './AnimatedBackground.css';

function AnimatedBackground({ mood }) {
    const [time, setTime] = useState(0);
    
    // Array of tech icons with different properties
    const techIcons = [
        { icon: 'uil uil-react', label: 'React', size: 1.2, speed: 0.001 },
        { icon: 'uil uil-js-square', label: 'JavaScript', size: 1.1, speed: 0.0012 },
        { icon: 'uil uil-html5', label: 'HTML5', size: 1.1, speed: 0.0013 },
        { icon: 'uil uil-css3-simple', label: 'CSS3', size: 1.1, speed: 0.0014 },
        { icon: 'uil uil-database', label: 'Database', size: 1.0, speed: 0.0011 },
        { icon: 'uil uil-server', label: 'Server', size: 1.0, speed: 0.0015 },
        { icon: 'uil uil-code', label: 'Code', size: 1.0, speed: 0.0016 },
        { icon: 'uil uil-brackets-curly', label: 'Brackets', size: 1.0, speed: 0.0017 },
        { icon: 'uil uil-layer-group', label: 'Layers', size: 1.0, speed: 0.0018 },
        { icon: 'uil uil-cube', label: 'Cube', size: 1.0, speed: 0.0019 },
        { icon: 'uil uil-bolt', label: 'Bolt', size: 1.0, speed: 0.0020 },
        { icon: 'uil uil-rocket', label: 'Rocket', size: 1.1, speed: 0.0021 }
    ];

    // Update time for smooth animations
    useEffect(() => {
        let animationFrameId;
        let lastTime = 0;
        
        const updateTime = (currentTime) => {
            const delta = currentTime - lastTime;
            if (delta > 16) { // ~60fps
                setTime(prev => prev + delta * 0.001);
                lastTime = currentTime;
            }
            animationFrameId = requestAnimationFrame(updateTime);
        };
        
        animationFrameId = requestAnimationFrame(updateTime);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Calculate icon positions in a smooth circular pattern
    const getIconPosition = useCallback((index, total, timeOffset = 0) => {
        const angle = (index / total) * Math.PI * 2 + time * 0.1;
        const radius = 35; // percentage from center
        
        // Smooth circular motion with slight variations
        const x = 50 + Math.cos(angle) * radius + Math.sin(time * 0.05 + index) * 5;
        const y = 50 + Math.sin(angle) * radius + Math.cos(time * 0.05 + index) * 5;
        
        return { x, y };
    }, [time]);

    // Smooth floating animation for icons
    const getIconAnimation = (index) => ({
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 3 + index * 0.1,
            repeat: Infinity,
            ease: "easeInOut"
        }
    });

    return (
        <div className={`animated-background ${mood}`}>
            {/* Subtle gradient background */}
            <div className="gradient-background"></div>

            {/* Main Tech Icons - Circular Layout */}
            <div className="tech-icons-container">
                {techIcons.map((tech, index) => {
                    const position = getIconPosition(index, techIcons.length);
                    
                    return (
                        <motion.div
                            key={index}
                            className={`tech-icon ${mood}`}
                            style={{
                                left: `${position.x}%`,
                                top: `${position.y}%`,
                                fontSize: `${tech.size}rem`
                            }}
                            animate={getIconAnimation(index)}
                            whileHover={{
                                scale: 1.3,
                                rotate: 360,
                                transition: { duration: 0.5 }
                            }}
                        >
                            <i className={tech.icon}></i>
                            <div className="tech-tooltip">{tech.label}</div>
                            
                            {/* Subtle glow effect */}
                            <div className="icon-glow"></div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Orbital Rings */}
            <div className="orbital-container">
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={ring}
                        className={`orbital-ring ring-${ring}`}
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 80 + ring * 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Connection Lines between icons */}
            <svg className="connection-lines" width="100%" height="100%">
                <defs>
                    <linearGradient id="line-gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(79, 70, 229, 0.2)" />
                        <stop offset="50%" stopColor="rgba(124, 58, 237, 0.3)" />
                        <stop offset="100%" stopColor="rgba(79, 70, 229, 0.2)" />
                    </linearGradient>
                    <linearGradient id="line-gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(129, 140, 248, 0.2)" />
                        <stop offset="50%" stopColor="rgba(167, 139, 250, 0.3)" />
                        <stop offset="100%" stopColor="rgba(129, 140, 248, 0.2)" />
                    </linearGradient>
                </defs>
                
                {/* Create connections between icons */}
                {techIcons.map((_, i) => {
                    const nextIndex = (i + 1) % techIcons.length;
                    const pos1 = getIconPosition(i, techIcons.length);
                    const pos2 = getIconPosition(nextIndex, techIcons.length);
                    
                    return (
                        <motion.line
                            key={`connection-${i}`}
                            x1={`${pos1.x}%`}
                            y1={`${pos1.y}%`}
                            x2={`${pos2.x}%`}
                            y2={`${pos2.y}%`}
                            stroke={mood === 'dark' ? "url(#line-gradient-dark)" : "url(#line-gradient-light)"}
                            strokeWidth="0.5"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            animate={{ 
                                pathLength: 1,
                                strokeDashoffset: [0, 20]
                            }}
                            transition={{
                                pathLength: { duration: 2, delay: i * 0.1 },
                                strokeDashoffset: {
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear"
                                }
                            }}
                        />
                    );
                })}
            </svg>

            {/* Subtle floating particles (very minimal) */}
            <div className="minimal-particles">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="floating-particle"
                        style={{
                            left: `${10 + (i * 15)}%`,
                            top: `${20 + (i * 10)}%`,
                            width: `${3 + Math.sin(time + i) * 2}px`,
                            height: `${3 + Math.sin(time + i) * 2}px`
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>

            {/* Smooth background pulse */}
            <motion.div 
                className="background-pulse"
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.02, 0.05, 0.02]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}

export default AnimatedBackground;