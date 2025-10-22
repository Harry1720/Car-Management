import '../../assets/css/user_pages/Login.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    
    // Hardcoded credentials
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "admin123";

    useEffect(() => {
        document.title = "Đăng nhập | VinFast";
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check credentials
        if (formData.username === ADMIN_USERNAME && formData.password === ADMIN_PASSWORD) {
            // Login successful
            alert("Đăng nhập thành công!");
            // Redirect to admin dashboard
            navigate('/admin/dashboard');
        } else {
            // Login failed
            alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
    };

    return (
        <>
            <Navbar activePage="" />
            <div className="login_container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header text-center">
                                <h3>Đăng Nhập</h3>
                            </div>
                            <div className="card-body">
                                <div className="subtittle">(Chỉ dành cho Nhân viên Quản lý Đại lý)</div>
                                <form id="login-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <i className="fas fa-user"></i>
                                        <label htmlFor="username">Tên đăng nhập</label>
                                        <input 
                                            type="text" 
                                            id="username" 
                                            name="username"
                                            className="form-control"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <i className="fas fa-key"></i>
                                        <label htmlFor="password">Mật khẩu</label>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">
                                        ĐĂNG NHẬP
                                    </button>
                                </form>
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