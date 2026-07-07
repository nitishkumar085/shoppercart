import styles from "./signup.module.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaTag,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

const Signup = () => {
  return (
    <div className={styles.container}>
      {/* Left Side */}

      <div className={styles.left}>
        <h1>
          Shop more.
          <br />
          <span>Worry less.</span>
        </h1>

        <p>
          Create your account and enjoy the best shopping experience.
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.icon}>
              <FaTag />
            </div>

            <div>
              <h4>Exclusive Offers</h4>
              <p>Get access to member only deals and discounts.</p>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FaTruck />
            </div>

            <div>
              <h4>Fast Delivery</h4>
              <p>Enjoy fast and reliable delivery at your doorstep.</p>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.icon}>
              <FaShieldAlt />
            </div>

            <div>
              <h4>Secure Shopping</h4>
              <p>Your data and payments are 100% safe with us.</p>
            </div>
          </div>
        </div>

        <div className={styles.products}>
          <img src="/images/bag.png" alt="" className={styles.bag} />
          <img src="/images/shoe.png" alt="" className={styles.shoe} />
          <img src="/images/glasses.png" alt="" className={styles.glasses} />
          <img src="/images/plant.png" alt="" className={styles.plant} />
        </div>
      </div>

      {/* Right Side */}

      <div className={styles.right}>
        <h2>Create your account</h2>
        <p>Join ShopEase and start shopping now!</p>

        <form>
          <label>Full Name</label>

          <div className={styles.inputBox}>
            <FaUser />
            <input type="text" placeholder="Enter your full name" />
          </div>

          <label>Email Address</label>

          <div className={styles.inputBox}>
            <FaEnvelope />
            <input type="email" placeholder="Enter your email address" />
          </div>

          <label>Password</label>

          <div className={styles.inputBox}>
            <FaLock />
            <input type="password" placeholder="Create a password" />
            <FaEye />
          </div>

          <label>Confirm Password</label>

          <div className={styles.inputBox}>
            <FaLock />
            <input type="password" placeholder="Confirm your password" />
            <FaEye />
          </div>

          <div className={styles.checkbox}>
            <input type="checkbox" />

            <span>
              I agree to the <a href="/">Terms & Conditions</a> and{" "}
              <a href="/">Privacy Policy</a>
            </span>
          </div>

          <button className={styles.signupBtn}>Sign Up</button>

          <div className={styles.divider}>
            <span></span>
            <p>or sign up with</p>
            <span></span>
          </div>

          <div className={styles.social}>
            <button type="button">Google</button>
            <button type="button">Facebook</button>
            <button type="button">Apple</button>
          </div>

          <p className={styles.footer}>
            By creating an account, you agree to our
            <a href="/"> Terms & Conditions </a>
            and
            <a href="/"> Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;