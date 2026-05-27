import "../../assets/css/user_pages/Login.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Đăng nhập | VinFast";

    // Nếu đã đăng nhập, chuyển hướng đến dashboard
    if (authService.isAuthenticated()) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.login(formData.email, formData.password);
      alert("Đăng nhập thành công!");
      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra email và password.",
      );
      alert(err.message || "Tên đăng nhập hoặc mật khẩu không đúng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar activePage="login" />
      <div className="container_login">
        <div className="login_container">
          <div className="">
            <div className="col-md-4">
              <div className="card">
                {/* <div className="card-header text-center">
                  <h3>Đăng nhập</h3>
                </div> */}
                <div className="card-body">
                  {/* <div className="subtittle">
                    (Chỉ dành cho Nhân viên Quản lý Đại lý)
                  </div> */}
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="field-heading">
                        <i className="fas fa-user"></i>
                        <label htmlFor="email">
                          <b>Email</b>
                        </label>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Nhập email của bạn"
                        required
                      />
                    </div>
                    <div className="form-group2">
                      <div className="field-heading">
                        <i className="fas fa-key"></i>
                        <label htmlFor="password">
                          <b>Mật khẩu</b>
                        </label>
                      </div>
                      <div className="password-input-wrap">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Nhập mật khẩu của bạn"
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={
                            showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                          }
                          aria-pressed={showPassword}
                        >
                          <i
                            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>
                    {/* <span>Bạn chưa có tài khoản?<a> Hãy đăng ký ngay!</a></span> */}

                    <button
                      type="submit"
                      className="btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
