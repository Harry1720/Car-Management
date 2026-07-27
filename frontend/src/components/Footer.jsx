import styles from "../assets/css/components/Footer.module.css";
import { Link } from "react-router-dom";
                                                        
const quickLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Sản phẩm", to: "/products" },
  { label: "Ưu đãi", to: "/promotions" },
  { label: "Trạm sạc", to: "/charging" },
  { label: "Chính sách", to: "/policy" },
  { label: "Về chúng tôi", to: "/about" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brandColumn}>
          <Link className={styles.logoDetails} to="/">
            <img
              className={styles.logo}
              src="/images/vinlogo.png"
              alt="VinFast Logo"
            />
          </Link>
          <p className={styles.brandText}>
            Khởi tạo tương lai di chuyển xanh.
          </p>
          <div className={styles.socialIcons}>
            <a
              href="https://www.facebook.com/VinFastAuto.Official"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://www.linkedin.com/company/vinfast/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>

        <nav className={styles.quickLinks} aria-label="Liên kết nhanh">
          <h3 className={styles.columnTitle}>Khám phá</h3>
          <ul className={styles.linkList}>
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contactColumn}>
          <h3 className={styles.columnTitle}>Thông tin liên hệ</h3>
          <ul className={styles.contactList}>
            <li>
              <i className="fas fa-location-dot" aria-hidden="true" />
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.google.com/maps/place/Vinfast+B%C3%ACnh+Th%E1%BA%A1nh/@10.7950602,106.7191526,17z/data=!3m1!4b1!4m6!3m5!1s0x317529004b288b51:0xa650ac3f32ab3445!8m2!3d10.7950602!4d106.7217275!16s%2Fg%2F11vr1yrwqg?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
              >
                Nguyễn Hữu Cảnh, Vinhomes Tân Cảng, Bình Thạnh, TP. Hồ Chí Minh
              </a>
            </li>
            <li>
              <i className="fas fa-phone" aria-hidden="true" />
              <a href="tel:1900232389">1900 23 23 89</a>
            </li>
            <li>
              <i className="fas fa-envelope" aria-hidden="true" />
              <a href="mailto:vinfasthapi@vf.com">vinfasthapi@vf.com</a>
            </li>
          </ul>
        </div>

        <div className={styles.mapColumn}>
          <h3 className={styles.columnTitle}>Google Maps</h3>
          <div className={styles.mapContainer}>
            <iframe
              title="VinFast Binh Thanh map"
              src="https://www.google.com/maps?q=VinHomes%20T%C3%A2n%20C%E1%BA%A3ng%20B%C3%ACnh%20Th%E1%BA%A1nh&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className={styles.bottomDetails}>
        <div className={styles.bottomText}>
          <span className={styles.copyrightText}>
            © 2026 VinFast Hapi Hapi. <br /> Đây là trang web phục vụ học tập,
            không nhằm mục đích thương mại.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
