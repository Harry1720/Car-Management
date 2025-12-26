import { useEffect, useRef, useState } from 'react';
import '../../assets/css/admin_pages/Dashboard.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import Chart from 'chart.js/auto';

const Dashboard = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [recentTransactions, setRecentTransactions] = useState([
        {
            id: "TR001",
            citizenId: "079203012345",
            carId: "VINVF8B",
            transactionDate: "2023-10-25",
            paymentDate: "2023-10-26",
            warrantyDate: "2025-10-26",
            status: "Đã thanh toán"
        },
        {
            id: "TR002",
            citizenId: "079203012346",
            carId: "VINVF9BL",
            transactionDate: "2023-10-24",
            paymentDate: "2023-10-24",
            warrantyDate: "2025-10-24",
            status: "Đã thanh toán"
        },
        {
            id: "TR003",
            citizenId: "079203012347",
            carId: "VINVF7B",
            transactionDate: "2023-10-23",
            paymentDate: null,
            warrantyDate: null,
            status: "Chờ thanh toán"
        },
        {
            id: "TR004",
            citizenId: "079203012348",
            carId: "VINVF6G",
            transactionDate: "2023-10-22",
            paymentDate: "2023-10-23",
            warrantyDate: "2025-10-23",
            status: "Đã thanh toán"
        },
        {
            id: "TR005",
            citizenId: "079203012349",
            carId: "VINVF5B",
            transactionDate: "2023-10-21",
            paymentDate: null,
            warrantyDate: null,
            status: "Đã hủy"
        }
    ]);

    const [agencyInfo, setAgencyInfo] = useState([
        {
            id: "AGENCY1",
            name: "VinFast Landmark 81",
            address: "208 Nguyễn Hữu Cảnh, Quận Bình Thạnh, TP.HCM",
            phone: "1900 23 23 89",
            email: "landmark81@vinfast.vn",
            password: "********"
        },
        {
            id: "AGENCY2",
            name: "VinFast Vinhomes Central Park",
            address: "720A Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
            phone: "1900 23 23 90",
            email: "centralpark@vinfast.vn",
            password: "********"
        },
        {
            id: "AGENCY3",
            name: "VinFast Royal City",
            address: "72A Nguyễn Trãi, Thanh Xuân, Hà Nội",
            phone: "1900 23 23 91",
            email: "royalcity@vinfast.vn",
            password: "********"
        }
    ]);

    useEffect(() => {
        document.title = "Trang tổng quan | VinFast";

        // Khởi tạo chart
        const lineChartData = {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
            datasets: [{
                label: 'Sales',
                data: [0, 1, 2, 9, 20, 15, 5, 21, 0],
                borderColor: "#1a90ff ",
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
                        color: '#7c7c7c' // Màu của số trên trục y
                    },
                    grid: {
                        color: '#ababab', // Màu của lưới trục y
                        borderColor: '#ababab' // Màu của trục y
                    }
                },
                x: {
                    ticks: {
                        color: '#7c7c7c' // Màu của số trên trục x
                    },
                    grid: {
                        color: '#ababab', // Màu của lưới trục x
                        borderColor: '#ababab' // Màu của trục x
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff', // Màu chữ của legend
                    }
                }
            }
        };
            
        // Tạo chart mới
        chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
            type: 'line',
            data: lineChartData,
            options: lineChartOptions
        });
    }, []);

    return (
        <><Navbar />
        <div className='dashboard_page'>
            
            <div className="content dashboard_container">
                <div className="card1">
                    <h2 style={{textAlign: 'center'}}>Thống kê số lượng xe bán được theo ngày</h2>
                    <fieldset>
                        <label>
                            Vui lòng chọn ngày: 
                            <input type="date" min="2023-01-01"/>
                        </label>
                        <button className='button graph_btn'
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
                                    <th>CCCD</th>
                                    <th>Mã xe</th>
                                    <th>Ngày giao dịch</th>
                                    <th>Ngày thanh toán</th>
                                    <th>Thời hạn bảo hành</th>
                                    <th>Trạng thái giao dịch</th>
                                </tr>
                            </thead>
                            <tbody id="dashboard">
                                {recentTransactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.citizenId}</td>
                                        <td>{transaction.carId}</td>
                                        <td>{transaction.transactionDate}</td>
                                        <td>{transaction.paymentDate || 'Chưa thanh toán'}</td>
                                        <td>{transaction.warrantyDate || 'Không có'}</td>
                                        <td>{transaction.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <a href="/admin/transaction" style={{textDecoration: 'none'}}>
                        <button className="button" style={{marginTop: '20px'}}>Xem thêm giao dịch</button>
                    </a>
                </div>

                <div className="card table_of_dashboard">
                    <h2 style={{textAlign: 'center'}}>Thông tin đại lý</h2>
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead style={{backgroundColor: 'rgb(26, 144, 255)', color: '#ffffff'}}>
                                <tr>
                                    <th>Mã đại lý</th>
                                    <th>Tên đại lý</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agencyInfo.map((agency, index) => (
                                    <tr key={index}>
                                        <td>{agency.id}</td>
                                        <td>{agency.name}</td>
                                        <td>{agency.address}</td>
                                        <td>{agency.phone}</td>
                                        <td>{agency.email}</td>
                                        <td>{agency.password}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
        <Footer></Footer>
        </>
    );
};

export default Dashboard;