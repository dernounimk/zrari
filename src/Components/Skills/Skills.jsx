import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Skills.css';
import Frontend from "./Frontend";
import Backend from "./Backend";

function Skills({ mood }) {
    const [activeTab, setActiveTab] = useState('all');
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const tabVariants = {
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
        }
    };

    const tabs = [
        { id: 'all', label: 'All Skills', icon: 'uil uil-apps' },
        { id: 'frontend', label: 'Frontend', icon: 'uil uil-desktop' },
        { id: 'backend', label: 'Backend', icon: 'uil uil-server' }
    ];

    return (
        <section className='section skills' id='skills'>
            {/* Section Header */}
            <div className="section-header skills-header">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Skills
                </motion.h2>
                
                <motion.span 
                    className="section-subtitle"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Technical Expertise & Proficiencies
                </motion.span>
            </div>
            
            {/* Skills Tabs */}
            <motion.div 
                className="skills-tabs-container"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <div className="skills-tabs">
                    {tabs.map(tab => (
                        <motion.button
                            key={tab.id}
                            className={`skills-tab ${activeTab === tab.id ? 'active' : ''} ${mood}`}
                            onClick={() => setActiveTab(tab.id)}
                            variants={tabVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <i className={tab.icon}></i>
                            {tab.label}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Skills Content */}
            <div className="skills-content-wrapper container">
                {/* عرض حسب التبويب */}
                <div className="skills-content">
                    {activeTab === 'all' && (
                        <motion.div 
                            className="skills-grid-all"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {/* Frontend Category */}
                            <motion.div 
                                className="skills-category"
                                variants={itemVariants}
                            >
                                <div className="category-header">
                                    <div className="category-icon">
                                        <i className="uil uil-desktop"></i>
                                    </div>
                                    <div className="category-info">
                                        <h3 className="category-title">Frontend Development</h3>
                                        <p className="category-desc">Building beautiful and responsive user interfaces</p>
                                    </div>
                                </div>
                                <Frontend mood={mood} />
                            </motion.div>

                            {/* Backend Category */}
                            <motion.div 
                                className="skills-category"
                                variants={itemVariants}
                            >
                                <div className="category-header">
                                    <div className="category-icon">
                                        <i className="uil uil-server"></i>
                                    </div>
                                    <div className="category-info">
                                        <h3 className="category-title">Backend Development</h3>
                                        <p className="category-desc">Building scalable and efficient server-side solutions</p>
                                    </div>
                                </div>
                                <Backend mood={mood} />
                            </motion.div>
                        </motion.div>
                    )}

                    {activeTab === 'frontend' && (
                        <motion.div 
                            className="skills-category full-width"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="category-header">
                                <div className="category-icon">
                                    <i className="uil uil-desktop"></i>
                                </div>
                                <div className="category-info">
                                    <h3 className="category-title">Frontend Development</h3>
                                    <p className="category-desc">Building beautiful and responsive user interfaces</p>
                                </div>
                            </div>
                            <Frontend mood={mood} />
                        </motion.div>
                    )}

                    {activeTab === 'backend' && (
                        <motion.div 
                            className="skills-category full-width"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="category-header">
                                <div className="category-icon">
                                    <i className="uil uil-server"></i>
                                </div>
                                <div className="category-info">
                                    <h3 className="category-title">Backend Development</h3>
                                    <p className="category-desc">Building scalable and efficient server-side solutions</p>
                                </div>
                            </div>
                            <Backend mood={mood} />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Skills;