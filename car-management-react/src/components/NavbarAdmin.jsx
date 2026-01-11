import '../assets/css/components/navbar_admin.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../services/authService';

const NavbarAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };
    
    const handleLogout = () => {
        if (window.confirm('Đăng xuất khỏi hệ thống?')) {
            authService.logout();
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className='navbar_admin_page'>
            <div className="navbar navbar-expand">
                <Link to="/admin/dashboard" onClick={closeMobileMenu}>
                    <img className="logo" src="https://vinfastauto.com/themes/porto/img/new-home-page/VinFast-logo.svg" alt="VINFAST" />
                </Link>

                <div 
                    className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`main-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    <li>
                        <Link to="/admin/dashboard" 
                              className={currentPath === '/admin/dashboard' ? 'active' : ''}
                              onClick={closeMobileMenu}>
                            <ion-icon name="home-outline"></ion-icon> Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/customermanagement" 
                              className={currentPath === '/admin/customermanagement' ? 'active' : ''}
                              onClick={closeMobileMenu}>
                            <ion-icon name="people-outline"></ion-icon> Quản lý thông tin khách hàng
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/humanresources" 
                              className={currentPath === '/admin/humanresources' ? 'active' : ''}
                              onClick={closeMobileMenu}>
                            <ion-icon name="man-outline"></ion-icon> Quản lý nhân sự
                        </Link>
                    </li>
                    <li className="submenu">
                        <Link to="#"
                            className={currentPath === '/admin/transaction' || currentPath ==='/admin/accounting' ? 'active' : ''}>
                            <ion-icon name="server-outline"></ion-icon> Thông tin doanh thu</Link>
                        <ul>
                            <li>
                                <Link to="/admin/transaction" onClick={closeMobileMenu}>
                                    <ion-icon name="receipt-outline"></ion-icon> Thông tin giao dịch</Link>
                            </li>
                            <li>
                                <Link to="/admin/accounting" onClick={closeMobileMenu}>
                                    <ion-icon name="stats-chart-outline"></ion-icon> Thống kê doanh thu</Link>
                            </li>
                        </ul>

                    </li>

                    <li className="submenu">
                        <Link to="#"
                            className={currentPath === '/admin/carlist' || currentPath ==='/admin/carnumber' ? 'active' : ''}>
                            <ion-icon name="car-sport-outline"></ion-icon> Thông tin về xe</Link>
                        <ul>
                            <li>
                                <Link to="/admin/carlist" onClick={closeMobileMenu}>
                                    <ion-icon name="receipt-outline"></ion-icon> Danh sách xe</Link>
                            </li>
                            <li>
                                <Link to="/admin/carnumber" onClick={closeMobileMenu}>
                                    <ion-icon name="stats-chart-outline"></ion-icon> Quản lý số lượng xe</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a onClick={handleLogout} style={{cursor: 'pointer'}}>
                            <ion-icon name="log-out-outline"></ion-icon> Đăng xuất</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-spacer"></div>
        </div>
    );
}

export default NavbarAdmin;