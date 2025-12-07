import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Services.css';

function Services({ mood }) {
    const [activeModal, setActiveModal] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const services = [
        {
            id: "front",
            icon: "uil uil-brackets-curly",
            title: "Frontend Development",
            description: "Creating beautiful, responsive web interfaces with modern technologies",
            items: [
                "Convert static designs into interactive JS SPA applications",
                "Integrate RESTful APIs into single-page applications",
                "Implement browser-based testing and debugging",
                "Create responsive designs for all device sizes",
                "Optimize website performance and SEO best practices",
                "Ensure cross-browser compatibility",
                "Implement modern UI/UX principles"
            ]
        },
        {
            id: "back",
            icon: "uil uil-server",
            title: "Backend Development",
            description: "Building robust, scalable server-side applications and APIs",
            items: [
                "Develop professional RESTful APIs with proper documentation",
                "Deploy and maintain applications on cloud platforms",
                "Implement comprehensive testing and CI/CD pipelines",
                "Write clean, maintainable, and well-documented code",
                "Apply security best practices and data protection",
                "Design and optimize database schemas",
                "Implement authentication and authorization systems"
            ]
        },
        {
            id: "full",
            icon: "uil uil-layer-group",
            title: "Full Stack Solutions",
            description: "End-to-end web application development from concept to deployment",
            items: [
                "Complete MERN stack application development",
                "Database design and implementation",
                "Server deployment and maintenance",
                "Performance optimization and monitoring",
                "Third-party API integrations",
                "Real-time functionality implementation",
                "Technical support and maintenance"
            ]
        }
    ];

    const handleMore = (serviceId) => {
        setActiveModal(serviceId);
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    };

    const handleClose = () => {
        setActiveModal(null);
        document.body.style.overflow = 'auto';
        document.body.style.position = '';
        document.body.style.width = '';
    };

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
        },
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 50,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const iconVariants = {
        hover: {
            rotate: 360,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className='services section' id='services'>
            {/* Section Header */}
            <div className="services-header">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Services
                </motion.h2>
                
                <motion.span 
                    className='section-subtitle'
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    What I Offer
                </motion.span>
            </div>
            
            <motion.div 
                className="services-container container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {services.map((service) => (
                    <motion.div 
                        key={service.id}
                        className={`services-card ${mood}`}
                        variants={itemVariants}
                        whileHover="hover"
                        onMouseEnter={() => setHoveredCard(service.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        {/* Card Content */}
                        <div className='card-content'>
                            {/* Icon with animation */}
                            <motion.div 
                                className="icon-container"
                                variants={iconVariants}
                                whileHover="hover"
                            >
                                <i className={`${service.icon} service-icon`}></i>
                            </motion.div>
                            
                            <h3 className="service-title">{service.title}</h3>
                            
                            <p className="service-description">
                                {service.description}
                            </p>
                            
                            {/* Action Button */}
                            <motion.button
                                className={`service-btn ${mood}`}
                                onClick={() => handleMore(service.id)}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Details</span>
                                <motion.i 
                                    className="uil uil-arrow-right"
                                    animate={{
                                        x: [0, 5, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity
                                    }}
                                />
                            </motion.button>
                        </div>
                        
                        {/* Corner Accents */}
                        <div className="corner-accent top-left"></div>
                        <div className="corner-accent top-right"></div>
                        <div className="corner-accent bottom-left"></div>
                        <div className="corner-accent bottom-right"></div>
                        
                        {/* Hover Lines */}
                        <div className="hover-lines">
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div 
                        className={`services-modal ${mood}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    >
                        <div className="modal-backdrop"></div>
                        
                        {services
                            .filter(service => service.id === activeModal)
                            .map(service => (
                                <motion.div 
                                    key={service.id}
                                    className={`modal-content ${mood}`}
                                    variants={modalVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        transform: `translateY(${scrollPosition}px)`
                                    }}
                                >
                                    {/* Modal Header */}
                                    <div className="modal-header">
                                        <div className="modal-icon">
                                            <i className={service.icon}></i>
                                        </div>
                                        <div className="modal-header-content">
                                            <h3 className="modal-title">{service.title}</h3>
                                            <p className="modal-subtitle">{service.description}</p>
                                        </div>
                                        <motion.button
                                            className="modal-close"
                                            onClick={handleClose}
                                            whileHover={{ rotate: 90, scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <i className="uil uil-times"></i>
                                        </motion.button>
                                    </div>
                                    
                                    {/* Modal Body */}
                                    <div className="modal-body">
                                        <h4 className="section-title-sm">Service Details</h4>
                                        
                                        <ul className="services-list">
                                            {service.items.map((item, index) => (
                                                <motion.li 
                                                    key={index}
                                                    className="service-item"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <div className="check-circle">
                                                        <i className="uil uil-check"></i>
                                                    </div>
                                                    <span className='service-info'>{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    {/* Modal Footer */}
                                    <div className="modal-footer">
                                        <motion.button
                                            className={`close-btn ${mood}`}
                                            onClick={handleClose}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <i className="uil uil-check-circle"></i>
                                            Got It
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Services;