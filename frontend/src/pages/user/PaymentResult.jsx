import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/css/user_pages/PaymentResult.css';

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const status = queryParams.get('status');
  const depositId = queryParams.get('depositId');
  const amount = queryParams.get('amount');

  useEffect(() => {
    document.title = "Kết quả thanh toán | VinFast";
  }, []);

  return (
    <div className='payment_result_page'>
      <Navbar activePage="" />
      <div className="payment_result_container">
        {status === 'success' ? (
          <div>
            <ion-icon name="checkmark-circle" class="payment_result_icon success"></ion-icon>
            <h2 className="payment_result_title success">Thanh toán thành công!</h2>
            <p className="payment_result_message">
              Cảm ơn Quý khách đã đặt cọc. Giao dịch của Quý khách đã được ghi nhận.
            </p>
            <div className="payment_result_details">
              {depositId && <p>Mã giao dịch: <strong>{depositId}</strong></p>}
              {amount && <p>Số tiền: <strong>{(Number(amount)/100).toLocaleString()} VNĐ</strong></p>}
            </div>
            
            <button className="btn btn-primary payment_result_btn" onClick={() => navigate('/profile')}>
              Xem lịch sử đặt cọc
            </button>
          </div>
        ) : (
          <div>
            <ion-icon name="close-circle" class="payment_result_icon error"></ion-icon>
            <h2 className="payment_result_title error">Thanh toán thất bại</h2>
            <p className="payment_result_message">
              Rất tiếc, quá trình thanh toán đã gặp sự cố hoặc Quý khách đã hủy giao dịch.
            </p>
            <p>Vui lòng thử lại hoặc liên hệ tổng đài để được hỗ trợ.</p>
            
            <button className="btn btn-secondary payment_result_btn" onClick={() => navigate('/products')}>
              Quay lại danh sách sản phẩm
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentResult;
