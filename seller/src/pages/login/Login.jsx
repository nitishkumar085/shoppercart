import React, { useState } from 'react';
import styles from './login.module.css';
import {Link} from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password, rememberMe });
  };

  return (
    <main className={styles.loginContainer}>
      {/* Icon Header */}
      <div className={styles.brandIconWrapper}>
        <div className={styles.brandIcon}>
          <i className="fa-solid fa-bag-shopping"></i>
        </div>
      </div>

      {/* Headings */}
      <h1 className={styles.loginTitle}>Login to your Account</h1>
      <p className={styles.loginSubtitle}>Enter your credentials to continue</p>

      {/* Form */}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <div className={styles.inputWrapper}>
            <i className={`fa-regular fa-envelope ${styles.inputIcon}`}></i>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputWrapper}>
            <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i 
              className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.togglePassword}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>

        {/* Remember & Forgot Password */}
        <div className={styles.formOptions}>
          <label className={styles.rememberMe}>
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className={styles.checkboxCustom}></span>
            Remember me
          </label>
          <a href="#forgot" className={styles.forgotLink}>Forgot Password?</a>
        </div>

        {/* Login Button */}
        <button type="submit" className={styles.btnSubmit}>
          <i className="fa-solid fa-lock"></i> Login
        </button>
      </form>

      {/* Divider */}
      <div className={styles.divider}>
        <span>or continue with</span>
      </div>

      {/* Social Logins */}
      <div className={styles.socialLoginGroup}>
        <button className={styles.btnSocial} type="button">
          <svg className={styles.socialSvg} viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Continue with Google
        </button>
        <button className={styles.btnSocial} type="button">
          <i className={`fa-brands fa-apple ${styles.socialAppleIcon}`}></i>
          Continue with Apple
        </button>
      </div>

      {/* Footer Sign Up Link */}
      <p className={styles.signupPrompt}>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </main>
  );
}