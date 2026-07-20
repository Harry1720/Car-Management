import { useEffect, useRef, useState } from 'react';
import '../../assets/css/admin_pages/Dashboard.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import Chart from 'chart.js/auto';
import { dashboardService } from '../../services/dashboardService';

const Dashboard = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [agencyInfo, setAgencyInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [chartData, setChartData] = useState(null);
    
    useEffect(() => {
        fetchDashboardData();
        fetchTransactionStats(selectedDate);
    }, []);
    
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [transactionsRes, statsRes] = await Promise.all([
                dashboardService.getRecentTransactions(10),
                dashboardService.getDashboardStats()
            ]);
            
            setRecentTransactions(transactionsRes || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };
    
    const fetchTransactionStats = async (date) => {
        try {
            const response = await dashboardService.getTransactionStatistics(date);
            updateChart(response);
        } catch (error) {
            console.error('Error fetching transaction stats:', error);
            // Show empty chart on error
            updateChart({ hourlyData: Array(9).fill(0) });
        }
    };
    
    const updateChart = (data) => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        
        const lineChartData = {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
            datasets: [{
                label: 'Số lượng giao dịch',
                data: data?.hourlyData || [],
                borderColor: "#1a90ff",
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderWidth: 3,
                fill: true
            }]
        };

        const lineChartOptions = {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5,
                        color: '#7c7c7c'
                    },
                    grid: {
                        color: '#ababab',
                        borderColor: '#ababab'
                    }
                },
                x: {
                    ticks: {
                        color: '#7c7c7c'
                    },
                    grid: {
                        color: '#ababab',
                        borderColor: '#ababab'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                    }
                }
            }
        };
        
        chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
            type: 'line',
            data: lineChartData,
            options: lineChartOptions
        });
    };
    
    const handleDateChange = () => {
        fetchTransactionStats(selectedDate);
    };

    useEffect(() => {
        document.title = "Trang tổng quan | VinFast";
        updateChart({});
        
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <><Navbar />
        <div className='dashboard_page'>
            <div className="page-header-block">
                <span className="page-overline">DASHBOARD OVERVIEW</span>
                <h1 className="page-main-title">BẢNG TỔNG QUAN HỆ THỐNG</h1>
                <p className="page-subtitle">Giao diện tổng quan trạng thái, cập nhật dữ liệu máy chủ thực tế tức thời.</p>
            </div>
            
            <div className="content dashboard_container">
                <div className="card1">
                    <h2 style={{textAlign: 'center'}}>Thống kê số lượng xe bán được theo ngày</h2>
                    <fieldset>
                        <label>
                            Vui lòng chọn ngày: 
                            <input 
                                type="date" 
                                min="2023-01-01"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </label>
                        <button 
                            className='button graph_btn'
                            onClick={handleDateChange}
                            style={{
                                border: 'none',
                                color: 'white',
                                fontWeight: 600,
                                padding: '5px 10px'
                            }}
                        >
                            Chọn
                        </button>
                    </fieldset>
                    <div className="chart-container">
                        <canvas ref={chartRef} id="lineChart"></canvas>
                    </div>
                </div>

                <div className="card table_of_dashboard">
                    <h2 style={{textAlign: 'center'}}>Các giao dịch gần nhất</h2>
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead style={{backgroundColor: 'rgb(26, 144, 255)', color: '#ffffff'}}>
                                <tr>
                                    <th>Mã giao dịch</th>
                                    <th>Khách hàng</th>
                                    <th>Mã đặt cọc</th>
                                    <th>Ngày giao dịch</th>
                                    <th>Ngày thanh toán</th>
                                    <th>Thời hạn bảo hành</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody id="dashboard">
                                {loading ? (
                                    <tr><td colSpan="7" style={{textAlign: 'center'}}>Đang tải...</td></tr>
                                ) : recentTransactions.length === 0 ? (
                                    <tr><td colSpan="7" style={{textAlign: 'center'}}>Không có dữ liệu</td></tr>
                                ) : (
                                recentTransactions.map((transaction, index) => (
                                    <tr key={transaction._id || index}>
                                        <td>{transaction._id || 'N/A'}</td>
                                        <td>{transaction.customerId?.name || 'N/A'}</td>
                                        <td>{transaction.depositId?._id || 'N/A'}</td>
                                        <td>{transaction.transactionDate ? new Date(transaction.transactionDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                        <td>{transaction.paymentDate ? new Date(transaction.paymentDate).toLocaleDateString('vi-VN') : 'Chưa thanh toán'}</td>
                                        <td>{transaction.warrantyDate ? new Date(transaction.warrantyDate).toLocaleDateString('vi-VN') : 'Không có'}</td>
                                        <td>{transaction.status || 'N/A'}</td>
                                    </tr>
                                ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <a href="/admin/transaction" style={{textDecoration: 'none'}}>
                        <button className="button" style={{marginTop: '20px'}}>Xem thêm giao dịch</button>
                    </a>
                </div>
            </div>
            
        </div>
        <Footer></Footer>
        </>
    );
};

export default Dashboard;