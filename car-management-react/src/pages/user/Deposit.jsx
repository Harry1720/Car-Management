import '../../assets/css/user_pages/Deposit.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from "react";
import { carService } from '../../services/carService';

// Giả lập carModels (bạn thay bằng import thật từ Deposit.js)
const carModels = {
    "vf3": {
        id: "VINVF3YL",
        name: "VinFast 3",
        version: "VF3 - Tiêu chuẩn",
        specs: {
            power: "32 kW",
            acceleration: "5,3 giây",
            range: "~210 km"
        },
        price: "198.000.000 VNĐ",
        deposit: "20.000.000 VNĐ",
        defaultImage: "/images/car-pics/vf3/vf3yl.png",
        colors: [
            {
                name: "Vàng",
                color: "yellow",
                image: "/images/car-pics/vf3/vf3yl.png"
            },
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "/images/car-pics/vf3/vf3b.png"
            },
            {
                name: "Hồng",
                color: "pink",
                image: "/images/car-pics/vf3/vf3pk.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "/images/car-pics/vf3/vf3r.png"
            },
            {
                name: "Trắng",
                color: "white",
                image: "/images/car-pics/vf3/vf3wh.png"
            }
        ]
    },
    "vf5": {
        id: "VINVF5B",
        name: "VinFast 5",
        version: "VF5 - Tiêu chuẩn",
        specs: {
            power: "100 kW",
            acceleration: "~4 giây",
            range: "~326,4 km"
        },
        price: "458.000.000 VNĐ",
        deposit: "45.000.000 VNĐ",
        defaultImage: "/images/car-pics/vf5/vf5b.png",
        colors: [
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "/images/car-pics/vf5/vf5b.png"
            },
            {
                name: "Đen",
                color: "rgb(0, 0, 0)",
                image: "/images/car-pics/vf5/vf5bl.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "/images/car-pics/vf5/vf5r.png"
            },
            {
                name: "Trắng",
                color: "rgb(255, 255, 255)",
                image: "/images/car-pics/vf5/vf5wh.png"
            }
        ]
    },
    "vf6": {
        id: "VINVF6G",
        name: "VinFast 6",
        version: "VF6 - Tiêu chuẩn",
        specs: {
            power: "150 kW",
            acceleration: "~3 giây",
            range: "~399 km"
        },
        price: "675.000.000 VNĐ",
        deposit: "67.000.000 VNĐ",
        defaultImage: "/images/car-pics/vf6/vf6b.png",
        colors: [
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "/images/car-pics/vf6/vf6b.png"
            },
            {
                name: "Đen",
                color: "rgb(0, 0, 0)",
                image: "/images/car-pics/vf6/vf6bl.png"
            },
            {
                name: "Xanh lá",
                color: "green",
                image: "/images/car-pics/vf6/vf6g.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "/images/car-pics/vf6/vf6r.png"
            },
            {
                name: "Trắng",
                color: "rgb(255, 255, 255)",
                image: "/images/car-pics/vf6/vf6wh.png"
            }
        ]
    },
    "vf7": {
        id: "VINVF7B",
        name: "VinFast 7",
        version: "VF7 - Tiêu chuẩn",
        specs: {
            power: "200 kW",
            acceleration: "~3 giây",
            range: "~450 km"
        },
        price: "850.000.000 VNĐ",
        deposit: "85.000.000 VNĐ",
        defaultImage: "/images/car-pics/vf7/vf7bl.png",
        colors: [
            {
                name: "Đen",
                color: "black",
                image: "/images/car-pics/vf7/vf7bl.png"
            },
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "/images/car-pics/vf7/vf7b.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "/images/car-pics/vf7/vf7r.png"
            },
            {
                name: "Xanh lá",
                color: "green",
                image: "/images/car-pics/vf7/vf7g.png"
            },
            {
                name: "Trắng",
                color: "rgb(255, 255, 255)",
                image: "/images/car-pics/vf7/vf7wh.png"
            }
        ]
    },
    "vf8": {
        id: "VINVF8B",
        name: "VinFast 8",
        version: "VF8 - Tiêu chuẩn",
        specs: {
            power: "260 kW",
            acceleration: "~2.9 giây",
            range: "~471 km"
        },
        price: "1.089.000.000 VNĐ",
        deposit: "100.000.000 VNĐ",
        defaultImage: "/images/car-pics/vf8/vf8b.png",
        colors: [
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "/images/car-pics/vf8/vf8b.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "/images/car-pics/vf8/vf8r.png"
            },
            {
                name: "Xám",
                color: "rgb(224, 224, 224)",
                image: "/images/car-pics/vf8/vf8wh.png"
            },
            {
                name: "Đen",
                color: "black",
                image: "/images/car-pics/vf8/vf8bl.png"
            },
            {
                name: "Xanh lá",
                color: "green",
                image: "/images/car-pics/vf8/vf8g.png"
            }
        ]
    },
    "vf9": {
        id: "VINVF9BL",
        name: "VinFast 9",
        version: "VF9 - Tiêu chuẩn",
        specs: {
            power: "300 kW",
            acceleration: "~2.5 giây",
            range: "~580 km"
        },
        price: "1.491.000.000 VNĐ",
        deposit: "150.000.000 VNĐ",
        defaultImage: "/images/car-pics/vf9/vf9r.png",
        colors: [
            {
                name: "Đỏ",
                color: "red",
                image: "/images/car-pics/vf9/vf9r.png"
            },
            {
                name: "Trắng",
                color: "rgb(255, 255, 255)",
                image: "/images/car-pics/vf9/vf9wh.png"
            },
            {
                name: "Đen",
                color: "black",
                image: "/images/car-pics/vf9/vf9bl.png"
            },
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "/images/car-pics/vf9/vf9b.png"
            }
        ]
    },
    "vfe34": {
        id: "VINE34WH",
        name: "VinFast e34",
        version: "VF e34 - Tiêu chuẩn",
        specs: {
            power: "100 kW",
            acceleration: "~4 giây",
            range: "~326,4 km"
        },
        price: "690.000.000 VNĐ",
        deposit: "69.000.000 VNĐ",
        defaultImage: "/images/car-pics/vfe34/vfe34wh.png",
        colors: [
            {
                name: "Trắng",
                color: "white",
                image: "/images/car-pics/vfe34/vfe34wh.png"
            },
            {
                name: "Đen",
                color: "black",
                image: "/images/car-pics/vfe34/vfe34bl.png"
            },
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "/images/car-pics/vfe34/vfe34b.png"
            },
            {
                name: "Đỏ",
                color: "rgb(255, 0, 0)",
                image: "/images/car-pics/vfe34/vfe34r.png"
            }
        ]
    },
    "vfwild": {
        id: "VINVFWG",
        name: "VinFast Wild",
        version: "VF Wild - Tiêu chuẩn",
        specs: {
            power: "300 kW",
            acceleration: "---",
            range: "---"
        },
        price: "1.190.000.000 VNĐ",
        deposit: "120.000.000 VNĐ",
        defaultImage: "/images/car-pics/vfwild.png",
        colors: [
            {
                name: "Bạc",
                color: "silver",
                image: "/images/car-pics/vfwild.png"
            }
        ]
    }
};

const Deposit = () => {
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [customer, setCustomer] = useState({
    Customer_Name: "",
    Citizen_ID: "",
    Phone_No: "",
    Email: "",
    Address: "",
  });
  const [agreements, setAgreements] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
  });

  // Load dữ liệu xe từ URL
  useEffect(() => {
    document.title = "Giao dịch | VinFast";
    const urlParams = new URLSearchParams(window.location.search);
    const carModel = urlParams.get("model") || "vf3";
    
    // First try to find in hardcoded models
    let car = carModels[carModel];
    
    if (car) {
      setSelectedCar(car);
      setSelectedColor(car.colors[0]);
    } else {
      // If not found in hardcoded, fetch from API by model
      fetchCarByModel(carModel);
    }
  }, []);

  const fetchCarByModel = async (modelId) => {
    try {
      const response = await carService.getAllCars(1, 100);
      const carsArray = Array.isArray(response) ? response : (response?.cars || []);
      const foundCar = carsArray.find(c => c.model && c.model.toLowerCase() === modelId.toLowerCase());
      
      if (foundCar) {
        // Convert API car to display format
        const displayCar = {
          id: foundCar.model,
          name: foundCar.name || 'Xe VinFast',
          version: foundCar.name,
          specs: {
            power: foundCar.specifications?.engine || 'N/A',
            acceleration: foundCar.specifications?.transmission || 'N/A',
            range: foundCar.specifications?.fuelConsumption || 'N/A'
          },
          price: `${(foundCar.price / 1000000).toFixed(0)}.000.000 VNĐ`,
          deposit: `${Math.round(foundCar.price / 1000000 * 0.1)}.000.000 VNĐ`,
          defaultImage: foundCar.images?.[0] || '/images/car-pics/vf3/vf3yl.png',
          colors: [
            {
              name: foundCar.color || 'Mặc định',
              color: foundCar.color || 'gray',
              image: foundCar.images?.[0] || '/images/car-pics/vf3/vf3yl.png'
            }
          ]
        };
        setSelectedCar(displayCar);
        setSelectedColor(displayCar.colors[0]);
      }
    } catch (error) {
      console.error('Error fetching car:', error);
      // Fall back to vf3 if error
      const defaultCar = carModels['vf3'];
      setSelectedCar(defaultCar);
      setSelectedColor(defaultCar.colors[0]);
    }
  };

  // Chuyển bước
  const goNextStep = () => {
    if (step === 1 && selectedCar && selectedColor) setStep(2);
    else if (step === 2 && validateStepTwo()) setStep(3);
  };

  const goPrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Kiểm tra dữ liệu bước 2
  const validateStepTwo = () => {
    const { Customer_Name, Citizen_ID, Phone_No, Email, Address } = customer;
    return Customer_Name && Citizen_ID && Phone_No && Email && Address;
  };

  // Gửi form
  const handleSubmit = async () => {
    const { agree1, agree2, agree3 } = agreements;
    if (!agree1 || !agree2 || !agree3) {
      alert("Vui lòng đồng ý với các điều khoản và điều kiện.");
      return;
    }

    // const customerData = {
    //   ...customer,
    //   Model_Car_ID: selectedCar?.id,
    // };

    // try {
    //   const response = await fetch("http://localhost:8989/fillCustomerInfo", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(customerData),
    //   });

    //   if (!response.ok) throw new Error(await response.text());
      alert("Đặt cọc thành công! Cảm ơn quý khách đã lựa chọn VinFast.");
      window.location.href = "/products";
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Có lỗi xảy ra khi đặt cọc. Vui lòng thử lại.");
    // }
  };

  return (
    <div className='deposit_page'>
      <Navbar activePage="products" />
      <div className="container deposit-container">
        <div className="left">
          <h2>{selectedCar?.name || "VinFast"}</h2>
          <img
            className="thumb"
            src={selectedColor?.image || selectedCar?.image}
            alt={selectedCar?.name}
            width="920"
          />
          <div className="list-color">
            {selectedCar?.colors.map((c, i) => (
              <div
                key={i}
                className={`color-option ${
                  selectedColor?.color === c.color ? "active" : ""
                }`}
                style={{
                  background: c.color,
                  borderRadius: "10px",
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedColor(c)}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="right">
          <nav className="navbar">
            <ul>
              <li className={step === 1 ? "active" : ""}>Lựa chọn xe</li>
              <li className={step === 2 ? "active" : ""}>Nhập thông tin</li>
              <li className={step === 3 ? "active" : ""}>Đặt cọc</li>
            </ul>
          </nav>

          {/* ===== BƯỚC 1 ===== */}
          {step === 1 && (
            <div className="content">
              <h2>Lựa chọn xe</h2>
              <div className="configuration">
                <div className='title_config'>* Xin mời Quý khách vui lòng chọn màu sắc của xe.</div>
                
                <div className="car-specs">
                  <div className="spec-item">
                    <span className="spec-label">Phiên bản xe</span>
                    <span className="spec-value">{selectedCar?.version}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Màu xe</span>
                    <span className="spec-value">{selectedColor?.name}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Công suất tối đa</span>
                    <span className="spec-value">{selectedCar?.specs.power}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Tăng tốc 0-50 km/h</span>
                    <span className="spec-value">
                      {selectedCar?.specs.acceleration}
                    </span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Quãng đường di chuyển</span>
                    <span className="spec-value">{selectedCar?.specs.range}</span>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={goNextStep}
                disabled={!selectedCar || !selectedColor}
              >
                Bước tiếp theo
              </button>
            </div>
          )}

          {/* ===== BƯỚC 2 ===== */}
          {step === 2 && (
            <div className="content vf_form_user">
              <h2>Nhập thông tin chủ xe</h2>
              <form className="vf-form">
                {[
                  { id: "Customer_Name", label: "Họ và tên" },
                  { id: "Citizen_ID", label: "Số CCCD" },
                  { id: "Phone_No", label: "Số điện thoại" },
                  { id: "Email", label: "Email" },
                  { id: "Address", label: "Địa chỉ" },
                ].map(({ id, label }) => (
                  <div key={id} className="form-group mb-3">
                    <label>
                      {label} <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={customer[id] || ""}
                      onChange={(e) =>
                        setCustomer({ ...customer, [id]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </form>

              <div className="actions">
                <button className="btn btn-secondary" onClick={goPrevStep}>
                  Quay lại
                </button>
                <button
                  className="btn btn-primary"
                  onClick={goNextStep}
                  disabled={!validateStepTwo()}
                >
                  Bước tiếp theo
                </button>
              </div>
            </div>
          )}

          {/* ===== BƯỚC 3 ===== */}
          {step === 3 && (
            <div className="content step_3">
              <h2>Đặt cọc</h2>
              <ul>
                <li>Phiên bản: <b>{selectedCar?.version}</b></li>
                <li>Màu sắc: <b>{selectedColor?.name}</b></li>
                <li>Công suất: <b>{selectedCar?.specs.power}</b></li>
                <li>Hộp số: <b>{selectedCar?.specs.acceleration}</b></li>
                <li>Quãng đường: <b>{selectedCar?.specs.range}</b></li>
                <li>Giá xe: <b>{selectedCar?.price}</b></li>
                <li>Số tiền đặt cọc: <b>{selectedCar?.deposit}</b></li>
              </ul>

              <p>Vui lòng quét mã QR để thanh toán:</p>
              <img
              className='qr_img'
                src="/images/Deposit.png"
                alt="QR Thanh toán"
                style={{ width: "200px", height: "200px" }}
              />

              <div className="mt-3">
                {[
                  {
                    id: "agree1",
                    text: "Tôi cam kết các thông tin đã cung cấp tại đây hoàn toàn chính xác.",
                  },
                  {
                    id: "agree2",
                    text: "Tôi đã đọc và đồng ý với nội dung Điều khoản trong Thỏa Thuận Đặt Cọc.",
                  },
                  {
                    id: "agree3",
                    text: "Tôi đồng ý với các Điều kiện & Điều khoản của VinFast Online.",
                  },
                ].map(({ id, text }) => (
                  <div key={id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={agreements[id]}
                      onChange={(e) =>
                        setAgreements({ ...agreements, [id]: e.target.checked })
                      }
                    />
                    <label>{text}</label>
                  </div>
                ))}
              </div>

              <div className="actions mt-4">
                <button className="btn btn-secondary" onClick={goPrevStep}>
                  Quay lại
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!Object.values(agreements).every(Boolean)}
                >
                  Đã thanh toán
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Deposit;