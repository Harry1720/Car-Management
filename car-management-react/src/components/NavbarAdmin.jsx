import '../assets/css/components/navbar_admin.css';
import { Link, useLocation } from 'react-router-dom';

const NavbarAdmin = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='navbar_admin_page'>
            <div className="navbar navbar-expand">
                <Link to="/admin/dashboard">
                    <img className="logo" src="https://vinfastauto.com/themes/porto/img/new-home-page/VinFast-logo.svg" alt="VINFAST" />
                </Link>

                <ul className="main-menu">
                    <li>
                        <Link to="/admin/dashboard" 
                              className={currentPath === '/admin/dashboard' ? 'active' : ''}>
                            <ion-icon name="home-outline"></ion-icon> Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/customermanagement" 
                              className={currentPath === '/admin/customermanagement' ? 'active' : ''}>
                            <ion-icon name="people-outline"></ion-icon> Quản lý thông tin khách hàng
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/humanresources" 
                              className={currentPath === '/admin/humanresources' ? 'active' : ''}>
                            <ion-icon name="man-outline"></ion-icon> Quản lý nhân sự
                        </Link>
                    </li>
                    <li className="submenu">
                        <Link to="#"
                            className={currentPath === '/admin/transaction' || currentPath ==='/admin/accounting' ? 'active' : ''}>
                            <ion-icon name="server-outline"></ion-icon> Thông tin doanh thu</Link>
                        <ul>
                            <li>
                                <Link to="/admin/transaction">
                                    <ion-icon name="receipt-outline"></ion-icon> Thông tin giao dịch</Link>
                            </li>
                            <li>
                                <Link to="/admin/accounting">
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
                                <Link to="/admin/carlist">
                                    <ion-icon name="receipt-outline"></ion-icon> Danh sách xe</Link>
                            </li>
                            <li>
                                <Link to="/admin/carnumber">
                                    <ion-icon name="stats-chart-outline"></ion-icon> Quản lý số lượng xe</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/">
                            <ion-icon name="log-out-outline"></ion-icon> Đăng xuất</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-spacer"></div>
        </div>
    );
}

export default NavbarAdmin;