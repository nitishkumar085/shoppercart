import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaGlobe } from 'react-icons/fa';
import style from './footer.module.css';
import appIcon from '../../assets/icons/appIcon.png'

export default function Footer() {
  return (
    <footer className={style.footerContainer}>
      <div className={style.mainContent}>
        
        {/* Brand Section */}
        <div className={style.brandColumn}>
          <div className={style.logoWrapper}>
            <img src={appIcon} alt="ShopEase Logo" className={style.logoImg} />
            <div>
              <h2 className={style.brandName}>SHOOPER CART</h2>
              <span className={style.brandSubtitle}>Seller Panel</span>
            </div>
          </div>
          <p className={style.brandDescription}>
            All-in-one platform for sellers to manage, grow and scale their online business with confidence.
          </p>
          <div className={style.socialIcons}>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Links Grid */}
        <div className={style.linksGrid}>
          <div className={style.linkColumn}>
            <h3>PRODUCT</h3>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Updates</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>

          <div className={style.linkColumn}>
            <h3>SOLUTIONS</h3>
            <ul>
              <li><a href="#">For Small Business</a></li>
              <li><a href="#">For Large Sellers</a></li>
              <li><a href="#">E-commerce Stores</a></li>
              <li><a href="#">Retailers</a></li>
              <li><a href="#">Marketplaces</a></li>
            </ul>
          </div>

          <div className={style.linkColumn}>
            <h3>RESOURCES</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Webinars</a></li>
              <li><a href="#">API Documentation</a></li>
            </ul>
          </div>

          <div className={style.linkColumn}>
            <h3>COMPANY</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={style.newsletterColumn}>
          <h3>NEWSLETTER</h3>
          <p>Subscribe to get tips and updates to grow your business.</p>
          <form className={style.inputGroup} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className={style.emailInput} 
              required 
            />
            <button type="submit" className={style.subscribeBtn}>Subscribe</button>
          </form>
        </div>

      </div>

      <hr className={style.divider} />

      {/* Bottom Bar Section */}
      <div className={style.bottomBar}>
        <span className={style.copyright}>© 2024 SHOPPER CART. All rights reserved.</span>
        <div className={style.languageSelector}>
          <FaGlobe className={style.globeIcon} />
          <span>English</span>
          <span className={style.arrow}>▼</span>
        </div>
      </div>
    </footer>
  );
}