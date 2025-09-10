import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../User/Header/Header';
import Footer from '../../../User/Footer/Footer';
import './Blog.css';

const UserBlogPage = () => {
    // States
    const [theme, setTheme] = useState('dark');

    const [animatedElements, setAnimatedElements] = useState([]);

    // Intersection Observer برای انیمیشن اسکرول
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setAnimatedElements(prev => [...prev, entry.target.dataset.animationId]);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const elements = document.querySelectorAll('[data-animation-id]');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const isAnimated = (id) => animatedElements.includes(id);

    const articles = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "آموزشی",
            title: "راهنمای انتخاب استایل برش مو مناسب با فرم صورت",
            excerpt: "انتخاب استایل برش مو مناسب با فرم صورت شما می‌تواند تأثیر چشمگیری در ظاهر شما داشته باشد. در این مقاله به بررسی انواع فرم‌های صورت و استایل‌های مناسب هر کدام می‌پردازیم.",
            date: "1402/05/12",
            readTime: "5 دقیقه مطالعه"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1599351431408-269d027d3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "مراقبت",
            title: "۷ نکته طلایی برای رشد سریع و سالم ریش",
            excerpt: "آیا می‌خواهید ریشی پرپشت و سالم داشته باشید؟ در این مقاله ۷ نکته طلایی برای رشد سریع و سالم ریش را برای شما آماده کرده‌ایم که با رعایت آنها ظاهری شیک و جذاب خواهید داشت.",
            date: "1402/05/08",
            readTime: "7 دقیقه مطالعه"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "ترند",
            title: "آخرین ترند‌های آرایش مردانه تابستان ۱۴۰۲",
            excerpt: "تابستان ۱۴۰۲ با خود ترند‌های جدیدی در دنیای آرایش مردانه به همراه داشته است. در این مقاله به بررسی جدیدترین استایل‌ها و تکنیک‌هایی می‌پردازیم که امسال بیشترین محبوبیت را داشته‌اند.",
            date: "1402/05/05",
            readTime: "6 دقیقه مطالعه"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1605497787128-3ff550e67194?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "مراقبت",
            title: "۵ محصول مراقبتی که هر مردی باید داشته باشد",
            excerpt: "مراقبت از مو و پوست چهره بخش مهمی از آرایش مردانه است. در این مقاله ۵ محصول مراقبتی ضروری که هر مردی باید در کابینت آرایشی خود داشته باشد را معرفی می‌کنیم.",
            date: "1402/04/28",
            readTime: "4 دقیقه مطالعه"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1599351431202-1e0f01871d9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "آموزشی",
            title: "راهنمای آرایش شایسته برای مصاحبه شغلی",
            excerpt: "ظاهر مناسب می‌تواند تأثیر زیادی در موفقیت شما در مصاحبه‌های شغلی داشته باشد. در این مقاله به بررسی نحوه آرایش شایسته و حرفه‌ای برای مصاحبه‌های کاری می‌پردازیم.",
            date: "1402/04/22",
            readTime: "5 دقیقه مطالعه"
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "سلامت",
            title: "تاثیر تغذیه بر سلامت مو و ریش مردانه",
            excerpt: "سلامت مو و ریش نه تنها به مراقبت‌های بیرونی بستگی دارد، بلکه تغذیه مناسب نیز نقش کلیدی در آن دارد. در این مقاله به بررسی مواد مغذی ضروری برای رشد سالم مو و ریش می‌پردازیم.",
            date: "1402/04/15",
            readTime: "8 دقیقه مطالعه"
        }
    ];

    const popularPosts = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1599351431408-269d027d3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            title: "۷ نکته طلایی برای رشد سریع و سالم ریش",
            date: "1402/05/08"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            title: "راهنمای انتخاب استایل برش مو مناسب با فرم صورت",
            date: "1402/05/12"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            title: "آخرین ترند‌های آرایش مردانه تابستان ۱۴۰۲",
            date: "1402/05/05"
        }
    ];

    const categories = [
        { name: "آموزشی", count: 12 },
        { name: "مراقبت", count: 8 },
        { name: "ترند", count: 5 },
        { name: "سلامت", count: 7 },
        { name: "محصولات", count: 6 }
    ];

    const tags = ["آرایش", "مو", "ریش", "مراقبت", "ترند", "سلامت"];

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
        <div className="blog-page">
            {/* Header */}
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="blog-main">
                {/* Hero Section */}
                <section className="hero" data-animation-id="hero">
                    <div className="hero-content">
                        <div className={`hero-text ${isAnimated('hero') ? 'animate-fade-in-up' : ''}`}>
                            <h1 className="hero-title">بلاگ آرایشگاه BARBER SHOP</h1>
                            <p className="hero-description">
                                آخرین ترند‌ها، نکات مراقبتی و مقالات آموزشی آرایش مردانه را از ما بخوانید
                            </p>
                            <div className="hero-buttons">
                                <Link to="#blog" className="btn btn-primary">
                                    <i className="fas fa-arrow-down"></i> مشاهده مقالات
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog Section */}
                <section id="blog" className="section blog-section" data-animation-id="blog">
                    <div className="container">
                        <div className={`section-header ${isAnimated('blog') ? 'animate-fade-in-up' : ''}`}>
                            <h2 className="section-title">مقالات و مطالب</h2>
                            <p className="section-subtitle">
                                آخرین اخبار، نکات و ترند‌های دنیای آرایش مردانه
                            </p>
                        </div>
                        <div className="blog-content">
                            {/* Articles Grid */}
                            <div className="articles-grid">
                                {articles.map((article, index) => (
                                    <article
                                        key={article.id}
                                        className={`article-card animate-fade-in-up delay-${index + 1}`}
                                        data-animation-id={`article-${article.id}`}
                                    >
                                        <div className="article-image">
                                            <img src={article.image} alt={article.title} loading="lazy" />
                                            <div className="article-badge">{article.category}</div>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">{article.title}</h3>
                                            <p className="article-excerpt">{article.excerpt}</p>
                                            <div className="article-meta">
                                                <div className="meta-item">
                                                    <i className="far fa-calendar"></i>
                                                    <span>{article.date}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <i className="far fa-clock"></i>
                                                    <span>{article.readTime}</span>
                                                </div>
                                            </div>
                                            <Link to={`/article/${article.id}`} className="read-more">
                                                ادامه مطلب <i className="fas fa-arrow-left"></i>
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Sidebar */}
                            <aside className="sidebar">
                                <div className={`sidebar-widget animate-fade-in-up delay-1`} data-animation-id="widget-search">
                                    <h3 className="widget-title">جستجو</h3>
                                    <form className="search-form">
                                        <input type="text" className="search-input" placeholder="عبارت مورد نظر..." />
                                        <button type="submit" className="search-btn">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </form>
                                </div>

                                <div className={`sidebar-widget animate-fade-in-up delay-2`} data-animation-id="widget-categories">
                                    <h3 className="widget-title">دسته‌بندی‌ها</h3>
                                    <ul className="categories-list">
                                        {categories.map((category, index) => (
                                            <li key={index}>
                                                <Link to={`/category/${category.name}`}>
                                                    {category.name} <span>({category.count})</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={`sidebar-widget animate-fade-in-up delay-3`} data-animation-id="widget-popular">
                                    <h3 className="widget-title">پربازدیدترین‌ها</h3>
                                    <ul className="popular-posts">
                                        {popularPosts.map(post => (
                                            <li key={post.id} className="popular-post">
                                                <div className="post-image">
                                                    <img src={post.image} alt={post.title} loading="lazy" />
                                                </div>
                                                <div className="post-content">
                                                    <h4>
                                                        <Link to={`/article/${post.id}`}>{post.title}</Link>
                                                    </h4>
                                                    <div className="post-date">
                                                        <i className="far fa-calendar"></i> {post.date}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={`sidebar-widget animate-fade-in-up delay-4`} data-animation-id="widget-tags">
                                    <h3 className="widget-title">برچسب‌ها</h3>
                                    <div className="tags">
                                        {tags.map((tag, index) => (
                                            <Link
                                                key={index}
                                                to={`/tag/${tag}`}
                                                className="tag-link"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>

                        {/* Pagination */}
                        <nav className={`pagination animate-fade-in-up delay-5`} data-animation-id="pagination">
                            <Link to="#" className="page-link active">1</Link>
                            <Link to="#" className="page-link">2</Link>
                            <Link to="#" className="page-link">3</Link>
                            <Link to="#" className="page-link">
                                <i className="fas fa-chevron-left"></i>
                            </Link>
                        </nav>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default UserBlogPage;