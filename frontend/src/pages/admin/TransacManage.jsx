import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/Transaction.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import { transactionService } from '../../services/transactionService';

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        fetchTransactions();
    }, []);
    
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await transactionService.getAllTransactions();
            console.log('Transactions response:', response);
            const data = response.transactions || response.data || response;
            if (data && Array.isArray(data)) {
                setTransactions(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Quản lý giao dịch | VinFast";
    }, []);

    return(
        <>
            <Navbar/>
            <div className="transaction-page">
                <div className="page-header-block">
                    <span className="page-overline">TRANSACTION MANAGEMENT</span>
                    <h1 className="page-main-title">QUẢN LÝ GIAO DỊCH</h1>
                    <p className="page-subtitle">Quản lý và tra cứu thông tin giao dịch, thanh toán cọc xe.</p>
                </div>

                <div className="row" id="add-row-form3">
                    <div className="col">
                        <input 
                            type="text" 
                            id="id-search" 
                            placeholder="Tìm kiếm theo mã giao dịch..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="table table-hover table-sortable table-bordered">
                        <thead>
                            <tr>
                                <th>Mã giao dịch</th>
                                <th>Khách hàng</th>
                                <th>Mã đặt cọc</th>
                                <th>Số tiền</th>
                                <th>Phương thức thanh toán</th>
                                <th>Ngày giao dịch</th>
                                <th>Trạng thái</th>
                                <th>Mô tả</th>
                            </tr>
                        </thead>
                        <tbody className="admin-table-body">
                            {loading ? (
                                <tr><td colSpan="8" className="admin-text-center">Đang tải...</td></tr>
                            ) : transactions.length === 0 ? (
                                <tr><td colSpan="8" className="admin-text-center">Không có dữ liệu</td></tr>
                            ) : (
                            transactions
                                .filter(transaction => {
                                    const searchStr = searchTerm.toLowerCase();
                                    const transId = transaction._id?.toString() || '';
                                    const customerName = transaction.customerId?.name || transaction.customerId?.customer_name || '';
                                    return transId.includes(searchStr) || customerName.toLowerCase().includes(searchStr);
                                })
                                .map((transaction, index) => {
                                    const paymentMethodMap = {
                                        'cash': 'Tiền mặt',
                                        'bank_transfer': 'Chuyển khoản',
                                        'credit_card': 'Thẻ tín dụng',
                                        'check': 'Séc'
                                    };
                                    const statusMap = {
                                        'pending': 'Chờ xử lý',
                                        'completed': 'Hoàn thành',
                                        'failed': 'Thất bại',
                                        'refunded': 'Đã hoàn tiền'
                                    };
                                    return (
                                        <tr key={transaction._id || index}>
                                            <td>{transaction._id?.slice(-6) || 'N/A'}</td>
                                            <td>{transaction.customerId?.name || transaction.customerId?.customer_name || 'N/A'}</td>
                                            <td>{transaction.depositId?._id?.slice(-6) || transaction.depositId || 'N/A'}</td>
                                            <td>{transaction.amount ? `${transaction.amount.toLocaleString()} VNĐ` : 'N/A'}</td>
                                            <td>{paymentMethodMap[transaction.paymentMethod] || transaction.paymentMethod || 'N/A'}</td>
                                            <td>{transaction.transactionDate ? new Date(transaction.transactionDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                            <td>{statusMap[transaction.status] || transaction.status || 'N/A'}</td>
                                            <td>{transaction.description || 'N/A'}</td>
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

export default TransactionPage;
