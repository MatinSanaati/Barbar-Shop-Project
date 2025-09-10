import React, { useEffect, useState } from 'react';
import Header from '../../components/Landing/Header/Header';
import Main from '../../components/Landing/Main/Main';
import Footer from '../../components/Landing/Footer/Footer';
import './Landing.css';

const LandingPage = () => {
    const [theme, setTheme] = useState('dark');
    const [bookingForm, setBookingForm] = useState({
        name: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: ''
    });
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // بارگذاری تم از localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // تغییر تم
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleBookingFormChange = (e) => {
        setBookingForm({
            ...bookingForm,
            [e.target.id]: e.target.value
        });
    };

    const handleContactFormChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Main
                bookingForm={bookingForm}
                contactForm={contactForm}
                handleBookingFormChange={handleBookingFormChange}
                handleContactFormChange={handleContactFormChange}
            />
            <Footer />
        </div>
    );
};

export default LandingPage;