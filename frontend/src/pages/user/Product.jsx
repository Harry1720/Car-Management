import "../../assets/css/user_pages/Product.css";
import { toast } from 'react-toastify';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState, useMemo, useRef } from "react";
import Slideshow from "../../components/Slideshow";
import { carService } from "../../services/carService";
import { authService } from "../../services/authService";
import { consultationService } from "../../services/consultationService";

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
  const [interestedCars, setInterestedCars] = useState([]);
  const [togglingCars, setTogglingCars] = useState({});

  // Display logic
  const INITIAL_DISPLAY = 9; // 3 rows x 3 cols on desktop
  const LOAD_MORE_COUNT = 6; // load 6 more on each "Xem thêm"
  const [displayedCount, setDisplayedCount] = useState(INITIAL_DISPLAY);
  const [prevDisplayedCount, setPrevDisplayedCount] = useState(0);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const [priceFilter, setPriceFilter] = useState("all");
  const [seatsFilter, setSeatsFilter] = useState("all");
  const [rangeFilter, setRangeFilter] = useState("all");
  const [originFilter, setOriginFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUserInterest = async () => {
    if (authService.isAuthenticated()) {
      try {
        const user = await authService.getCurrentUser();
        if (user && user.carsInterested) {
          const ids = user.carsInterested.map(c => c._id || c);
          setInterestedCars(ids);
        }
      } catch (err) {
        console.error("Lỗi tải danh sách yêu thích", err);
      }
    }
  };

  useEffect(() => {
    document.title = "Sản phẩm | VinFast";
    fetchCars();
    fetchUserInterest();
  }, []);

  const handleToggleInterest = async (e, carId) => {
    e.stopPropagation();
    
    if (!authService.isAuthenticated()) {
      toast.info("Vui lòng đăng nhập để lưu xe vào danh sách yêu thích");
      window.location.href = "/login";
      return;
    }

    const role = localStorage.getItem('role');
    if (role === 'admin' || role === 'employee') {
      toast.warning('Chỉ khách hàng mới có thể theo dõi xe!');
      return;
    }

    try {
      setTogglingCars(prev => ({ ...prev, [carId]: true }));
      
      // Optimistic update
      const wasInterested = interestedCars.includes(carId);
      setInterestedCars(prev => 
        wasInterested ? prev.filter(id => id !== carId) : [...prev, carId]
      );

      const res = await authService.toggleCarInterest(carId);
      setInterestedCars(res.carsInterested.map(c => c._id || c));
    } catch (err) {
      toast.error(err.message || "Lỗi khi thả tim");
      fetchUserInterest(); 
    } finally {
      setTogglingCars(prev => ({ ...prev, [carId]: false }));
    }
  };

  const handleLeadChange = (event) => {
    const { name, value } = event.target;

    setLeadForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    try {
      await consultationService.createConsultation({
        fullName: leadForm.fullName,
        phone: leadForm.phone,
        carModel: leadForm.model,
        requestType: 'test_drive'
      });
      toast.success("Thông tin đã được ghi nhận. Đội ngũ tư vấn sẽ liên hệ sớm.");
      setLeadForm({ fullName: "", phone: "", model: "VF 8" });
    } catch (error) {
      toast.error(error.message || "Lỗi khi gửi yêu cầu tư vấn");
    }
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
          category: car.category,
          image:
            car.variants && car.variants.length > 0 && car.variants[0].image
              ? car.variants[0].image
              : "/images/car-pics/vf3/vf3yl.png",
          origin: car.origin_of_car || "Việt Nam",
          year: car.year || 2024,
          batteryKwh: carSpecs.batteryCapacity || fallbackSpecs.batteryKwh,
          rangeKm: carSpecs.range || fallbackSpecs.rangeKm,
          seats: carSpecs.seats || 5,
          rawPrice: car.price || 0,
          acceleration: carSpecs.acceleration || fallbackSpecs.acceleration,
          motorPower: carSpecs.motorPower || 'N/A',
          energyConsumption: carSpecs.energyConsumption || 'N/A',
          priceLabel: formatVnd(car.price),
          link: `/landing/${(car.model || "").toLowerCase()}`,
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

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      // Search Query
      if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      // Price Filter
      if (priceFilter === "under_500" && car.rawPrice >= 500000000) return false;
      if (priceFilter === "500_to_1b" && (car.rawPrice < 500000000 || car.rawPrice > 1000000000)) return false;
      if (priceFilter === "over_1b" && car.rawPrice <= 1000000000) return false;

      // Seats Filter
      if (seatsFilter && seatsFilter !== "all") {
        if (car.seats !== Number(seatsFilter)) return false;
      }

      // Range Filter
      const r = Number(car.rangeKm);
      if (rangeFilter === "under_300" && (isNaN(r) || r >= 300)) return false;
      if (rangeFilter === "300_to_400" && (isNaN(r) || r < 300 || r > 400)) return false;
      if (rangeFilter === "over_400" && (isNaN(r) || r <= 400)) return false;

      // Origin Filter
      const origin = (car.origin || "").toLowerCase();
      if (originFilter === "ckd" && !origin.includes("lắp ráp")) return false;
      if (originFilter === "cbu" && !origin.includes("nhập khẩu")) return false;

      // Category Filter
      if (categoryFilter !== "all" && car.category !== categoryFilter) return false;

      return true;
    });

    if (sortOrder === 'price_asc') {
      result.sort((a, b) => a.rawPrice - b.rawPrice);
    } else if (sortOrder === 'price_desc') {
      result.sort((a, b) => b.rawPrice - a.rawPrice);
    }

    return result;
  }, [cars, searchQuery, priceFilter, seatsFilter, rangeFilter, originFilter, categoryFilter, sortOrder]);

  // Reset pagination when filter changes
  useEffect(() => {
    setDisplayedCount(Math.min(INITIAL_DISPLAY, filteredCars.length));
    setPrevDisplayedCount(0);
  }, [filteredCars]);

  const renderCars = () => {
    const carsToShow = filteredCars.slice(0, displayedCount);

    return carsToShow.map((car, index) => {
      // determine if this item is newly loaded to apply animation
      const isNew = index >= prevDisplayedCount && index < displayedCount;
      const animationDelay = isNew
        ? `${(index - prevDisplayedCount) * 80}ms`
        : undefined;

      return (
        <div
          key={car._id || index}
          className={`car-card ${isNew ? "new-item" : ""}`}
          style={animationDelay ? { animationDelay } : undefined}
        >
          {/* Nút Thả tim */}
          <button 
            onClick={(e) => handleToggleInterest(e, car._id)}
            disabled={togglingCars[car._id]}
            className="heart-btn"
            style={{ color: interestedCars.includes(car._id) ? '#ff4757' : '#95a5a6' }}
            title={interestedCars.includes(car._id) ? "Bỏ theo dõi" : "Theo dõi xe này"}
          >
            <i className={interestedCars.includes(car._id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
          </button>

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
                {/* <i className="fas fa-calendar"></i> */}
                <span className="car-detail-label">Năm sản xuất</span>
                <span className="car-detail-value">{car.year}</span>
              </li>
              <li>
                {/* <i className="fas fa-battery-three-quarters"></i> */}
                <span className="car-detail-label">Dung lượng pin</span>
                <span className="car-detail-value">{car.batteryKwh} kWh</span>
              </li>
              <li>
                {/* <i className="fas fa-bolt"></i> */}
                <span className="car-detail-label">Quãng đường</span>
                <span className="car-detail-value">{car.rangeKm} km</span>
              </li>
              <li>
                {/* <i className="fas fa-cogs"></i> */}
                <span className="car-detail-label">Công suất tối đa</span>
                <span className="car-detail-value">{car.motorPower}</span>
              </li>
              {/* <li>
                <i className="fas fa-rocket"></i>
                <span className="car-detail-label">Tăng tốc 0-100km/h</span>
                <span className="car-detail-value">{car.acceleration}</span>
              </li> */}
            </ul>
            <div className="car-price">{car.priceLabel}</div>
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
    setDisplayedCount((prev) => Math.min(prev + LOAD_MORE_COUNT, filteredCars.length));
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

        <div className="search-filter-container">
          <div className="search-bar-wrapper">
            <div className="search-input-box">
              <span className="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Tìm kiếm dòng xe..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className={`toggle-filter-btn ${isFilterOpen ? 'active' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="filter-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </span>
              <span className="filter-title">
                {isFilterOpen ? 'Đóng bộ lọc' : 'Bộ lọc nâng cao'}
              </span>
            </button>
          </div>

          {isFilterOpen && (
            <div className="advanced-filter-panel" ref={filterRef}>
              <div className="filter-dropdowns-group">
                <div className="filter-dropdown">
                  <button className={`filter-btn ${priceFilter !== 'all' ? 'active-filter' : ''}`} onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}>
                    <span className="btn-text">Giá</span>
                    <span className="btn-icon">{priceFilter !== 'all' ? '●' : '▼'}</span>
                  </button>
                  {activeDropdown === 'price' && (
                    <div className="dropdown-menu">
                      <button className={priceFilter === 'all' ? 'active' : ''} onClick={() => {setPriceFilter('all'); setActiveDropdown(null);}}>Tất cả</button>
                      <button className={priceFilter === 'under_500' ? 'active' : ''} onClick={() => {setPriceFilter('under_500'); setActiveDropdown(null);}}>Dưới 500 triệu</button>
                      <button className={priceFilter === '500_to_1b' ? 'active' : ''} onClick={() => {setPriceFilter('500_to_1b'); setActiveDropdown(null);}}>500 triệu - 1 tỷ</button>
                      <button className={priceFilter === 'over_1b' ? 'active' : ''} onClick={() => {setPriceFilter('over_1b'); setActiveDropdown(null);}}>Trên 1 tỷ</button>
                    </div>
                  )}
                </div>

                <div className="filter-dropdown">
                  <input 
                    type="number"
                    min="2"
                    max="60"
                    placeholder="Số chỗ"
                    className={`filter-btn filter-input ${seatsFilter !== 'all' && seatsFilter !== '' ? 'active-filter' : ''}`}
                    value={seatsFilter === 'all' ? '' : seatsFilter}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSeatsFilter(val === '' ? 'all' : val);
                    }}
                  />
                </div>
                
                <div className="filter-dropdown">
                  <button className={`filter-btn ${rangeFilter !== 'all' ? 'active-filter' : ''}`} onClick={() => setActiveDropdown(activeDropdown === 'range' ? null : 'range')}>
                    <span className="btn-text">Quãng đường</span>
                    <span className="btn-icon">{rangeFilter !== 'all' ? '●' : '▼'}</span>
                  </button>
                  {activeDropdown === 'range' && (
                    <div className="dropdown-menu">
                      <button className={rangeFilter === 'all' ? 'active' : ''} onClick={() => {setRangeFilter('all'); setActiveDropdown(null);}}>Tất cả</button>
                      <button className={rangeFilter === 'under_300' ? 'active' : ''} onClick={() => {setRangeFilter('under_300'); setActiveDropdown(null);}}>Dưới 300 km</button>
                      <button className={rangeFilter === '300_to_400' ? 'active' : ''} onClick={() => {setRangeFilter('300_to_400'); setActiveDropdown(null);}}>300 - 400 km</button>
                      <button className={rangeFilter === 'over_400' ? 'active' : ''} onClick={() => {setRangeFilter('over_400'); setActiveDropdown(null);}}>Trên 400 km</button>
                    </div>
                  )}
                </div>
                
                <div className="filter-dropdown">
                  <button className={`filter-btn ${originFilter !== 'all' ? 'active-filter' : ''}`} onClick={() => setActiveDropdown(activeDropdown === 'origin' ? null : 'origin')}>
                    <span className="btn-text">Xuất xứ</span>
                    <span className="btn-icon">{originFilter !== 'all' ? '●' : '▼'}</span>
                  </button>
                  {activeDropdown === 'origin' && (
                    <div className="dropdown-menu">
                      <button className={originFilter === 'all' ? 'active' : ''} onClick={() => {setOriginFilter('all'); setActiveDropdown(null);}}>Tất cả</button>
                      <button className={originFilter === 'ckd' ? 'active' : ''} onClick={() => {setOriginFilter('ckd'); setActiveDropdown(null);}}>Lắp ráp trong nước</button>
                      <button className={originFilter === 'cbu' ? 'active' : ''} onClick={() => {setOriginFilter('cbu'); setActiveDropdown(null);}}>Nhập khẩu</button>
                    </div>
                  )}
                </div>

                <div className="filter-dropdown">
                  <button className={`filter-btn ${categoryFilter !== 'all' ? 'active-filter' : ''}`} onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}>
                    <span className="btn-text">Kiểu dáng xe</span>
                    <span className="btn-icon">{categoryFilter !== 'all' ? '●' : '▼'}</span>
                  </button>
                  {activeDropdown === 'category' && (
                    <div className="dropdown-menu">
                      <button className={categoryFilter === 'all' ? 'active' : ''} onClick={() => {setCategoryFilter('all'); setActiveDropdown(null);}}>Tất cả</button>
                      <button className={categoryFilter === 'sedan' ? 'active' : ''} onClick={() => {setCategoryFilter('sedan'); setActiveDropdown(null);}}>Sedan</button>
                      <button className={categoryFilter === 'suv' ? 'active' : ''} onClick={() => {setCategoryFilter('suv'); setActiveDropdown(null);}}>SUV</button>
                      <button className={categoryFilter === 'coupe' ? 'active' : ''} onClick={() => {setCategoryFilter('coupe'); setActiveDropdown(null);}}>Coupe</button>
                      <button className={categoryFilter === 'hatchback' ? 'active' : ''} onClick={() => {setCategoryFilter('hatchback'); setActiveDropdown(null);}}>Hatchback</button>
                      <button className={categoryFilter === 'van' ? 'active' : ''} onClick={() => {setCategoryFilter('van'); setActiveDropdown(null);}}>Van</button>
                      <button className={categoryFilter === 'pickup' ? 'active' : ''} onClick={() => {setCategoryFilter('pickup'); setActiveDropdown(null);}}>Pickup</button>
                    </div>
                  )}
                </div>

                <div className="filter-dropdown">
                  <button className={`filter-btn sort-btn ${sortOrder !== 'default' ? 'active-filter' : ''}`} onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}>
                    <span className="btn-text">Sắp xếp</span>
                    <span className="btn-icon">⇅</span>
                  </button>
                  {activeDropdown === 'sort' && (
                    <div className="dropdown-menu">
                      <button className={sortOrder === 'default' ? 'active' : ''} onClick={() => {setSortOrder('default'); setActiveDropdown(null);}}>Mặc định</button>
                      <button className={sortOrder === 'price_asc' ? 'active' : ''} onClick={() => {setSortOrder('price_asc'); setActiveDropdown(null);}}>Giá: Thấp đến Cao</button>
                      <button className={sortOrder === 'price_desc' ? 'active' : ''} onClick={() => {setSortOrder('price_desc'); setActiveDropdown(null);}}>Giá: Cao đến Thấp</button>
                    </div>
                  )}
                </div>
              </div>

              {(priceFilter !== 'all' || seatsFilter !== 'all' || rangeFilter !== 'all' || originFilter !== 'all' || categoryFilter !== 'all' || sortOrder !== 'default') && (
                <div className="reset-container">
                  <button className="reset-filter-text-btn" onClick={() => {
                    setPriceFilter('all');
                    setSeatsFilter('all');
                    setRangeFilter('all');
                    setOriginFilter('all');
                    setCategoryFilter('all');
                    setSortOrder('default');
                    setActiveDropdown(null);
                  }}>
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {loading && <p className="text-center product-loading-text">Đang tải danh sách xe. Vui lòng đợi một chút.</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
          <>
            {filteredCars.length === 0 ? (
              <p className="text-center product-no-results">Không tìm thấy mẫu xe nào phù hợp với tiêu chí của bạn.</p>
            ) : (
              <div className="cars-grid-container">{renderCars()}</div>
            )}
            {displayedCount < filteredCars.length && (
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
