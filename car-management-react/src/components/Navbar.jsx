import styles from '../assets/css/components/Navbar.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ activePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles["nav-container"]}>
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
            to="/about"
            className={activePage === 'about' ? styles.active : ''}
            onClick={closeMobileMenu}
          >
            Về chúng tôi
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
            to="/charging"
            className={activePage === 'charging' ? styles.active : ''}
            onClick={closeMobileMenu}
          >
            Trạm sạc
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
            to="/policy"
            className={activePage === 'policy' ? styles.active : ''}
            onClick={closeMobileMenu}
          >
            Chính sách
          </Link>
        </li>
        <li className={styles['mobile-only']}>
          <Link
            to="/login"
            onClick={closeMobileMenu}
          >
            <i className="bx bx-user-circle" style={{marginRight: '8px'}}></i>
           Đăng nhập
          </Link>
        </li>
      </ul>

      <div className={`${styles.icons} ${styles['desktop-only']}`}>
        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }} onClick={closeMobileMenu}>
          <i className="bx bx-user-circle"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
