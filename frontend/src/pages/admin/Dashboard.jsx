import { useEffect, useRef, useState } from 'react';
import '../../assets/css/admin_pages/Dashboard.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import Chart from 'chart.js/auto';
import { dashboardService } from '../../services/dashboardService';

const formatVnd = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0);
};

const Dashboard = () => {
    const lineChartRef = useRef(null);
    const lineChartInstance = useRef(null);
    const pieChartRef = useRef(null);
    const pieChartInstance = useRef(null);
    
    const [stats, setStats] = useState(null);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [lowStockAlerts, setLowStockAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        document.title = "Trang tổng quan | VinFast";
        fetchDashboardData();
        
        return () => {
            if (lineChartInstance.current) lineChartInstance.current.destroy();
            if (pieChartInstance.current) pieChartInstance.current.destroy();
        };
    }, []);
    
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, transactionsRes, monthlyRes, topSellingRes, lowStockRes] = await Promise.all([
                dashboardService.getDashboardStats(),
                dashboardService.getRecentTransactions(10),
                dashboardService.getMonthlyRevenue(),
                dashboardService.getTopSellingCars(),
                dashboardService.getLowStockAlerts()
            ]);
            
            setStats(statsRes);
            setRecentTransactions(transactionsRes || []);
            setLowStockAlerts(lowStockRes || []);
            
            updateCharts(monthlyRes, topSellingRes);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };
    
    const updateCharts = (monthlyData, topSellingData) => {
        if (lineChartInstance.current) lineChartInstance.current.destroy();
        if (pieChartInstance.current) pieChartInstance.current.destroy();
        
        // Line Chart - Revenue over 12 months
        const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
        const currentMonth = new Date().getMonth();
        const labels = [];
        const dataValues = [];
        for(let i = 11; i >= 0; i--) {
            let m = currentMonth - i;
            let yearOffset = 0;
            if(m < 0) {
                m += 12;
                yearOffset = -1;
            }
            labels.push(months[m]);
            const formattedMonthStr = `${new Date().getFullYear() + yearOffset}-${(m+1).toString().padStart(2, '0')}`;
            const found = monthlyData.find(d => d._id === formattedMonthStr);
            dataValues.push(found ? found.total : 0);
        }

        if(lineChartRef.current) {
            lineChartInstance.current = new Chart(lineChartRef.current.getContext('2d'), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Doanh thu (VNĐ)',
                        data: dataValues,
                        borderColor: "#1E3A8A",
                        backgroundColor: 'rgba(30, 58, 138, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }

        // Pie Chart - Top selling cars
        const pieLabels = topSellingData.map(item => item.carDetails[0]?.name || 'Unknown');
        const pieValues = topSellingData.map(item => item.count);
        const pieColors = ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'];
        
        if(pieChartRef.current && pieLabels.length > 0) {
            pieChartInstance.current = new Chart(pieChartRef.current.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: pieLabels,
                    datasets: [{
                        data: pieValues,
                        backgroundColor: pieColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } }
                }
            });
        }
    };
    
    const renderTrend = (value) => {
        const num = parseFloat(value || 0);
        if (num > 0) return <span className="kpi-trend positive">↑ {num}% so với tháng trước</span>;
        if (num < 0) return <span className="kpi-trend negative">↓ {Math.abs(num)}% so với tháng trước</span>;
        return <span className="kpi-trend neutral">- Không đổi</span>;
    };

    const getStatusBadge = (status) => {
        const cls = status?.toLowerCase() || '';
        return <span className={`badge badge-${cls}`}>{status}</span>;
    };

    const userRole = localStorage.getItem('role');

    const renderPieChart = () => (
        <div className={`${userRole === 'admin' ? 'col-1-3' : 'col-1-3'} dashboard-card`}>
            <h2 className="dashboard-card-header">Tỷ trọng xe bán chạy</h2>
            <div className="chart-container" style={{ height: userRole === 'admin' ? '320px' : '280px', margin: 0 }}>
                <canvas ref={pieChartRef}></canvas>
            </div>
        </div>
    );

    const renderInventory = () => (
        <div className={`${userRole === 'admin' ? 'col-1-3' : 'col-2-3'} dashboard-card table_of_dashboard`}>
            <h2 className="dashboard-card-header">Cảnh báo tồn kho</h2>
            <div className="table-wrapper">
                <table className="table table-striped table-hover">
                    <thead className="dashboard-table-header">
                        <tr>
                            <th>Mẫu xe</th>
                            <th>Màu sắc</th>
                            <th>Tồn kho</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="3" className="admin-text-center">Đang tải...</td></tr>
                        ) : lowStockAlerts.length === 0 ? (
                            <tr><td colSpan="3" className="admin-text-center">Kho hàng an toàn</td></tr>
                        ) : (
                            lowStockAlerts.map((car, idx) => (
                                <tr key={idx}>
                                    <td>{car.name}</td>
                                    <td>{car.colorName}</td>
                                    <td><span className="badge badge-cancelled">{car.stock}</span></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <a href="/admin/carlist" className="dashboard-link-none">
                <button className="button dashboard-btn-margin">Quản lý kho xe</button>
            </a>
        </div>
    );

    const renderTransactions = () => (
        <div className={`${userRole === 'admin' ? 'col-2-3' : 'col-3-3'} dashboard-card table_of_dashboard`}>
            <h2 className="dashboard-card-header">Các giao dịch gần nhất</h2>
            <div className="table-wrapper">
                <table className="table table-striped table-hover">
                    <thead className="dashboard-table-header">
                        <tr>
                            <th>Mã GD</th>
                            <th>Khách hàng</th>
                            <th>Ngày GD</th>
                            <th>Ngày thanh toán</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="admin-text-center">Đang tải...</td></tr>
                        ) : recentTransactions.length === 0 ? (
                            <tr><td colSpan="5" className="admin-text-center">Không có dữ liệu</td></tr>
                        ) : (
                            recentTransactions.map((tx, idx) => (
                                <tr key={tx._id || idx}>
                                    <td>{tx._id ? tx._id.substring(0,8) + '...' : 'N/A'}</td>
                                    <td>{tx.customerId?.name || 'N/A'}</td>
                                    <td>{tx.transactionDate ? new Date(tx.transactionDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                    <td>{tx.paymentDate ? new Date(tx.paymentDate).toLocaleDateString('vi-VN') : 'Chưa'}</td>
                                    <td>{getStatusBadge(tx.status)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <a href="/admin/transaction" className="dashboard-link-none">
                <button className="button dashboard-btn-margin">Xem tất cả giao dịch</button>
            </a>
        </div>
    );

    return (
        <>
        <Navbar />
        <div className='dashboard_page'>
            <div className="page-header-block">
                <span className="page-overline">DASHBOARD OVERVIEW</span>
                <h1 className="page-main-title">BẢNG TỔNG QUAN HỆ THỐNG</h1>
                <p className="page-subtitle">Giao diện tổng quan trạng thái, cập nhật dữ liệu máy chủ thực tế tức thời.</p>
            </div>
            
            <div className="content dashboard_container">
                {/* Tầng 1: KPI Cards */}
                <div className={`kpi-cards ${userRole !== 'admin' ? 'kpi-cards-employee' : ''}`}>
                    {userRole === 'admin' && (
                        <div className="kpi-card">
                            <div className="kpi-card-content">
                                <h3>Lợi nhuận / Tồn quỹ</h3>
                                <p className="kpi-value">{formatVnd(stats?.netProfit)}</p>
                                {renderTrend(stats?.revenueTrend)}
                            </div>
                            <div className="kpi-icon"><ion-icon name="wallet-outline"></ion-icon></div>
                        </div>
                    )}
                    <div className="kpi-card">
                        <div className="kpi-card-content">
                            <h3>Tổng số đơn hàng</h3>
                            <p className="kpi-value">{stats?.totalOrders || 0}</p>
                            {renderTrend(stats?.ordersTrend)}
                        </div>
                        <div className="kpi-icon"><ion-icon name="cart-outline"></ion-icon></div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-card-content">
                            <h3>Tổng khách hàng</h3>
                            <p className="kpi-value">{stats?.totalCustomers || 0}</p>
                            {renderTrend(stats?.customersTrend)}
                        </div>
                        <div className="kpi-icon"><ion-icon name="people-outline"></ion-icon></div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-card-content">
                            <h3>Tổng xe tồn kho</h3>
                            <p className="kpi-value">{stats?.totalStock || 0}</p>
                            <span className="kpi-trend neutral">Sẵn sàng giao ngay</span>
                        </div>
                        <div className="kpi-icon"><ion-icon name="car-sport-outline"></ion-icon></div>
                    </div>
                </div>

                {userRole === 'admin' ? (
                    <>
                        {/* Tầng 2: Charts Admin */}
                        <div className="dashboard-grid">
                            <div className="col-2-3 dashboard-card">
                                <h2 className="dashboard-card-header">Doanh thu 12 tháng qua</h2>
                                <div className="chart-container chart-container-350">
                                    <canvas ref={lineChartRef}></canvas>
                                </div>
                            </div>
                            {renderPieChart()}
                        </div>

                        {/* Tầng 3: Data Tables Admin */}
                        <div className="dashboard-grid">
                            {renderTransactions()}
                            {renderInventory()}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Tầng 2: Chart & Inventory Employee */}
                        <div className="dashboard-grid dashboard-grid-employee-row2">
                            {renderPieChart()}
                            {renderInventory()}
                        </div>

                        {/* Tầng 3: Transactions Employee */}
                        <div className="dashboard-grid-employee-row3">
                            {renderTransactions()}
                        </div>
                    </>
                )}
            </div>
            
        </div>
        <Footer></Footer>
        </>
    );
};

export default Dashboard;