import React, { useState } from 'react';
import styles from './dashboard.module.css';
import { 
  FiHome, FiBox, FiShoppingCart, FiUsers, 
  FiRadio, FiBarChart2, FiCreditCard, FiSettings, 
  FiLogOut, FiSearch, FiBell, FiMail, FiChevronDown 
} from 'react-icons/fi';

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { name: 'Home', icon: <FiHome /> },
    { name: 'Inventory', icon: <FiBox /> },
    { name: 'Orders', icon: <FiShoppingCart /> },
    { name: 'Customers', icon: <FiUsers /> },
    { name: 'Marketing', icon: <FiRadio /> },
    { name: 'Analytics', icon: <FiBarChart2 /> },
    { name: 'Payments', icon: <FiCreditCard /> },
    { name: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        {/* <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <FiShoppingCart size={20} />
          </div>
          <div>
            <h1 className={styles.brandName}>Shopper cart</h1>
            <p className={styles.brandSub}>Seller Panel</p>
          </div>
        </div> */}

        <nav className={styles.navigation}>
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`${styles.navItem} ${activeTab === item.name ? styles.activeNav : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navText}>{item.name}</span>
            </button>
          ))}
        </nav>

        <button className={styles.logoutBtn}>
          <FiLogOut /> <span className={styles.navText}>Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className={styles.mainWrapper}>
        {/* TOP HEADER */}
        <header className={styles.header}>
          <div className={styles.welcomeText}>
            <h2>Welcome back, Seller!</h2>
            <p>Here's what's happening with your store today.</p>
          </div>

          <div className={styles.headerActions}>
            <button className={styles.actionIconBtn} aria-label="Search">
              <FiSearch size={20} />
            </button>
            
            <button className={styles.actionIconBtn} aria-label="Notifications">
              <FiBell size={20} />
              <span className={`${styles.badge} ${styles.badgeBell}`}>5</span>
            </button>

            <button className={styles.actionIconBtn} aria-label="Messages">
              <FiMail size={20} />
              <span className={`${styles.badge} ${styles.badgeMail}`}>2</span>
            </button>

            {/* Profile Dropdown */}
            <div className={styles.profileContainer}>
              <button 
                className={styles.profileDropdownTrigger}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
                  alt="Avatar" 
                  className={styles.avatar} 
                />
                <span className={styles.profileName}>My Store</span>
                <FiChevronDown size={14} className={`${styles.arrow} ${isProfileOpen ? styles.arrowRotate : ''}`} />
              </button>

              {isProfileOpen && (
                <div className={styles.dropdownMenu}>
                  <a href="#mystore" className={styles.dropdownItem}>
                    <FiShoppingCart size={14} /> My Store
                  </a>
                  <a href="#plan" className={styles.dropdownItem}>
                    <FiBox size={14} /> Plan Info
                  </a>
                  <hr className={styles.divider} />
                  <a href="#logout" className={styles.dropdownItem}>
                    <FiLogOut size={14} /> Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* VIEWPORT CONTENT */}
        <main className={styles.contentBody}>
          <div className={styles.cardPlaceholder}>
            {/* Inject your specific screen sub-modules/components here based on activeTab */}
            <h3>{activeTab} Content View</h3>
            <p>Ready for your data widgets...</p>
          </div>
        </main>

        {/* FOOTER BRANDING */}
        <footer className={styles.footerBranding}>
          <FiShoppingCart size={14} /> <span>ShopEase</span>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;