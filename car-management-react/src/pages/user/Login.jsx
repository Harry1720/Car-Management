import '../../assets/css/user_pages/Login.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = "Đăng nhập | VinFast";
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const result = await authService.login(formData.email, formData.password);
            alert("Đăng nhập thành công!");
            // Redirect to admin dashboard
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || "Đăng nhập thất bại. Vui lòng kiểm tra email và password.");
            alert(err.message || "Tên đăng nhập hoặc mật khẩu không đúng!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container_login">
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
                                {error && <div className="alert alert-danger">{error}</div>}
                                <form id="login-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <i className="fas fa-user"></i>
                                        <label htmlFor="email"><b>Email</b></label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="admin@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <i className="fas fa-key"></i>
                                        <label htmlFor="password"><b>Mật khẩu</b></label>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Nhập mật khẩu"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                        {loading ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;