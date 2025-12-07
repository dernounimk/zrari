import React from 'react';
import { motion } from 'framer-motion';
import python from '../../../public/back/python.png';
import express from '../../../public/back/express.png';
import firebase from '../../../public/back/firebase.png';
import mongo from '../../../public/back/mongo.png';
import mysql from '../../../public/back/mysql.png';
import django from '../../../public/back/django.png';
import node from '../../../public/back/node.png';

function Backend({ mood }) {
    const skills = [
        { id: 1, name: "Python", level: "Advanced", percentage: 85 },
        { id: 2, name: "Express JS", level: "Expert", percentage: 90 },
        { id: 3, name: "Firebase", level: "Intermediate", percentage: 70 },
        { id: 4, name: "MongoDB", level: "Advanced", percentage: 80 },
        { id: 5, name: "MySQL", level: "Intermediate", percentage: 75 },
        { id: 6, name: "Django", level: "Intermediate", percentage: 70 },
        { id: 7, name: "Node JS", level: "Expert", percentage: 90 },
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
        'Python': python,
        'Express JS': express,
        'Firebase': firebase,
        'MongoDB': mongo,
        'MySQL': mysql,
        'Django': django,
        'Node JS': node,
    };
    return icons[skillName] || python;
}

export default Backend;