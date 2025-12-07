import React from 'react';
import { motion } from 'framer-motion';
import html from '../../../public/front/html.png';
import css from '../../../public/front/css.png';
import javascript from '../../../public/front/javascript.png';
import bootstrap from '../../../public/front/bootstrap.png';
import tailwind from '../../../public/front/tailwind.png';
import git from '../../../public/front/git.png';
import react from '../../../public/front/react.png';
import next from '../../../public/front/next.png';

function Frontend({ mood }) {
    const skills = [
        { id: 1, name: "HTML", level: "Expert", percentage: 95 },
        { id: 2, name: "CSS", level: "Expert", percentage: 90 },
        { id: 3, name: "JavaScript", level: "Advanced", percentage: 85 },
        { id: 4, name: "Bootstrap", level: "Advanced", percentage: 80 },
        { id: 5, name: "Tailwind CSS", level: "Intermediate", percentage: 75 },
        { id: 6, name: "Git", level: "Intermediate", percentage: 70 },
        { id: 7, name: "React JS", level: "Advanced", percentage: 85 },
        { id: 8, name: "Next JS", level: "Basic", percentage: 40 },
    ];

    return (
        <div className="skills-content-inner">
            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <motion.div 
                        key={skill.id}
                        className="skill-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.05 }}
                    >
                        <div className="skill-icon-wrapper">
                            <img 
                                src={getSkillIcon(skill.name)}
                                alt={skill.name} 
                                loading="lazy"
                            />
                        </div>
                        
                        <div className="skill-info">
                            <div className="skill-header">
                                <h4 className="skill-name">{skill.name}</h4>
                                <span className={`skill-level ${skill.level.toLowerCase()}`}>
                                    {skill.level}
                                </span>
                            </div>
                            
                            <div className="skill-progress-container">
                                <div className="skill-progress">
                                    <motion.div 
                                        className="skill-progress-bar"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.percentage}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                                        style={{
                                            backgroundColor: getLevelColor(skill.level)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// دالة مساعدة للحصول على الألوان
function getLevelColor(level) {
    switch(level.toLowerCase()) {
        case 'expert': return '#10b981';
        case 'advanced': return '#3b82f6';
        case 'intermediate': return '#f59e0b';
        case 'basic': return '#6b7280';
        default: return '#6c63ff';
    }
}

// دالة مساعدة للحصول على الأيقونة
function getSkillIcon(skillName) {
    const icons = {
        'HTML': html,
        'CSS': css,
        'JavaScript': javascript,
        'Bootstrap': bootstrap,
        'Tailwind CSS': tailwind,
        'Git': git,
        'React JS': react,
        'Next JS': next,
    };
    return icons[skillName] || html;
}

export default Frontend;