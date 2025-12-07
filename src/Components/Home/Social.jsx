import React from 'react'
import { motion } from 'framer-motion'
import './Home.css'

function Social({mood}) {
  const socialIcons = [
    { title: 'Instagram', icon: 'uil-instagram', url: 'https://www.instagram.com/dernouni_mk/' },
    { title: 'Linkedin', icon: 'uil-linkedin', url: 'https://www.linkedin.com/in/dernouni-mohamed-khalil-914ba92ba/' },
    { title: 'Facebook', icon: 'uil-facebook', url: 'https://www.facebook.com/profile.php?id=100046511298578' },
    { title: 'Github', icon: 'uil-github-alt', url: 'https://github.com/dernounimk' }
  ];

  return (
    <div className='home-social'>
      {socialIcons.map((social, index) => (
        <motion.a
          key={social.title}
          title={social.title}
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          className={`social-icon ${mood}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className={`uil ${social.icon}`}></i>
        </motion.a>
      ))}
    </div>
  )
}

export default Social