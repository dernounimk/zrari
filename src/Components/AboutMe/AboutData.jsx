import React from 'react';
import { motion } from 'framer-motion';

function AboutData({ mood }) {
    const code = "</>";
    
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

    const boxVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            y: 20,
            rotateX: -20
        },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.5
            }
        }),
        hover: {
            y: -10,
            scale: 1.05,
            rotateY: 10,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95,
            rotateY: -5
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        },
        hover: {
            rotate: [0, 15, -15, 0],
            scale: 1.2,
            transition: {
                duration: 0.5
            }
        }
    };

    const progressVariants = {
        hidden: { width: 0 },
        visible: (delay) => ({
            width: "100%",
            transition: {
                duration: 1.2,
                delay: delay,
                ease: "easeInOut"
            }
        })
    };

    const pulseVariants = {
        initial: { scale: 1 },
        pulse: {
            scale: [1, 1.1, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const dataItems = [
        {
            id: 1,
            icon: code,
            title: "Experience",
            subtitle: "3+ Years Working",
            customIcon: true,
            delay: 0,
            color: "#4f46e5"
        },
        {
            id: 2,
            icon: "uil uil-check-circle",
            title: "Completed",
            subtitle: "+25 Projects",
            customIcon: false,
            delay: 0.1,
            color: "#10b981"
        },
        {
            id: 3,
            icon: "uil uil-users-alt",
            title: "Clients",
            subtitle: "3 Satisfied",
            customIcon: false,
            delay: 0.2,
            color: "#f59e0b"
        },
        {
            id: 4,
            icon: "uil uil-clock-eight",
            title: "Support",
            subtitle: "Online 24/8",
            customIcon: false,
            delay: 0.3,
            color: "#8b5cf6"
        }
    ];

    return (
        <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {dataItems.map((item, i) => (
                <motion.div 
                    key={item.id}
                    className={`stat-box ${mood}`}
                    custom={i}
                    variants={boxVariants}
                    whileHover="hover"
                    whileTap="tap"
                    style={{ 
                        borderTop: `3px solid ${item.color}`,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Background Pattern */}
                    <motion.div 
                        className="stat-pattern"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    
                    {/* Icon with Enhanced Animation */}
                    <motion.div
                        className="stat-icon-wrapper"
                        variants={iconVariants}
                        whileHover="hover"
                    >
                        {item.customIcon ? (
                            <motion.i
                                className="code-icon"
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                                style={{ color: item.color }}
                            >
                                {item.icon}
                            </motion.i>
                        ) : (
                            <motion.i 
                                className={item.icon}
                                animate={{
                                    rotateY: [0, 180, 360],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{ color: item.color }}
                            />
                        )}
                    </motion.div>
                    
                    {/* Content */}
                    <motion.div 
                        className="stat-content"
                        variants={pulseVariants}
                        animate="pulse"
                    >
                        <motion.h3 
                            className="stat-title"
                            animate={{ 
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                background: `linear-gradient(90deg, ${item.color}, ${item.color}66)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            {item.title}
                        </motion.h3>
                        <motion.p 
                            className='stat-subtitle'
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {item.subtitle}
                        </motion.p>
                    </motion.div>
                    
                    {/* Animated Progress Bar */}
                    <motion.div 
                        className="stat-progress-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: item.delay + 0.5 }}
                    >
                        <motion.div 
                            className="stat-progress"
                            variants={progressVariants}
                            custom={item.delay}
                            style={{ 
                                background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)`
                            }}
                        />
                        <motion.div 
                            className="progress-dot"
                            animate={{
                                x: ["0%", "100%", "0%"],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: item.delay
                            }}
                            style={{ backgroundColor: item.color }}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
}

export default AboutData;