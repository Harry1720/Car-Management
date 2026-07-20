import '../../assets/css/user_pages/Deposit.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from "react";
import { carService } from '../../services/carService';
import { customerService } from '../../services/customerService';
import { depositService } from '../../services/depositService';
import { transactionService } from '../../services/transactionService';

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
    
    // Fetch from API by model
    fetchCarByModel(carModel);
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
              power: foundCar.specifications?.motorPower || 'N/A',
              acceleration: foundCar.specifications?.acceleration || 'N/A',
              range: foundCar.specifications?.range || 'N/A'
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
      alert('Không thể tải thông tin xe. Vui lòng thử lại.');
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

    try {
      // Bước 1: Tìm xe trong database theo model ID
      const carsResponse = await carService.getAllCars(1, 100);
      const carsArray = Array.isArray(carsResponse) ? carsResponse : (carsResponse?.cars || []);
      const carInDb = carsArray.find(c => c.model === selectedCar?.id || c.model_car_id === selectedCar?.id);
      
      if (!carInDb) {
        alert("Không tìm thấy xe trong hệ thống. Vui lòng thử lại.");
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
        alert("Có lỗi khi tạo thông tin khách hàng: " + (error.message || "Vui lòng thử lại."));
        return;
      }

      // Bước 3: Tính toán số tiền
      const totalPrice = carInDb.price;
      const depositAmount = Math.round(totalPrice * 0.1); // 10% đặt cọc
      const remainingBalance = totalPrice - depositAmount;

      // Bước 4: Tạo deposit
      const depositData = {
        customerId: customerId,
        carId: carInDb._id,
        depositAmount: depositAmount,
        totalPrice: totalPrice,
        remainingBalance: remainingBalance,
        status: 'confirmed',
        notes: `Đặt cọc xe ${carInDb.name || carInDb.model_car_name} màu ${selectedColor?.name || 'mặc định'}`
      };

      const depositResponse = await depositService.createDeposit(depositData);
      const depositId = depositResponse.deposit._id;

      // Bước 5: Tạo transaction thanh toán đặt cọc
      const transactionData = {
        depositId: depositId,
        customerId: customerId,
        amount: depositAmount,
        paymentMethod: 'bank_transfer',
        description: `Thanh toán đặt cọc xe ${carInDb.name || carInDb.model_car_name}`,
        reference: `DEP-${Date.now()}`,
        carId: carInDb._id
      };

      await transactionService.createTransaction(transactionData);

      alert("Đặt cọc thành công! Cảm ơn quý khách đã lựa chọn VinFast.\nGiao dịch đã được ghi nhận vào hệ thống.");
      window.location.href = "/products";
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi đặt cọc: " + (error.message || "Vui lòng thử lại."));
    }
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