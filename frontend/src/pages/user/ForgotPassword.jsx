import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";
import "../../assets/css/user_pages/Login.css"; // For generic elements like input-group-custom
import "../../assets/css/user_pages/PasswordReset.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Vui lòng nhập địa chỉ email");
      return;
    }
    
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setIsSuccess(true);
      toast.success("Đã gửi link khôi phục mật khẩu vào email của bạn!");
    } catch (err) {
      toast.error(err.message || "Không thể gửi yêu cầu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container_login">
      <div className="pw-reset-overlay"></div>
      <Link to="/" className="back-home-btn">
        <i className="fas fa-arrow-left"></i> Trang chủ
      </Link>
      <div className="login_container">
        <div className="pw-reset-card">
          <h3 className="text-center mb-4 login-header-title">Quên mật khẩu</h3>
          
          {isSuccess ? (
            <div className="pw-reset-card__success">
              <i className="fas fa-check-circle pw-reset-card__success-icon" style={{ color: 'white' }}></i>
              <p className="pw-reset-card__success-text">
                Chúng tôi đã gửi một đường link khôi phục mật khẩu đến email <b>{email}</b>. 
                Vui lòng kiểm tra hộp thư đến (hoặc thư rác) và làm theo hướng dẫn.
              </p>
              <Link to="/login" className="btn-primary-auth">
                QUAY LẠI ĐĂNG NHẬP
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pw-reset-card__form">
              <p className="pw-reset-card__instruction">
                Nhập địa chỉ email liên kết với tài khoản của bạn. 
                Chúng tôi sẽ gửi cho bạn một đường link để đặt lại mật khẩu.
              </p>
              
              <div className="input-group-custom">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Địa chỉ Email" 
                  required 
                />
              </div>

              <button type="submit" className="btn-primary-auth pw-reset-card__btn" disabled={loading}>
                {loading ? "ĐANG GỬI..." : "GỬI YÊU CẦU"}
              </button>
              
              <div className="text-center">
                <Link to="/login" className="pw-reset-card__link">
                  <i className="fas fa-arrow-left pw-reset-card__link-icon"></i> Quay lại Đăng nhập
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
