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
              <li><a href="/products">Sản phẩm</a></li>
              <li><a href="/charging">Trạm sạc</a></li>
              <li><a href="/promotions">Ưu đãi</a></li>
              <li><a href="/policy">Chính sách</a></li>
            </ul>

            <ul className={styles.box1}>
              <p><b>VinFast Auto Ltd.</b></p>
              <p><b>Địa chỉ: </b> <a href="https://www.google.com/maps/place/Vinfast+B%C3%ACnh+Th%E1%BA%A1nh/@10.7950602,106.7191526,17z/data=!3m1!4b1!4m6!3m5!1s0x317529004b288b51:0xa650ac3f32ab3445!8m2!3d10.7950602!4d106.7217275!16s%2Fg%2F11vr1yrwqg?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D">
                  Nguyễn Hữu Cảnh, Vinhomes Tân Cảng, Bình Thạnh, Thành phố Hồ Chí Minh</a></p>
              <p><b>Điện thoại: </b><a href='tel:1900 23 23 89'>1900 23 23 89</a></p>
            </ul>
          </div>
        </div>

        <div className={styles["bottom-details"]}>
          <div className={styles.bottom_text}>
            <span className={styles.copyright_text}>
              © 2024 VinFast Station.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
