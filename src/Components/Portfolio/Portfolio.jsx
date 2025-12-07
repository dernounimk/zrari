import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Portfolio.css';
import img1 from '../../assets/projects/project-1.png';
import img2 from '../../assets/projects/project-2.png';
import img3 from '../../assets/projects/project-3.png';
import img4 from '../../assets/projects/project-4.png';
import img5 from '../../assets/projects/project-5.png';
import img6 from '../../assets/projects/project-6.png';
import img7 from '../../assets/projects/project-7.png';

function Portfolio({ mood }) {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [isAnimating, setIsAnimating] = useState(false);

    const projects = [
        {
            id: 1,
            image: img1,
            title: "Volty Store",
            description: "E-commerce platform for electronics with modern UI and animations",
            link: "https://volty-store.vercel.app/",
            tags: ["React", "Express", "Node", "MongoDB"],
            github: "https://github.com/dernounimk/Volty"
        },
        {
            id: 2,
            image: img2,
            title: "Zoubir Trends",
            description: "Fashion e-commerce with advanced filtering and user dashboard",
            link: "https://zoubir-trends.vercel.app/",
            tags: ["React", "Express", "MongoDB"],
            github: "https://github.com/dernounimk/Zoubir-Trends"
        },
        {
            id: 3,
            image: img3,
            title: "Edusity Courses",
            description: "Online learning platform with course management system",
            link: "https://dernounimk.github.io/edusity-university-demo/",
            tags: ["React", "Bootstrap", "API"],
            github: "https://github.com/dernounimk/edusity-university-demo/"
        },
        {
            id: 4,
            image: img4,
            title: "My World",
            description: "Personal development and educational website",
            link: "https://dernounimk.github.io/world-demo/",
            tags: ["HTML", "CSS", "JavaScript"],
            github: "https://github.com/dernounimk/world-demo"
        },
        {
            id: 5,
            image: img5,
            title: "Developer World",
            description: "Resource hub for developers community",
            link: "https://dernounimk.github.io/khalil-web/",
            tags: ["HTML5", "CSS3", "JavaScript"],
            github: "https://github.com/dernounimk/khalil-web"
        },
        {
            id: 6,
            image: img6,
            title: "Products CRUDS",
            description: "Product management system with CRUD operations",
            link: "https://dernounimk.github.io/khalil-cruds-demo/",
            tags: ["HTML", "CSS", "JavaScript"],
            github: "https://github.com/dernounimk/khalil-cruds-demo"
        },
        {
            id: 7,
            image: img7,
            title: "MK Portfolio",
            description: "Modern portfolio with smooth animations",
            link: "https://dernounimk.github.io/mk-dev-demo/",
            tags: ["React", "CSS", "Framer Motion"],
            github: "https://github.com/dernounimk/mk-dev-demo"
        }
    ];

    const updateSlidesPerView = () => {
        if (window.innerWidth >= 1200) {
            setSlidesPerView(3);
        } else if (window.innerWidth >= 768) {
            setSlidesPerView(2);
        } else {
            setSlidesPerView(1);
        }
    };

    useEffect(() => {
        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    const totalSlides = projects.length;
    const maxSlide = Math.max(0, totalSlides - slidesPerView);

    const nextSlide = () => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        setCurrentSlide(prev => {
            const nextSlide = prev < maxSlide ? prev + 1 : 0;
            
            if (nextSlide === 0 && prev === maxSlide) {
                setTimeout(() => {
                    if (sliderRef.current) {
                        sliderRef.current.style.transition = 'none';
                        sliderRef.current.style.transform = 'translateX(0%)';
                        
                        setTimeout(() => {
                            if (sliderRef.current) {
                                sliderRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                            }
                            setIsAnimating(false);
                        }, 50);
                    }
                }, 500);
            } else {
                setTimeout(() => setIsAnimating(false), 500);
            }
            
            return nextSlide;
        });
    };

    const prevSlide = () => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        setCurrentSlide(prev => {
            const prevSlide = prev > 0 ? prev - 1 : maxSlide;
            
            if (prevSlide === maxSlide && prev === 0) {
                setTimeout(() => {
                    if (sliderRef.current) {
                        sliderRef.current.style.transition = 'none';
                        sliderRef.current.style.transform = `translateX(-${maxSlide * (100 / slidesPerView)}%)`;
                        
                        setTimeout(() => {
                            if (sliderRef.current) {
                                sliderRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                            }
                            setIsAnimating(false);
                        }, 50);
                    }
                }, 500);
            } else {
                setTimeout(() => setIsAnimating(false), 500);
            }
            
            return prevSlide;
        });
    };

    const goToSlide = (index) => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide(index);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            const translateX = -(currentSlide * (100 / slidesPerView));
            sliderRef.current.style.transform = `translateX(${translateX}%)`;
        }
    }, [currentSlide, slidesPerView]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            y: -3,
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

    return (
        <section className="work container section" id='portfolio'>
            {/* Floating elements */}
            <div className="portfolio-floating"></div>
            <div className="portfolio-floating"></div>

            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
            >
                <h2 className="section-title">
                    Portfolio
                </h2>
                
                <span className="section-subtitle">
                    Explore my recent projects and creative work
                </span>
            </motion.div>

            <div className="portfolio-container">
                {/* Navigation Buttons */}
                {totalSlides > slidesPerView && (
                    <>
                        <motion.button 
                            className={`nav-btn prev-btn ${mood}`}
                            onClick={prevSlide}
                            aria-label="Previous slide"
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            disabled={isAnimating}
                        >
                            <i className="uil uil-angle-left-b"></i>
                        </motion.button>
                        
                        <motion.button 
                            className={`nav-btn next-btn ${mood}`}
                            onClick={nextSlide}
                            aria-label="Next slide"
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            disabled={isAnimating}
                        >
                            <i className="uil uil-angle-right-b"></i>
                        </motion.button>
                    </>
                )}

                <div className="slider-wrapper">
                    <div className="work-container">
                        <motion.div 
                            className="slider"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <motion.ul ref={sliderRef}>
                                {projects.map((project) => (
                                    <motion.li 
                                        key={project.id}
                                        variants={cardVariants}
                                        whileHover={{ 
                                            scale: 1.02,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className={`work-card ${mood}`}>
                                            <div className="image-wrapper">
                                                <motion.img 
                                                    src={project.image} 
                                                    alt={project.title}
                                                    loading="lazy"
                                                    initial={{ scale: 1 }}
                                                    whileHover={{ scale: 1.08 }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                                <div className="image-overlay">
                                                    <div className="overlay-content">
                                                        <p className="project-description">
                                                            {project.description}
                                                        </p>
                                                        <motion.a 
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="github-btn-overlay"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <i className="uil uil-github"></i> View Code
                                                        </motion.a>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <motion.h3
                                                initial={{ opacity: 0.9 }}
                                                whileHover={{ opacity: 1 }}
                                            >
                                                {project.title}
                                            </motion.h3>
                                            
                                            <div className="project-tags">
                                                {project.tags.map((tag, idx) => (
                                                    <motion.span 
                                                        key={idx} 
                                                        className="project-tag"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {tag}
                                                    </motion.span>
                                                ))}
                                            </div>
                                            
                                            {/* زر View Project - في نفس المستوى في جميع البطاقات */}
                                            <div style={{ flex: 1 }}></div>
                                            
                                            <motion.a 
                                                href={project.link}
                                                className="view-project-btn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover="hover"
                                                whileTap="tap"
                                                variants={buttonVariants}
                                            >
                                                <span>View Project</span>
                                                <i className="uil uil-external-link-alt"></i>
                                            </motion.a>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        {/* Dots Indicator */}
                        {maxSlide > 0 && (
                            <motion.div 
                                className="dots-container"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                                    <motion.div
                                        key={index}
                                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                                        onClick={() => goToSlide(index)}
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.9 }}
                                        animate={{
                                            scale: index === currentSlide ? 1.2 : 1
                                        }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Portfolio;