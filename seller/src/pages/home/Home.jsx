import React, { useState } from 'react';
import { 
  FaArrowRight, 
  FaCheckCircle, 
  FaPlay, 
  FaShoppingBag, 
  FaShoppingCart, 
  FaUsers, 
  FaQuoteLeft,
  FaBullhorn /* changed from FaMegaphone */
} from 'react-icons/fa';

// 2. Keep FaWallet over in 'fa6' (Font Awesome 6)
import { FaWallet } from 'react-icons/fa6';
import style from './home.module.css';

// Mock dashboard image placeholder since the image contains a dashboard graphic
import dashboardMockup from '../../assets/featureImage.png'; 

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    { icon: <FaShoppingBag />, title: "Product Management", desc: "Add, update and organize your products with ease." },
    { icon: <FaShoppingCart />, title: "Order Management", desc: "Process, track and fulfill orders seamlessly." },
    { icon: <FaUsers />, title: "Customer Management", desc: "Understand your customers and build lasting relationships." },
    { icon: <FaWallet />, title: "Secure Payouts", desc: "Get paid on time with 100% secure transactions." }
  ];

  const stats = [
    { value: "25,000+", label: "Happy Sellers", emoji: "😊" },
    { value: "1M+", label: "Products Listed", emoji: "📦" },
    { value: "5M+", label: "Orders Processed", emoji: "🛒" },
    { value: "100Cr+", label: "Payouts Made", emoji: "₹" }
  ];

  const testimonials = [
    {
      name: "Amit Verma",
      role: "Fashion Store",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "ShopEase Seller Panel has simplified our business operations. The dashboard is easy to use and extremely powerful."
    },
    {
      name: "Priya Singh",
      role: "Lifestyle Store",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Managing orders, inventory and payouts has never been easier. It's the best platform for sellers!"
    },
    {
      name: "Karan Mehta",
      role: "Electronics Store",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
      text: "The reports and insights help us make better decisions and grow sales every day."
    }
    ,
    {
      name: "Karan Mehta",
      role: "Electronics Store",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
      text: "The reports and insights help us make better decisions and grow sales every day."
    }
    ,
    {
      name: "Karan Mehta",
      role: "Electronics Store",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
      text: "The reports and insights help us make better decisions and grow sales every day."
    }
    ,
    {
      name: "Karan Mehta",
      role: "Electronics Store",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
      text: "The reports and insights help us make better decisions and grow sales every day."
    }
  ];

  return (
    <div className={style.pageWrapper}>
      
      {/* 1. HERO SECTION */}
      <section className={style.heroSection}>
        <div className={style.heroContainer}>
          <div className={style.heroLeft}>
            <div className={style.badge}>
              <span className={style.badgeDot}>⚡</span> Built for Sellers. Designed for Growth.
            </div>
            <h1 className={style.heroTitle}>
              Sell more. <br />
              Manage easily. <br />
              <span className={style.highlightText}>Grow every day.</span>
            </h1>
            <p className={style.heroSubtext}>
              ShopEase Seller Panel gives you everything you need to manage your business, delight customers and scale without limits.
            </p>
            <div className={style.heroActions}>
              <button className={style.btnPrimary}>
                Start Selling Now <FaArrowRight className={style.btnIcon} />
              </button>
              <button className={style.btnSecondary}>
                <FaPlay className={style.playIcon} /> Explore Features
              </button>
            </div>
            <div className={style.heroTrustPoints}>
              <span><FaCheckCircle className={style.checkIcon} /> No setup fees</span>
              <span><FaCheckCircle className={style.checkIcon} /> Easy to use</span>
              <span><FaCheckCircle className={style.checkIcon} /> Secure & Trusted</span>
            </div>
          </div>
          
          <div className={style.heroRight}>
            <img src={dashboardMockup} alt="ShopEase Seller Dashboard Mockup" className={style.mockupImg} />
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY LOGOS */}
      <section className={style.partnersSection}>
        <span className={style.partnersTitle}>TRUSTED BY THOUSANDS OF SELLERS</span>
        <div className={style.partnersGrid}>
          <div className={style.partnerLogo}>🏢 UrbanCart</div>
          <div className={style.partnerLogo}>🏠 StyleHub</div>
          <div className={style.partnerLogo}>🚀 GadgetGo</div>
          <div className={style.partnerLogo}>🏡 HomeNest</div>
          <div className={style.partnerLogo}>📚 Bookland</div>
          <div className={style.partnerLogo}>🍏 FreshBasket</div>
        </div>
      </section>

      {/* 3. POWERFUL FEATURES GRID */}
      <section className={style.featuresSection}>
        <div className={style.sectionHeader}>
          <div>
            <span className={style.sectionSubtitle}>POWERFUL FEATURES</span>
            <h2 className={style.sectionTitle}>Everything you need to run your business in one place</h2>
          </div>
          <p className={style.headerDescription}>
            From product management to payments and analytics, ShopEase provides a complete solution to help you focus on what matters most — growing your business.
          </p>
        </div>

        <div className={style.featuresGrid}>
          {features.map((item, index) => (
            <div key={index} className={style.featureCard}>
              <div className={`${style.featureIconWrapper} ${style[`iconColor${index}`]}`}>
                {item.icon}
              </div>
              <div className={style.featureContent}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href="#learn-more" className={style.cardLink}>
                  Learn more <FaArrowRight className={style.linkArrow} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STATS COUNTER */}
      <section className={style.statsSection}>
        <div className={style.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={style.statCard}>
              <span className={style.statEmoji}>{stat.emoji}</span>
              <div>
                <h4 className={style.statValue}>{stat.value}</h4>
                <p className={style.statLabel}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className={style.testimonialsSection}>
        <span className={style.sectionSubtitleCenter}>LOVE FROM OUR SELLERS</span>
        <h2 className={style.sectionTitleCenter}>What our sellers say</h2>
        
        <div className={style.testimonialsGrid}>
          {testimonials.map((t, index) => (
            <div 
              key={index} 
              className={`${style.testimonialCard} ${activeTestimonial === index ? style.activeSlide : ''}`}
            >
              <div className={style.quoteIconWrapper}>
                <FaQuoteLeft />
              </div>
              <p className={style.testimonialText}>"{t.text}"</p>
              <div className={style.profileWrapper}>
                <img src={t.img} alt={t.name} className={style.profileImg} />
                <div>
                  <h4 className={style.profileName}>{t.name}</h4>
                  <span className={style.profileRole}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Slider Pagination Controls */}
        <div className={style.sliderDots}>
          {testimonials.map((_, index) => (
            <button 
              key={index} 
              className={`${style.dot} ${activeTestimonial === index ? style.activeDot : ''}`}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

    </div>
  );
}