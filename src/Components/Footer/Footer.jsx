import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

function Footer({ mood }) {
    const socialLinks = [
        {
            id: 1,
            title: 'Instagram',
            url: 'https://www.instagram.com/dernouni_mk/',
            icon: 'uil-instagram',
            color: '#E1306C'
        },
        {
            id: 2,
            title: 'Linkedin',
            url: 'https://www.linkedin.com/in/dernouni-mohamed-khalil-914ba92ba/',
            icon: 'uil-linkedin',
            color: '#0077B5'
        },
        {
            id: 3,
            title: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=100046511298578',
            icon: 'uil-facebook',
            color: '#1877F2'
        },
        {
            id: 4,
            title: 'Github',
            url: 'https://github.com/dernounimk',
            icon: 'uil-github-alt',
            color: '#333'
        }
    ];

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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
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

    const socialIconVariants = {
        hover: {
            y: -8,
            scale: 1.1,
            rotate: 360,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
                duration: 0.6
            }
        },
        tap: {
            scale: 0.9
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className={`${mood}`}>
            {/* Floating elements */}
            <div className="footer-floating"></div>
            <div className="footer-floating"></div>
            <div className="footer-floating"></div>

            {/* Wave decoration */}
            <div className="footer-wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <motion.div 
                className="footer-container container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h1 
                    className='Footer-title'
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Dernouni MK
                </motion.h1>

                <motion.p 
                    className="footer-subtitle"
                    variants={itemVariants}
                    style={{ 
                        marginBottom: '2rem',
                        opacity: 0.8,
                        maxWidth: '600px',
                        margin: '0 auto 2rem'
                    }}
                >
                    Full Stack Web Developer passionate about creating amazing digital experiences
                </motion.p>

                <motion.ul variants={itemVariants}>
                    {socialLinks.map((link, index) => (
                        <motion.li 
                            key={link.id}
                            title={link.title}
                            custom={index}
                            variants={socialIconVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <a 
                                href={link.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className={`social-icon ${mood}`}
                                aria-label={link.title}
                                style={{ '--hover-color': link.color }}
                            >
                                <i className={`uil ${link.icon}`}></i>
                            </a>
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Optional email subscription */}
                <motion.div 
                    className="footer-subscription"
                    variants={itemVariants}
                >
                    <p style={{ marginBottom: '1rem' }}>
                        Subscribe to my newsletter for updates
                    </p>
                    <form className="subscription-form" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            className="subscription-input"
                            required
                        />
                        <button type="submit" className="subscription-btn">
                            Subscribe
                        </button>
                    </form>
                </motion.div>

                <motion.span 
                    variants={itemVariants}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 1 }}
                >
                    © {currentYear} Dernouni MK. All rights reserved
                </motion.span>

                <motion.p 
                    variants={itemVariants}
                    style={{ 
                        marginTop: '0.5rem',
                        fontSize: '0.8rem',
                        opacity: 0.6
                    }}
                >
                    Made with <i className="uil uil-heart" style={{ color: '#ef4444' }}></i> and React
                </motion.p>
            </motion.div>
        </footer>
    );
}

export default Footer;