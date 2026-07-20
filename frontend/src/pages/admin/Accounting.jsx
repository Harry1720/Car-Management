import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/Accounting.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import { depositService } from '../../services/depositService';

const AccountingPage = () => {
    const [depositData, setDepositData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        fetchDepositData();
    }, []);
    
    const fetchDepositData = async () => {
        try {
            setLoading(true);
            const response = await depositService.getAllDeposits();
            console.log('Deposit response:', response);
            const data = response.deposits || response.data || response;
            if (data && Array.isArray(data)) {
                setDepositData(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching deposit data:', error);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        document.title = "Kế toán | VinFast";
    }, []);

    return(
        <>
            <Navbar/>
            <div className="accounting-page">
                <div className="page-header-block">
                    <span className="page-overline">REVENUE MANAGEMENT</span>
                    <h1 className="page-main-title">DANH SÁCH DOANH THU</h1>
                    <p className="page-subtitle">Quản lý và tra cứu thông tin doanh thu, hóa đơn thanh toán.</p>
                </div>

                <div className="row" id="add-row-form3">
                    <div className="col">
                        <input 
                            type="text" 
                            id="id-search" 
                            placeholder="Tìm kiếm theo mã đặt cọc hoặc tên khách hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="table table-hover table-sortable table-bordered">
                        <thead>
                            <tr>
                                <th>Mã đặt cọc</th>
                                <th>Khách hàng</th>
                                <th>Xe</th>
                                <th>Số tiền đặt cọc</th>
                                <th>Tổng giá xe</th>
                                <th>Còn lại</th>
                                <th>Ngày đặt cọc</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody style={{backgroundColor: "rgb(245, 252, 255)"}}>
                            {loading ? (
                                <tr><td colSpan="8" style={{textAlign: 'center'}}>Đang tải...</td></tr>
                            ) : depositData.length === 0 ? (
                                <tr><td colSpan="8" style={{textAlign: 'center'}}>Không có dữ liệu</td></tr>
                            ) : (
                            depositData
                                .filter(deposit => {
                                    const searchStr = searchTerm.toLowerCase();
                                    const depositId = deposit._id?.toString() || '';
                                    const customerName = deposit.customerId?.name || '';
                                    return depositId.includes(searchStr) || customerName.toLowerCase().includes(searchStr);
                                })
                                .map((deposit, index) => {
                                    const statusMap = {
                                        'pending': 'Chờ xác nhận',
                                        'confirmed': 'Đã xác nhận',
                                        'completed': 'Hoàn thành',
                                        'cancelled': 'Đã hủy'
                                    };
                                    return (
                                        <tr key={deposit._id || index}>
                                            <td>{deposit._id?.slice(-6) || 'N/A'}</td>
                                            <td>{deposit.customerId?.name || 'N/A'}</td>
                                            <td>{deposit.carId?.name || deposit.carId?.model_car_name || 'N/A'}</td>
                                            <td>{deposit.depositAmount ? `${deposit.depositAmount.toLocaleString()} VNĐ` : 'N/A'}</td>
                                            <td>{deposit.totalPrice ? `${deposit.totalPrice.toLocaleString()} VNĐ` : 'N/A'}</td>
                                            <td>{deposit.remainingBalance ? `${deposit.remainingBalance.toLocaleString()} VNĐ` : 'N/A'}</td>
                                            <td>{deposit.depositDate ? new Date(deposit.depositDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                            <td>{statusMap[deposit.status] || deposit.status || 'N/A'}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default AccountingPage;