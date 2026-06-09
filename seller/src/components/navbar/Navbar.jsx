
import appIcon from '../../assets/icons/appIcon.png'




import React, { useState } from 'react';
import style from './Navbar.module.css'; // Assuming you use CSS Modules based on your syntax
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={style.navbarContainer}>
            {/* Logo Section */}
          <Link to="/" style={{color:"black",textDecoration:"none"}}>  <div className={style.apptitle}>
                <img src={appIcon} alt='app logo' className={style.appLogo}/>
                <h2>SHOOPER CART</h2>
            </div>
            </Link>

            {/* Hamburger Icon for Mobile */}
            <button className={style.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
                <span className={`${style.bar} ${isMenuOpen ? style.open : ''}`}></span>
                <span className={`${style.bar} ${isMenuOpen ? style.open : ''}`}></span>
                <span className={`${style.bar} ${isMenuOpen ? style.open : ''}`}></span>
            </button>

            {/* Navigation Links and Buttons Menu */}
            <div className={`${style.menuWrapper} ${isMenuOpen ? style.active : ''}`}>
                <div className={style.featurelists}>
                    <h3>Features</h3>
                    <h3>Solutions</h3>
                    <h3>Pricing</h3>
                    <h3>Resources</h3>
                    <h3>Contact</h3>
                </div>
                
                <div className={style.registerOption}>
                   <Link to="/login"> <button>Log in</button></Link>
                    <button>Sign up</button>
                </div>
            </div>
        </nav>
    );
}