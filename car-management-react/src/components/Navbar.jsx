import styles from '../assets/css/components/Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = ({ activePage }) => {
  return (
    <nav className={styles["nav-container"]}>
      <Link to="/">
        <img className={styles.logo} src="/images/vinlogo.png" alt="VinFast Logo" />
      </Link>

      <ul>
        <li>
          <Link
            to="/about"
            className={activePage === 'about' ? styles.active : ''}
          >
            Về chúng tôi
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={activePage === 'products' ? styles.active : ''}
          >
            Sản phẩm
          </Link>
        </li>
        <li>
          <Link
            to="/charging"
            className={activePage === 'charging' ? styles.active : ''}
          >
            Trạm sạc
          </Link>
        </li>
        <li>
          <Link
            to="/promotions"
            className={activePage === 'promotions' ? styles.active : ''}
          >
            Ưu đãi
          </Link>
        </li>
        <li>
          <Link
            to="/policy"
            className={activePage === 'policy' ? styles.active : ''}
          >
            Chính sách
          </Link>
        </li>
      </ul>

      <div className={styles.icons}>
        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="bx bx-user-circle"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
