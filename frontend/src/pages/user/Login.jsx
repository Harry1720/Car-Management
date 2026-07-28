import "../../assets/css/user_pages/Login.css";
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.title = "Đăng nhập / Đăng ký | VinFast";
    if (authService.isAuthenticated()) {
      const role = localStorage.getItem('role');
      if (role === 'admin' || role === 'employee') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
    if (location.state?.isRegister) {
      setIsRightPanelActive(true);
    }
  }, [navigate, location.state]);

  const handleLoginChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setLoginError("");
  };

  const handleRegisterChange = (e) => {
    setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setRegisterError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      await authService.login(loginData.email, loginData.password, 'user');
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Tên đăng nhập hoặc mật khẩu không đúng!");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(registerData.phone)) {
      toast.error("Số điện thoại không hợp lệ (phải từ 10-11 số)!");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(registerData.password)) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số!");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    setRegisterLoading(true);
    setRegisterError("");
    try {
      await authService.register({
        name: `${registerData.firstName} ${registerData.lastName}`,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password
      });
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      setIsRightPanelActive(false); // Switch back to login
      // clear register data
      setRegisterData({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.message || "Đăng ký thất bại!");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="container_login">
      <Link to="/" className="back-home-btn">
        <i className="fas fa-arrow-left"></i> Trang chủ
      </Link>
      
      <div className="login_container">
        <div className={`auth-card ${isRightPanelActive ? "right-panel-active" : ""}`}>
          
          {/* Form Đăng ký */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleRegisterSubmit}>
              <h3 className="text-center mt-5 mb-4 login-header-title">Tạo tài khoản mới</h3>
              <div className="login-name-group">
                <div className="input-group-custom login-input-flex">
                  <i className="fas fa-user"></i>
                  <input type="text" name="firstName" value={registerData.firstName} onChange={handleRegisterChange} placeholder="Họ" required />
                </div>
                <div className="input-group-custom login-input-flex">
                  <input type="text" name="lastName" value={registerData.lastName} onChange={handleRegisterChange} placeholder="Tên" required />
                </div>
              </div>
              
              <div className="input-group-custom">
                <i className="fas fa-envelope"></i>
                <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="Email" required />
              </div>
              
              <div className="input-group-custom">
                <i className="fas fa-phone"></i>
                <input type="tel" name="phone" value={registerData.phone} onChange={handleRegisterChange} placeholder="Số điện thoại" required />
              </div>
              
              <div className="input-group-custom">
                <i className="fas fa-lock"></i>
                <input type={showRegisterPassword ? "text" : "password"} name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="Mật khẩu" required />
                <button type="button" className="password-toggle-btn" onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
                  <i className={`fas ${showRegisterPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
              
              <div className="input-group-custom">
                <i className="fas fa-check-circle"></i>
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} placeholder="Xác nhận mật khẩu" required />
                <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>

              <div className="register-checkboxes" style={{ display: 'flex', flexDirection: 'column', fontSize: '0.85rem'}}>
                <label className="custom-checkbox-wrapper">
                  <input type="checkbox" required />
                  <span>Tôi xác nhận các thông tin cung cấp là chính xác và đồng ý với các quy định chung khi tạo tài khoản.</span>
                </label>
                <label className="custom-checkbox-wrapper">
                  <input type="checkbox" />
                  <span>Đăng ký nhận thông tin chương trình khuyến mãi, dịch vụ từ VinFast.</span>
                </label>
                <label className="custom-checkbox-wrapper">
                  <input type="checkbox" required />
                  <span>Tôi đồng ý cho phép hệ thống lưu trữ và bảo mật thông tin cá nhân nhằm mục đích quản lý tài khoản.</span>
                </label>
              </div>

              <button type="submit" className="btn-primary-auth" disabled={registerLoading}>
                {registerLoading ? "Đang xử lý..." : "TẠO TÀI KHOẢN"}
              </button>
            </form>
            <div className="mobile-toggle" onClick={() => setIsRightPanelActive(false)}>
              Đã có tài khoản? <b>Đăng nhập</b>
            </div>
          </div>

          {/* Form Đăng nhập */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleLoginSubmit}>
              <h3 className="text-center mb-4 login-header-title">Chào mừng trở lại!</h3>
              <div className="input-group-custom">
                <i className="fas fa-envelope"></i>
                <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Email hoặc số điện thoại" required />
              </div>
              
              <div className="input-group-custom">
                <i className="fas fa-key"></i>
                <input type={showLoginPassword ? "text" : "password"} name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Mật khẩu" required />
                <button type="button" className="password-toggle-btn" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                  <i className={`fas ${showLoginPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>

              <div className="text-right w-100 login-forgot-container">
                <Link to="/forgot-password" className="login-forgot-link">Quên mật khẩu?</Link>
              </div>

              <button type="submit" className="btn-primary-auth" disabled={loginLoading}>
                {loginLoading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
              </button>
            </form>
            <div className="mobile-toggle" onClick={() => setIsRightPanelActive(true)}>
              Chưa có tài khoản? <b>Đăng ký</b>
            </div>
          </div>

          {/* Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h2>Bạn mới tham gia?</h2>
                <p>Tạo tài khoản để tham gia hệ thống của chúng tôi, hưởng thụ các ưu đãi và chọn cho mình xế hộp mơ ước một cách dễ dàng.</p>
                <button className="btn-outline-white" onClick={() => setIsRightPanelActive(true)}>ĐĂNG KÝ</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h2>Đã có tài khoản?</h2>
                <p>Đăng nhập để xem thông tin, tiếp tục mua sắm và nhận các ưu đãi hấp dẫn.</p>
                <button className="btn-outline-white" onClick={() => setIsRightPanelActive(false)}>ĐĂNG NHẬP</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
