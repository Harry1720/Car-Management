import styles from '../assets/css/components/Navbar.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

const Navbar = ({ activePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Fetch user details for greeting badge
    if (authService.isAuthenticated()) {
      authService.getCurrentUser()
        .then(data => setUser(data))
        .catch(console.error);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div 
        className={`${styles.backdrop} ${isMobileMenuOpen ? styles['backdrop-active'] : ''}`}
        onClick={closeMobileMenu}
      ></div>
      <nav className={`${styles["nav-container"]} ${isScrolled ? styles.scrolled : ''}`}>
      <Link to="/" onClick={closeMobileMenu}>
        <img className={styles.logo} src="/images/vinlogo.png" alt="VinFast Logo" />
      </Link>

      <div 
        className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={isMobileMenuOpen ? styles['mobile-menu-open'] : ''}>
        <li>
          <Link
            to="/"
            className={activePage === 'home' ? styles.active : ''}
            onClick={closeMobileMenu}
          >
            Trang chủ
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={activePage === 'products' ? styles.active : ''}
            onClick={closeMobileMenu}
          >
            Sản phẩm
          </Link>
        </li>
        <li>
          <Link
            to="/promotions"
            className={activePage === 'promotions' ? styles.active : ''}
            onClick={closeMobileMenu}
          >
            Ưu đãi
          </Link>
        </li>
        <li>
          <Link
            to="/charging"
            className={activePage === 'charging' ? styles.active : ''}
            onClick={closeMobileMenu}
          >
            Trạm sạc
          </Link>
        </li>
        <li>
          <Link
            to="/policy"
            className={activePage === 'policy' ? styles.active : ''}
            onClick={closeMobileMenu}
          >
            Chính sách
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={activePage === 'about' ? styles.active : ''}
            onClick={closeMobileMenu}
          >
            Về chúng tôi
          </Link>
        </li>
        <li className={`${styles['mobile-only']} ${styles.divider}`}></li>
        {!authService.isAuthenticated() ? (
          <>
            <li className={styles['mobile-only']}>
              <Link
                to="/login"
                className={activePage === 'login' ? styles.active : ''}
                onClick={closeMobileMenu}
              >
               Đăng nhập
              </Link>
            </li>
            <li className={styles['mobile-only']}>
              <Link
                to="/login"
                state={{ isRegister: true }}
                className={activePage === 'register' ? styles.active : ''}
                onClick={closeMobileMenu}
              >
               Đăng ký
              </Link>
            </li>
          </>
        ) : (
          <li className={styles['mobile-only']}>
            <Link
              to="/profile"
              className={activePage === 'profile' ? styles.active : ''}
              onClick={closeMobileMenu}
            >
             Trang cá nhân
            </Link>
          </li>
        )}
      </ul>

      <div className={`${styles.icons} ${styles['desktop-only']}`}>
        {authService.isAuthenticated() && (
          <Link to="/profile" className={styles.greetingBadge} onClick={closeMobileMenu}>
            CHÀO, {user?.name ? user.name.toUpperCase() : ""}
          </Link>
        )}
        <Link to={authService.isAuthenticated() ? "/profile" : "/login"} className={styles.navProfileLink} onClick={closeMobileMenu}>
          <i className="bx bx-user-circle"></i>
        </Link>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
