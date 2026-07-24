import "../../assets/css/admin_pages/AdminLogin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  useEffect(() => {
    document.title = "Đăng nhập hệ thống quản trị | VinFast";
    if (authService.isAuthenticated()) {
      const role = localStorage.getItem('role');
      if (role === 'admin' || role === 'employee') {
        navigate("/admin");
      }
    }
  }, [navigate]);

  const handleLoginChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await authService.login(loginData.email, loginData.password, 'admin');
      toast.success("Đăng nhập hệ thống quản trị thành công!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.message || "Tên đăng nhập hoặc mật khẩu không đúng!");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="container_login admin-login-wrapper">
      <div className="login_container admin-login-box">
        <div className="admin-login-inner">
          <div className="admin-login-logo">
            <img src="https://vinfastauto.com/themes/porto/img/new-home-page/VinFast-logo.svg" alt="VINFAST" />
          </div>
          <h3 className="text-center mb-4 admin-login-title">ĐĂNG NHẬP HỆ THỐNG QUẢN TRỊ</h3>
          
          <form onSubmit={handleLoginSubmit}>
            <div className="admin-login-input-group">
              <i className="fas fa-envelope"></i>
              <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Email" required />
            </div>
            
            <div className="admin-login-input-group">
              <i className="fas fa-key"></i>
              <input type={showLoginPassword ? "text" : "password"} name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Mật khẩu" required />
              <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="admin-login-toggle-btn">
                <i className={`fas ${showLoginPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <button type="submit" className="btn-primary-auth admin-login-submit-btn" disabled={loginLoading}>
              {loginLoading ? "Đang xử lý..." : "ĐĂNG NHẬP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
