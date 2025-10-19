import styles from '../assets/css/components/Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer>
        <div className={styles.content}>           
          <div className={styles.top}>
            <Link className={styles["logo-details"]} to="/">
              <img className={styles.logo} src="/images/vinlogo.png" alt="VinFast Logo" />
            </Link>
            <div className={styles["media-icons"]}>
              <a href="https://www.facebook.com/VinFastAuto.Official"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.linkedin.com/company/vinfast/"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div className={styles["link-boxes"]}>
            <ul className={styles.box}>
              <li><a href="/">Trang chủ</a></li>
              <li><a href="#">Sản phẩm</a></li>
              <li><a href="/charging">Trạm sạc</a></li>
              <li><a href="/promotions">Ưu đãi</a></li>
              <li><a href="#">Chính sách</a></li>
            </ul>

            <ul className={styles.box1}>
              <p>VinFast Auto Ltd.</p>
              <p>Địa chỉ: Vinhomes Central Park, quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam</p>
              <p>Số điện thoại: 1900 23 23 89</p>
            </ul>
          </div>
        </div>

        <div className={styles["bottom-details"]}>
          <div className={styles.bottom_text}>
            <span className={styles.copyright_text}>
              Copyright © 2023 VinFast All rights reserved
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
