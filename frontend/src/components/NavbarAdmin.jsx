import '../assets/css/components/navbar_admin.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../services/authService';

const NavbarAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true); // sidebar collapsed state by default

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
        <div className={`navbar_admin_page ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className={`navbar ${isCollapsed ? 'collapsed' : ''}`}
                 onMouseEnter={() => window.innerWidth > 768 && setIsCollapsed(false)}
                 onMouseLeave={() => window.innerWidth > 768 && setIsCollapsed(true)}>
                <div className = 'brand'>
                    <Link to="/admin/dashboard" onClick={closeMobileMenu} className='logo_navbar'>
                        <img className="logo logo-full" src="https://vinfastauto.com/themes/porto/img/new-home-page/VinFast-logo.svg" alt="VINFAST" />
                        <img className="logo logo-icon" src="/images/tab_logo.png" alt="VINFAST" />
                    </Link>
                </div>
                <div 
                    className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`main-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
                    <li>
                        <Link to="/admin/dashboard" 
                              className={currentPath === '/admin/dashboard' ? 'active' : ''}
                              onClick={closeMobileMenu}>
                            <ion-icon name="home-outline"></ion-icon> 
                            <span className="label text-label">Trang chủ</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/customermanagement" 
                                className={currentPath === '/admin/customermanagement' ? 'active' : ''}
                                onClick={closeMobileMenu}>
                            <ion-icon name="people-outline"></ion-icon> 
                            <span className="label text-label">Quản lý thông tin khách hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/humanresources" 
                              className={currentPath === '/admin/humanresources' ? 'active' : ''}
                              onClick={closeMobileMenu}>
                            <ion-icon name="man-outline"></ion-icon> 
                            <span className="label text-label">Quản lý nhân sự</span>
                        </Link>
                    </li>
                    <li className="menu-group-label">
                        <span className="label text-label">Doanh thu & Giao dịch</span>
                    </li>
                    <li>
                        <Link to="/admin/transaction" 
                              className={currentPath === '/admin/transaction' ? 'active' : ''}
                              onClick={closeMobileMenu}>
                            <ion-icon name="receipt-outline"></ion-icon> 
                            <span className="label text-label">Thông tin giao dịch</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/accounting" 
                              className={currentPath === '/admin/accounting' ? 'active' : ''}
                              onClick={closeMobileMenu}>
                            <ion-icon name="stats-chart-outline"></ion-icon> 
                            <span className="label text-label">Thống kê doanh thu</span>
                        </Link>
                    </li>

                    <li className="menu-group-label">
                        <span className="label text-label">Quản lý Xe</span>
                    </li>
                    <li>
                        <Link to="/admin/carlist" 
                              className={currentPath === '/admin/carlist' ? 'active' : ''}
                              onClick={closeMobileMenu}>
                            <ion-icon name="car-sport-outline"></ion-icon> 
                            <span className="label text-label">Danh sách xe</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/carnumber" 
                              className={currentPath === '/admin/carnumber' ? 'active' : ''}
                              onClick={closeMobileMenu}>
                            <ion-icon name="car-outline"></ion-icon> 
                            <span className="label text-label">Số lượng xe</span>
                        </Link>
                    </li>

                    <li className="logout-item">
                        <a onClick={handleLogout} className="logout-btn-red" style={{cursor: 'pointer'}}>
                            <ion-icon name="log-out-outline"></ion-icon> <span className="label text-label">Đăng xuất</span></a>
                    </li>
                </ul>
            </div>
            {/* <div className="navbar-spacer"></div> */}
        </div>
    );
}

export default NavbarAdmin;