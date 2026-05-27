import "../../assets/css/user_pages/Product.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import Slideshow from "../../components/Slideshow";
import { carService } from "../../services/carService";

const formatVnd = (value) => {
  const amount = Number(value || 0);
  return `${new Intl.NumberFormat("vi-VN").format(amount)} VNĐ`;
};

const electricSpecs = [
  {
    matches: ["VF3"],
    batteryKwh: "18.6",
    rangeKm: "210",
    acceleration: "9.0 giây",
  },
  {
    matches: ["VF5"],
    batteryKwh: "37.23",
    rangeKm: "300",
    acceleration: "10.9 giây",
  },
  {
    matches: ["VF6"],
    batteryKwh: "59.6",
    rangeKm: "399",
    acceleration: "8.9 giây",
  },
  {
    matches: ["VF7"],
    batteryKwh: "75.3",
    rangeKm: "450",
    acceleration: "5.8 giây",
  },
  {
    matches: ["VF8"],
    batteryKwh: "87.7",
    rangeKm: "470",
    acceleration: "5.5 giây",
  },
  {
    matches: ["VF9"],
    batteryKwh: "123",
    rangeKm: "600",
    acceleration: "5.0 giây",
  },
];

const getElectricSpecs = (car) => {
  const lookupKey = `${car.model || ""} ${car.name || ""}`.toUpperCase();
  return (
    electricSpecs.find((spec) =>
      spec.matches.some((match) => lookupKey.includes(match)),
    ) || {
      batteryKwh: "Đang cập nhật",
      rangeKm: "Đang cập nhật",
      acceleration: "Đang cập nhật",
    }
  );
};

const modelOptions = ["Chưa chọn được", "VF Wild", "VF 9", "VF 8", "VF 7"];

const Products = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    phone: "",
    model: "VF 8",
  });

  // Display logic
  const INITIAL_DISPLAY = 9; // 3 rows x 3 cols on desktop
  const LOAD_MORE_COUNT = 6; // load 6 more on each "Xem thêm"
  const [displayedCount, setDisplayedCount] = useState(INITIAL_DISPLAY);
  const [prevDisplayedCount, setPrevDisplayedCount] = useState(0);

  useEffect(() => {
    document.title = "Sản phẩm | VinFast";
    fetchCars();
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

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await carService.getAllCars(1, 100); // Lấy 100 xe
      const carsArray = Array.isArray(data) ? data : data?.cars || [];
      const carsData = carsArray.map((car) => {
        const fallbackSpecs = getElectricSpecs(car);
        const carSpecs = car.specifications || {};
        return {
          _id: car._id,
          name: car.name,
          model: car.model,
          image:
            car.images && car.images.length > 0
              ? car.images[0]
              : "/images/car-pics/vf3/vf3yl.png",
          origin: car.origin_of_car || "Việt Nam",
          year: car.year || 2024,
          batteryKwh: carSpecs.batteryCapacity || fallbackSpecs.batteryKwh,
          rangeKm: carSpecs.range || fallbackSpecs.rangeKm,
          acceleration: carSpecs.acceleration || fallbackSpecs.acceleration,
          priceLabel: formatVnd(car.price),
          link: `../deposit?model=${(car.model || "").toLowerCase()}`,
        };
      });
      setCars(carsData);
      // initialize displayed count based on fetched length
      setDisplayedCount(Math.min(INITIAL_DISPLAY, carsData.length));
      setError("");
    } catch (err) {
      setError("Không thể tải danh sách xe. Vui lòng thử lại.");
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderCars = () => {
    const carsToShow = cars.slice(0, displayedCount);

    return carsToShow.map((car, index) => {
      // determine if this item is newly loaded to apply animation
      const isNew = index >= prevDisplayedCount && index < displayedCount;
      const animationDelay = isNew
        ? `${(index - prevDisplayedCount) * 80}ms`
        : undefined;

      return (
        <div
          className={`car-card ${isNew ? "new-item" : ""}`}
          style={animationDelay ? { animationDelay } : undefined}
        >
          <div className="car-image">
            <img src={car.image} alt={car.name} />
          </div>
          <div className="car-info">
            <h3>{car.name}</h3>
            <ul className="car-details">
              {/* <li>
                <i className="fas fa-globe"></i>
                <span className="car-detail-label">Xuất xứ</span>
                <span className="car-detail-value">{car.origin}</span>
              </li> */}
              <li>
                <i className="fas fa-calendar"></i>
                <span className="car-detail-label">Năm sản xuất</span>
                <span className="car-detail-value">{car.year}</span>
              </li>
              <li>
                <i className="fas fa-battery-three-quarters"></i>
                <span className="car-detail-label">Dung lượng pin</span>
                <span className="car-detail-value">{car.batteryKwh} kWh</span>
              </li>
              <li>
                <i className="fas fa-bolt"></i>
                <span className="car-detail-label">Quãng đường</span>
                <span className="car-detail-value">{car.rangeKm} km</span>
              </li>
              {/* <li>
                <i className="fas fa-rocket"></i>
                <span className="car-detail-label">Tăng tốc 0-100km/h</span>
                <span className="car-detail-value">{car.acceleration}</span>
              </li> */}
            </ul>
            <div className="car-price">Từ {car.priceLabel}</div>
          </div>
          <button
            className="car-button"
            onClick={() => (window.location.href = car.link)}
          >
            Khám phá ngay →
          </button>
        </div>
      );
    });
  };

  const handleLoadMore = () => {
    setPrevDisplayedCount(displayedCount);
    setDisplayedCount((prev) => Math.min(prev + LOAD_MORE_COUNT, cars.length));
  };

  return (
    <div className="product_page">
      <Navbar activePage="products" />
      <Slideshow />
      <div className="product_page__container">
        <h1 className="text-center page-title">Dòng xe ô tô điện VinFast</h1>
        <p className="text-center product_page__page-desc">
          Khám phá các mẫu xe điện thông minh, hiện đại và thân thiện với môi
          trường từ VinFast – Lựa chọn tối ưu cho tương lai di chuyển xanh.
        </p>

        {loading && <p className="text-center">Đang tải danh sách xe...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
          <>
            <div className="cars-grid-container">{renderCars()}</div>
            {displayedCount < cars.length && (
              <div className="load-more-container">
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Xem thêm ↓
                </button>
              </div>
            )}
          </>
        )}

        <section className="product_page__lead_section">
          <div className="product_page__lead_copy">
            <h2>Đăng ký lái thử &amp; Nhận tư vấn</h2>
            <p>
              Đội ngũ chuyên gia của VinFast luôn sẵn sàng hỗ trợ bạn chọn ra
              mẫu xe ưng ý và các ưu đãi tốt nhất trong tháng.
            </p>
          </div>
          <form className="product_page__lead_form" onSubmit={handleLeadSubmit}>
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
            <button className="product_page__button_primary" type="submit">
              Nhận tư vấn ngay
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
