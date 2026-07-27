import '../../assets/css/user_pages/Deposit.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from "react";
import { carService } from '../../services/carService';
import { customerService } from '../../services/customerService';
import { depositService } from '../../services/depositService';
import { paymentService } from '../../services/paymentService';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import { Link } from 'react-router-dom';

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
  const [isProcessing, setIsProcessing] = useState(false);

  // Load dữ liệu xe từ URL
  useEffect(() => {
    document.title = "Giao dịch | VinFast";
    const urlParams = new URLSearchParams(window.location.search);
    const carModel = urlParams.get("model") || "vf3";
    
    // Fetch from API by model
    fetchCarByModel(carModel);

    // Auto-fill user data
    if (authService.isAuthenticated()) {
      authService.getCurrentUser()
        .then(userData => {
          if (userData) {
            setCustomer(prev => ({
              ...prev,
              Customer_Name: userData.name || "",
              Phone_No: userData.phone || "",
              Email: userData.email || "",
            }));
          }
        })
        .catch(console.error);
    }
  }, []);

  const fetchCarByModel = async (modelId) => {
    try {
      const response = await carService.getAllCars(1, 100);
      const carsArray = Array.isArray(response) ? response : (response?.cars || []);
      const foundCar = carsArray.find(c => c.model && c.model.toLowerCase() === modelId.toLowerCase());
      
      if (foundCar) {
        // Convert API car to display format
          const mappedColors = (foundCar.variants && foundCar.variants.length > 0) 
            ? foundCar.variants.map(v => ({
                name: v.colorName || 'Mặc định',
                color: v.colorHex || 'gray',
                image: v.image ? v.image : '/images/car-pics/vf3/vf3yl.png'
              }))
            : [{
                name: 'Mặc định',
                color: 'gray',
                image: (foundCar.variants && foundCar.variants.length > 0 && foundCar.variants[0].image) ? foundCar.variants[0].image : '/images/car-pics/vf3/vf3yl.png'
              }];

          const displayCar = {
            id: foundCar._id,
            name: foundCar.name || 'Xe VinFast',
            version: foundCar.name,
            specs: {
              batteryCapacity: foundCar.specifications?.batteryCapacity ? `${foundCar.specifications.batteryCapacity}` : 'N/A',
              range: foundCar.specifications?.range ? `${foundCar.specifications.range} km` : 'N/A',
              energyConsumption: foundCar.specifications?.energyConsumption ? `${foundCar.specifications.energyConsumption}` : 'N/A',
              power: foundCar.specifications?.motorPower || 'N/A',
              acceleration: foundCar.specifications?.acceleration ? `${foundCar.specifications.acceleration} giây` : 'N/A',
              seats: foundCar.specifications?.seats ? `${foundCar.specifications.seats} chỗ` : 'N/A',
              category: foundCar.category ? (foundCar.category.toLowerCase() === 'suv' ? 'SUV' : foundCar.category.charAt(0).toUpperCase() + foundCar.category.slice(1).toLowerCase()) : 'N/A',
              origin: foundCar.origin_of_car || 'N/A',
              year: foundCar.year || 'N/A'
            },
            price: `${(foundCar.price / 1000000).toFixed(0)}.000.000 VNĐ`,
            deposit: `${Math.round(foundCar.price / 1000000 * 0.1)}.000.000 VNĐ`,
            defaultImage: mappedColors[0]?.image || '/images/car-pics/vf3/vf3yl.png',
            colors: mappedColors
          };
        setSelectedCar(displayCar);
        setSelectedColor(displayCar.colors[0]);
      }
    } catch (error) {
      console.error('Error fetching car:', error);
      toast.error('Không thể tải thông tin xe. Vui lòng thử lại.');
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
    
    if (!Customer_Name || !Citizen_ID || !Phone_No || !Email || !Address) {
      toast.warning("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return false;
    }

    if (!/^\d{9}(\d{3})?$/.test(Citizen_ID)) {
      toast.warning("Số CCCD/CMND phải bao gồm 9 hoặc 12 chữ số.");
      return false;
    }

    if (!/^0\d{9}$/.test(Phone_No)) {
      toast.warning("Số điện thoại không hợp lệ (phải gồm 10 số và bắt đầu bằng 0).");
      return false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email)) {
      toast.warning("Email không hợp lệ.");
      return false;
    }

    if (Address.trim().length < 5) {
      toast.warning("Địa chỉ quá ngắn.");
      return false;
    }

    return true;
  };

  // Gửi form
  const handleSubmit = async () => {
    const { agree1, agree2, agree3 } = agreements;
    if (!agree1 || !agree2 || !agree3) {
      toast.warning("Vui lòng đồng ý với các điều khoản và điều kiện.");
      return;
    }

    setIsProcessing(true);
    let depositId = null;

    try {
      // Bước 1: Tìm xe trong database theo model ID
      const carsResponse = await carService.getAllCars(1, 100);
      const carsArray = Array.isArray(carsResponse) ? carsResponse : (carsResponse?.cars || []);
      const carInDb = carsArray.find(c => c._id === selectedCar?.id);
      
      if (!carInDb) {
        toast.error("Không tìm thấy xe trong hệ thống. Vui lòng thử lại.");
        setIsProcessing(false);
        return;
      }

      // Bước 2: Tạo hoặc tìm customer
      const customerData = {
        name: customer.Customer_Name,
        email: customer.Email,
        phone: customer.Phone_No,
        address: customer.Address,
        identityNumber: customer.Citizen_ID,
      };

      let customerId;
      try {
        const customerResponse = await customerService.createCustomer(customerData);
        customerId = customerResponse.customer._id;
      } catch (error) {
        // Nếu customer đã tồn tại, backend sẽ trả về customerId trong error response
        console.error('Error creating customer:', error);
        toast.error("Có lỗi khi tạo thông tin khách hàng: " + (error.message || "Vui lòng thử lại."));
        setIsProcessing(false);
        return;
      }

      // Bước 3: Tính toán số tiền
      const totalPrice = carInDb.price;
      const depositAmount = Math.round(totalPrice * 0.1); // 10% đặt cọc
      const remainingBalance = totalPrice - depositAmount;

      // Bước 4: Tạo deposit với trạng thái pending
      const depositData = {
        customerId: customerId,
        carId: carInDb._id,
        depositAmount: depositAmount,
        totalPrice: totalPrice,
        remainingBalance: remainingBalance,
        status: 'pending',
        notes: `Đặt cọc xe ${carInDb.name || carInDb.model_car_name} màu ${selectedColor?.name || 'mặc định'}`
      };

      const depositResponse = await depositService.createDeposit(depositData);
      depositId = depositResponse.deposit._id;

      // Bước 5: Gọi API tạo link thanh toán VNPay
      const paymentData = {
        depositId: depositId,
        amount: depositAmount,
        language: 'vn',
      };
      const paymentRes = await paymentService.createPaymentUrl(paymentData);
      
      if (paymentRes && paymentRes.paymentUrl) {
        toast.info("Đang chuyển hướng đến cổng thanh toán VNPay...");
        window.location.href = paymentRes.paymentUrl;
      } else {
        throw new Error("Không thể tạo link thanh toán VNPay.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi đặt cọc: " + (error.message || "Vui lòng thử lại."));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='deposit_page'>
      <Navbar activePage="products" />
      <div className="container deposit-container">
        <div className="left">
          <Link
            className="deposit-back-link"
            to={`/landing/${selectedCar?.model || new URLSearchParams(window.location.search).get('model') || 'vf3'}`}
          >
            <i className="fas fa-arrow-left"></i> Quay lại trang chi tiết
          </Link>
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
                className={`color-option color-option-box ${
                  selectedColor?.color === c.color ? "active" : ""
                }`}
                style={{
                  backgroundColor: c.color,
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
                    <span className="spec-label">Dung lượng pin</span>
                    <span className="spec-value">{selectedCar?.specs.batteryCapacity}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Quãng đường di chuyển</span>
                    <span className="spec-value">{selectedCar?.specs.range}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Mức tiêu thụ năng lượng</span>
                    <span className="spec-value">{selectedCar?.specs.energyConsumption}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Công suất tối đa</span>
                    <span className="spec-value">{selectedCar?.specs.power}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Tăng tốc (0-100 km/h)</span>
                    <span className="spec-value">{selectedCar?.specs.acceleration}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Số chỗ ngồi</span>
                    <span className="spec-value">{selectedCar?.specs.seats}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Kiểu dáng</span>
                    <span className="spec-value">{selectedCar?.specs.category}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Xuất xứ</span>
                    <span className="spec-value">{selectedCar?.specs.origin}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Năm sản xuất</span>
                    <span className="spec-value">{selectedCar?.specs.year}</span>
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
              <p className="mt-2 text-muted deposit-note">* Lưu ý: Thông tin này sẽ được sử dụng để xuất hóa đơn và đăng ký xe, quý khách vui lòng nhập chính xác.</p>
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
                      {label} <span className="required-asterisk">*</span>
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
                {/* <li>Công suất: <b>{selectedCar?.specs.power}</b></li>
                <li>Hộp số: <b>{selectedCar?.specs.acceleration}</b></li>
                <li>Quãng đường: <b>{selectedCar?.specs.range}</b></li> */}
                <li>Giá xe: <b>{selectedCar?.price}</b></li>
                <li>Số tiền đặt cọc: <b>{selectedCar?.deposit}</b></li>
              </ul>

              {/* <p>Vui lòng quét mã QR để thanh toán:</p>
              <img
              className='qr_img deposit-qr-size'
                src="/images/Deposit.png"
                alt="QR Thanh toán"
              /> */}

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
                <button className="btn btn-secondary" onClick={goPrevStep} disabled={isProcessing}>
                  Quay lại
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!Object.values(agreements).every(Boolean) || isProcessing}
                >
                  {isProcessing ? "Đang xử lý..." : "Thanh toán VNPay"}
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