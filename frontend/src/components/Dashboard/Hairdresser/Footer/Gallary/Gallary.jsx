import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './Gallary.css';

const UserGalleryPage = () => {
    // States
    const [theme, setTheme] = useState('dark');
    const [activeFilter, setActiveFilter] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [filteredItems, setFilteredItems] = useState([]);

    const galleryItems = [
        {
            id: 1,
            category: 'before-after',
            image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'برش مو',
            description: 'قبل و بعد',
            alt: 'قبل و بعد برش مو'
        },
        {
            id: 2,
            category: 'before-after',
            image: 'https://images.unsplash.com/photo-1599351431408-269d027d3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'ریش تراشی',
            description: 'قبل و بعد',
            alt: 'قبل و بعد ریش تراشی'
        },
        {
            id: 3,
            category: 'haircuts',
            image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'برش مو کلاسیک',
            description: 'استایل کلاسیک',
            alt: 'برش مو استایل کلاسیک'
        },
        {
            id: 4,
            category: 'haircuts',
            image: 'https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'برش مو مدرن',
            description: 'استایل مدرن',
            alt: 'برش مو مدرن'
        },
        {
            id: 5,
            category: 'beard',
            image: 'https://images.unsplash.com/photo-1599351431408-269d027d3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'ریش طراحی شده',
            description: 'طراحی حرفه‌ای',
            alt: 'ریش طراحی شده'
        },
        {
            id: 6,
            category: 'beard',
            image: 'https://images.unsplash.com/photo-1605497787128-3ff550e67194?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'ریش کلاسیک',
            description: 'استایل کلاسیک',
            alt: 'ریش کلاسیک'
        },
        {
            id: 7,
            category: 'space',
            image: 'https://images.unsplash.com/photo-1599351431202-1e0f01871d9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'فضای آرایشگاه',
            description: 'محیط مدرن و شیک',
            alt: 'فضای آرایشگاه'
        },
        {
            id: 8,
            category: 'space',
            image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'فضای آرایشگاه',
            description: 'تجهیزات مدرن',
            alt: 'فضای آرایشگاه'
        }
    ];

    const filters = [
        { key: 'all', label: 'همه' },
        { key: 'before-after', label: 'قبل و بعد' },
        { key: 'haircuts', label: 'برش مو' },
        { key: 'beard', label: 'ریش تراشی' },
        { key: 'space', label: 'فضای آرایشگاه' }
    ];

    useEffect(() => {
        const filtered = activeFilter === 'all'
            ? galleryItems
            : galleryItems.filter(item => item.category === activeFilter);
        setFilteredItems(filtered);
    }, [activeFilter]);

    const handleFilterClick = (filterKey) => {
        setActiveFilter(filterKey);
    };

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const navigateLightbox = (direction) => {
        if (direction === 'prev' && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else if (direction === 'next' && currentImageIndex < filteredItems.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (lightboxOpen) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    navigateLightbox('prev');
                } else if (e.key === 'ArrowRight') {
                    navigateLightbox('next');
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, currentImageIndex, filteredItems.length]);

    // بارگذاری تم از localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme' || 'dark');
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

    return (
        <div className="gallery-page">
            {/* Header - کامپوننت جداگانه */}
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="gallery-main">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">گالری آثار</h1>
                            <p className="hero-description">نمونه کارهای برجسته، قبل و بعد از خدمات و فضای آرایشگاه BARBER SHOP را مشاهده کنید</p>
                            <div className="hero-buttons">
                                <Link to="/TakingturnsPage" className="btn btn-primary"><i className="fas fa-calendar-alt"></i> رزرو نوبت</Link>
                                <Link to="/ServicesPage" className="btn btn-secondary"><i className="fas fa-concierge-bell"></i> مشاهده خدمات</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section id="gallery" className="section gallery-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">گالری آثار</h2>
                            <p className="section-subtitle">نمونه کارهای برجسته و فضای آرایشگاه ما</p>
                        </div>

                        <div className="filter-buttons">
                            {filters.map(filter => (
                                <button
                                    key={filter.key}
                                    className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                                    onClick={() => handleFilterClick(filter.key)}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        <div className="gallery-grid">
                            {filteredItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`gallery-item fade-in delay-${index + 1}`}
                                    data-category={item.category}
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="gallery-img">
                                        <img
                                            src={item.image}
                                            alt={item.alt}
                                            loading="lazy"
                                            className="gallery-image"
                                        />
                                        <div className="gallery-overlay">
                                            <i className="fas fa-expand"></i>
                                        </div>
                                    </div>
                                    <div className="gallery-caption">
                                        <h3 className="gallery-title">{item.title}</h3>
                                        <p className="gallery-description">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lightbox */}
                {lightboxOpen && (
                    <div
                        className="lightbox open"
                        id="lightbox"
                        onClick={(e) => e.target === e.currentTarget && closeLightbox()}
                    >
                        <div className="lightbox-content">
                            <button
                                className="lightbox-close"
                                onClick={closeLightbox}
                                aria-label="بستن"
                            >
                                &times;
                            </button>
                            <img
                                className="lightbox-img"
                                id="lightbox-img"
                                src={filteredItems[currentImageIndex]?.image}
                                alt={filteredItems[currentImageIndex]?.title}
                            />
                            <div className="lightbox-caption" id="lightbox-caption">
                                <h3 className="lightbox-title">{filteredItems[currentImageIndex]?.title}</h3>
                                <p className="lightbox-description">{filteredItems[currentImageIndex]?.description}</p>
                            </div>
                            <div className="lightbox-nav">
                                <button
                                    className="nav-btn prev-btn"
                                    onClick={() => navigateLightbox('prev')}
                                    disabled={currentImageIndex === 0}
                                    aria-label="عکس قبلی"
                                >
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button
                                    className="nav-btn next-btn"
                                    onClick={() => navigateLightbox('next')}
                                    disabled={currentImageIndex === filteredItems.length - 1}
                                    aria-label="عکس بعدی"
                                >
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer - کامپوننت جداگانه */}
            <Footer />
        </div>
    );
};

export default UserGalleryPage;