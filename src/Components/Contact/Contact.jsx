import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

function Contact({ theMood }) {
    const mood = theMood;
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [touchedFields, setTouchedFields] = useState({
        name: false,
        email: false,
        message: false
    });

    const contactMethods = [
        {
            id: 1,
            icon: "uil uil-envelope-alt",
            title: "Email",
            info: "dernounimk@gmail.com",
            link: "mailto:dernounimk@gmail.com",
            action: "Write me"
        },
        {
            id: 2,
            icon: "uil uil-telegram",
            title: "Telegram",
            info: "@dernouni_mk",
            link: "https://t.me/dernouni_mk",
            action: "Message me"
        }
    ];

    const validateForm = () => {
        const errors = {};
        
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        } else if (formData.name.length < 2) {
            errors.name = "Name must be at least 2 characters";
        }
        
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Please enter a valid email";
        }
        
        if (!formData.message.trim()) {
            errors.message = "Message is required";
        } else if (formData.message.length < 10) {
            errors.message = "Message must be at least 10 characters";
        }
        
        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Mark field as touched
        if (!touchedFields[name]) {
            setTouchedFields(prev => ({
                ...prev,
                [name]: true
            }));
        }
        
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        if (!touchedFields[name]) {
            setTouchedFields(prev => ({
                ...prev,
                [name]: true
            }));
        }
        
        // Validate field on blur
        const errors = validateForm();
        if (errors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: errors[name]
            }));
        } else {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        
        // Mark all fields as touched
        setTouchedFields({
            name: true,
            email: true,
            message: true
        });
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        
        setIsSubmitting(true);
        setResult("Sending...");

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("message", formData.message);
        formDataToSend.append("access_key", import.meta.env.VITE_KEY);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message sent successfully! I'll get back to you soon.");
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
                setFormErrors({});
                setTouchedFields({
                    name: false,
                    email: false,
                    message: false
                });
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    setResult("");
                }, 5000);
            } else {
                setResult(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setResult("Network error. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="section contact" id='contact'>
            {/* Floating elements */}
            <div className="contact-floating"></div>
            <div className="contact-floating"></div>
            <div className="contact-floating"></div>

            <h2 className="section-title">
                Contact Me
            </h2>
            
            <span className="section-subtitle">
                Get in Touch
            </span>

            <div className="contact-container">
                <div className="contact-content">
                    {contactMethods.map((method) => (
                        <div 
                            key={method.id}
                            className={`contact-cart ${mood}`}
                        >
                            <i className={`${method.icon} icon`}></i>
                            <h3>{method.title}</h3>
                            <p>{method.info}</p>
                            <a 
                                className={mood}
                                target='_blank'
                                rel='noopener noreferrer'
                                href={method.link}
                            >
                                {method.action}
                                <i className="uil uil-arrow-right"></i>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="contact-content">
                    <form className="contact-form" onSubmit={onSubmit} noValidate>
                        <div className="form-group">
                            <div className="form-div">
                                <input 
                                    type="text" 
                                    name='name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required 
                                    className={`form-input ${mood} ${formErrors.name ? 'error' : ''}`}
                                    placeholder=' '
                                    disabled={isSubmitting}
                                />
                                <label className={`form-tag ${mood}`}>Name</label>
                            </div>
                            <AnimatePresence>
                                {touchedFields.name && formErrors.name && (
                                    <motion.div 
                                        className="error-message-container"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <span className="error-message">{formErrors.name}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="form-group">
                            <div className="form-div">
                                <input 
                                    type="email" 
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required 
                                    className={`form-input ${mood} ${formErrors.email ? 'error' : ''}`}
                                    placeholder=' '
                                    disabled={isSubmitting}
                                />
                                <label className={`form-tag ${mood}`}>Email</label>
                            </div>
                            <AnimatePresence>
                                {touchedFields.email && formErrors.email && (
                                    <motion.div 
                                        className="error-message-container"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <span className="error-message">{formErrors.email}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="form-group">
                            <div className="form-div message-div">
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`form-input ${mood} form-area ${formErrors.message ? 'error' : ''}`}
                                    placeholder=' '
                                    rows="4"
                                    disabled={isSubmitting}
                                />
                                <label className={`form-tag ${mood}`}>Message</label>
                            </div>
                            <AnimatePresence>
                                {touchedFields.message && formErrors.message && (
                                    <motion.div 
                                        className="error-message-container"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <span className="error-message">{formErrors.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="send">
                            <button 
                                type='submit'
                                className={`send-btn ${isSubmitting ? 'sending' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span>Sending...</span>
                                        <div className="spinner" style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            borderTopColor: 'white',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite',
                                            marginLeft: '0.5rem'
                                        }} />
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg
                                            className="btn-icon"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M14.2199 21.9352C13.0399 21.9352 11.3699 21.1052 10.0499 17.1352L9.32988 14.9752L7.16988 14.2552C3.20988 12.9352 2.37988 11.2652 2.37988 10.0852C2.37988 8.91525 3.20988 7.23525 7.16988 5.90525L15.6599 3.07525C17.7799 2.36525 19.5499 2.57525 20.6399 3.65525C21.7299 4.73525 21.9399 6.51525 21.2299 8.63525L18.3999 17.1252C17.0699 21.1052 15.3999 21.9352 14.2199 21.9352ZM7.63988 7.33525C4.85988 8.26525 3.86988 9.36525 3.86988 10.0852C3.86988 10.8052 4.85988 11.9052 7.63988 12.8252L10.1599 13.6652C10.3799 13.7352 10.5599 13.9152 10.6299 14.1352L11.4699 16.6552C12.3899 19.4352 13.4999 20.4252 14.2199 20.4252C14.9399 20.4252 16.0399 19.4352 16.9699 16.6552L19.7999 8.16525C20.3099 6.62525 20.2199 5.36525 19.5699 4.71525C18.9199 4.06525 17.6599 3.98525 16.1299 4.49525L7.63988 7.33525Z"
                                                fill={mood === "dark"? "#1f1e1e": "#fff"}
                                            />
                                            <path
                                                d="M10.11 14.7052C9.92005 14.7052 9.73005 14.6352 9.58005 14.4852C9.29005 14.1952 9.29005 13.7152 9.58005 13.4252L13.16 9.83518C13.45 9.54518 13.93 9.54518 14.22 9.83518C14.51 10.1252 14.51 10.6052 14.22 10.8952L10.64 14.4852C10.5 14.6352 10.3 14.7052 10.11 14.7052Z"
                                                fill={mood === "dark"? "#1f1e1e": "#fff"}
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {result && (
                                    <motion.span 
                                        className={`result-msg ${result.includes('successfully') ? 'success' : result.includes('Sending') ? 'sending' : 'error'}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        {result}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;