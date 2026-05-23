import { useEffect, useState } from "react";
import styles from "../../assets/css/user_pages/Home.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const uspItems = [
  {
    icon: "fas fa-shield-alt",
    title: "Bảo hành 10 năm",
    description:
      "An tâm sử dụng dài lâu với chính sách hậu mãi nổi bật trong phân khúc xe điện.",
  },
  {
    icon: "fas fa-charging-station",
    title: "Trạm sạc toàn quốc",
    description:
      "Mạng lưới sạc phủ rộng giúp hành trình liên tỉnh thuận tiện và thực tế hơn.",
  },
  {
    icon: "fas fa-robot",
    title: "Trợ lý ảo thông minh",
    description:
      "Điều khiển tiện nghi, tìm đường, hỗ trợ giọng nói và cá nhân hoá trải nghiệm lái.",
  },
  {
    icon: "fas fa-map-marked-alt",
    title: "Hệ sinh thái đồng bộ",
    description:
      "Từ sạc, bảo dưỡng đến tư vấn mua xe đều được gom trong một trải nghiệm liền mạch.",
  },
];

const featuredCars = [
  {
    model: "VF Wild",
    badge: "Lifestyle pickup concept",
    description:
      "Thiết kế cá tính, không gian rộng và tinh thần đa dụng cho khách hàng thích khác biệt.",
    range: "Lên đến 550 km/lần sạc",
    acceleration: "0-100 km/h: 7.2 giây",
    image: "/images/vf_wild.png",
    cta: "/deposit?model=vfwild",
  },
  {
    model: "VF 9",
    badge: "SUV cỡ lớn",
    description:
      "Khoang nội thất sang trọng, phù hợp gia đình và những chuyến đi dài đầy đủ tiện nghi.",
    range: "Lên đến 680 km/lần sạc",
    acceleration: "0-100 km/h: 6.5 giây",
    image: "/images/vf9_silver.png",
    cta: "/deposit?model=vf9",
  },
  {
    model: "VF 8",
    badge: "SUV đô thị cao cấp",
    description:
      "Tối ưu cho khách hàng muốn cân bằng giữa công nghệ, hiệu năng và sự sang trọng.",
    range: "Lên đến 471 km/lần sạc",
    acceleration: "0-100 km/h: 5.5 giây",
    image: "/images/vf8.png",
    cta: "/deposit?model=vf8",
  },
  {
    model: "VF 7",
    badge: "Crossover linh hoạt",
    description:
      "Thiết kế trẻ trung, lái dễ dàng, rất hợp nhu cầu di chuyển hằng ngày trong thành phố.",
    range: "Lên đến 431 km/lần sạc",
    acceleration: "0-100 km/h: 6.8 giây",
    image: "/images/vf7.png",
    cta: "/deposit?model=vf7",
  },
];

const modelOptions = ["Chưa chọn được", "VF Wild", "VF 9", "VF 8", "VF 7"];

const Home = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    phone: "",
    model: "VF Wild",
  });

  useEffect(() => {
    document.title = "Trang chủ | VinFast";
  }, []);

  const handleLeadChange = (event) => {
    const { name, value } = event.target;

    setLeadForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleLeadSubmit = (event) => {
    event.preventDefault();
    window.alert("Thông tin đã được ghi nhận. Đội ngũ tư vấn sẽ liên hệ sớm.");
    setLeadForm({ fullName: "", phone: "", model: "VF 8" });
  };

  // Cấu hình khi nhấn vào nút "Khám phá dòng xe" nó scroll mượt xuống chỗ neo
  const handleSmoothScroll = (event) => {
    event.preventDefault();
    document
      .getElementById("featured-models")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.home_page}>
      <Navbar activePage="home" />

      <div className={styles.home_page__hero_section}>
        <img
          className={styles.home_page__hero_section__banner}
          src="/images/hero-banner.png"
          alt="VinFast hero banner"
        />
        <div className={styles.home_page__hero_section__overlay}>
          <div className={styles.home_page__hero_section__title}>
            Ô TÔ ĐIỆN VINFAST
          </div>
          <div className={styles.home_page__hero_section__subtitle}>
            Khai phá kỷ nguyên di chuyển điện - Hướng tới tương lai không khói
            bụi
          </div>
          <div className={styles.home_page__hero_section__actions}>
            <button
              className={styles.home_page__button_primary}
              type="button"
              onClick={handleSmoothScroll}
            >
              Khám phá dòng xe
            </button>
            {/* <button className={styles.home_page__button_secondary} type="button" onClick={() => setIsVideoModalOpen(true)}>
              Xem video trải nghiệm
            </button> */}
          </div>
        </div>
      </div>

      <section className={styles.home_page__section}>
        <div className={styles.home_page__section_heading}>
          <h2>Vì sao khách hàng chọn VinFast?</h2>
          <p>
            Những yếu tố cốt lõi giúp khách hàng yên tâm khi sử dụng xe điện của
            Vinfast.
          </p>
        </div>
        <div className={styles.home_page__usp_grid}>
          {uspItems.map((item) => (
            <article key={item.title} className={styles.home_page__usp_card}>
              <div className={styles.home_page__usp_icon}>
                <i className={item.icon} aria-hidden="true"></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.home_page__section} id="featured-models">
        <div className={styles.home_page__section_heading}>
          <h2>Chọn mẫu xe phù hợp với nhu cầu thực tế</h2>
          <p>Khám phá một số mẫu xe ô tô nổi bật của Vinfast.</p>
        </div>
        <div className={styles.home_page__featured_list}>
          {featuredCars.map((car, index) => (
            <article
              key={car.model}
              className={`${styles.home_page__featured_item} ${index % 2 === 1 ? styles["home_page__featured_item--reverse"] : ""}`}
            >
              <div className={styles.home_page__featured_copy}>
                <span className={styles.home_page__featured_badge}>
                  {car.badge}
                </span>
                <h3>{car.model}</h3>
                <p>{car.description}</p>
                <div className={styles.home_page__specs}>
                  <div>
                    <span>Quãng đường/lần sạc</span>
                    <strong>{car.range}</strong>
                  </div>
                  <div>
                    <span>0-100 km/h</span>
                    <strong>{car.acceleration}</strong>
                  </div>
                </div>
                <a className={styles.home_page__button_primary} href={car.cta}>
                  Mua ngay
                </a>
              </div>
              <div className={styles.home_page__featured_visual}>
                <img src={car.image} alt={car.model} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.home_page__section}>
        <div className={styles.home_page__section_heading}>
          <h2>Trạm sạc là một phần của trải nghiệm sở hữu xe</h2>
          <p>
            Xóa bỏ mọi nỗi lo về quãng đường với mạng lưới trạm sạc phủ sóng
            toàn quốc.
          </p>
        </div>
        <div className={styles.home_page__ecosystem_card}>
          <div className={styles.home_page__ecosystem_visual}>
            <img
              src="/images/tramsac/pin-tramsac-1.png"
              alt="Sơ đồ trạm sạc VinFast"
            />
          </div>
          <div className={styles.home_page__ecosystem_copy}>
            {/* <span className={styles.home_page__featured_badge}>Hệ thống trạm sạc</span> */}
            <h3>Phủ trạm rộng, hỗ trợ chủ xe mọi hành trình</h3>
            <p>
              Từ trung tâm thành phố đến các tuyến đường liên tỉnh, chủ xe luôn
              có thể tra cứu trạm sạc gần nhất, chủ động thời gian dừng nghỉ và
              tối ưu quãng đường di chuyển.
            </p>
            <ul>
              <li>Mạng lưới trạm sạc phủ rộng trên toàn quốc.</li>
              <li>
                Điểm sạc đặt tại trung tâm thương mại, bãi đỗ xe và khu dân cư.
              </li>
              <li>Hệ sinh thái đi kèm app, bản đồ và hỗ trợ tìm trạm nhanh.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.home_page__section}>
        <div className={styles.home_page__section_heading}>
          <h2>Khám phá tương lai di chuyển xanh</h2>
          <p>
            Cùng xem những thước phim chân thực nhất về hệ sinh thái xe điện
            toàn diện và đẳng cấp.
          </p>
        </div>
        <button
          className={styles.home_page__video_teaser}
          type="button"
          onClick={() => setIsVideoModalOpen(true)}
        >
          <img
            src="/images/video_cover.png"
            alt="Xem video trải nghiệm VinFast"
          />
          <span className={styles.home_page__video_play} aria-hidden="true">
            <i className="fas fa-play"></i>
          </span>
        </button>
      </section>

      <section className={styles.home_page__lead_section}>
        <div className={styles.home_page__lead_copy}>
          <h2>Đăng ký lái thử & Nhận tư vấn</h2>
          <p>
            Đội ngũ chuyên gia của VinFast luôn sẵn sàng hỗ trợ bạn chọn ra mẫu
            xe ưng ý và các ưu đãi tốt nhất trong tháng.
          </p>
        </div>
        <form
          className={styles.home_page__lead_form}
          onSubmit={handleLeadSubmit}
        >
          <label>
            <span>Họ và tên</span>
            <input
              type="text"
              name="fullName"
              placeholder="Nhập họ và tên"
              value={leadForm.fullName}
              onChange={handleLeadChange}
              required
            />
          </label>
          <label>
            <span>Số điện thoại</span>
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={leadForm.phone}
              onChange={handleLeadChange}
              required
            />
          </label>
          <label>
            <span>Dòng xe quan tâm</span>
            <select
              name="model"
              value={leadForm.model}
              onChange={handleLeadChange}
            >
              {modelOptions.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>
          <button className={styles.home_page__button_primary} type="submit">
            Nhận tư vấn ngay
          </button>
        </form>
      </section>

      <Footer />

      {isVideoModalOpen && (
        <div
          className={styles.home_page__video_modal}
          role="dialog"
          aria-modal="true"
          aria-label="Video VinFast"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className={styles.home_page__video_modal_content}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.home_page__video_modal_close}
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Đóng video"
            >
              &times;
            </button>
            <div className={styles.home_page__video_frame_wrap}>
              <iframe
                src="./videos/vinfastouttro.mp4"
                title="VinFast video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
