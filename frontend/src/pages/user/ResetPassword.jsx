import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";
import "../../assets/css/user_pages/Login.css"; // For generic elements
import "../../assets/css/user_pages/PasswordReset.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Đường dẫn không hợp lệ. Vui lòng yêu cầu lại link khôi phục.");
      return;
    }
    if (passwordData.password !== passwordData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (passwordData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }
    
    setLoading(true);
    try {
      await authService.resetPassword(token, passwordData.password);
      toast.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Đổi mật khẩu thất bại. Token có thể đã hết hạn.");
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
          <h3 className="text-center mb-4 login-header-title">Khôi phục mật khẩu</h3>
          
          <form onSubmit={handleSubmit} className="pw-reset-card__form">
            <p className="pw-reset-card__instruction">
              Vui lòng nhập mật khẩu mới của bạn bên dưới.
            </p>
            
            <div className="input-group-custom">
              <i className="fas fa-lock"></i>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={passwordData.password} 
                onChange={handleChange} 
                placeholder="Mật khẩu mới (ít nhất 6 ký tự)" 
                required 
              />
              <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <div className="input-group-custom">
              <i className="fas fa-check-circle"></i>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword"
                value={passwordData.confirmPassword} 
                onChange={handleChange} 
                placeholder="Xác nhận mật khẩu mới" 
                required 
              />
              <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <button type="submit" className="btn-primary-auth pw-reset-card__btn" disabled={loading}>
              {loading ? "ĐANG XỬ LÝ..." : "LƯU MẬT KHẨU MỚI"}
            </button>
            
            <div className="text-center">
              <Link to="/login" className="pw-reset-card__link">
                <i className="fas fa-arrow-left pw-reset-card__link-icon"></i> Quay lại Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
