import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/Accounting.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import { depositService } from '../../services/depositService';
import { transactionService } from '../../services/transactionService';
import { toast } from 'react-toastify';

const AccountingPage = () => {
    const [depositData, setDepositData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal state
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderTransactions, setOrderTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Payment Form state
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
    const [discountName, setDiscountName] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [submittingPayment, setSubmittingPayment] = useState(false);
    
    useEffect(() => {
        fetchDepositData();
    }, []);
    
    const fetchDepositData = async () => {
        try {
            setLoading(true);
            const response = await depositService.getAllDeposits();
            const data = response.deposits || response.data || response;
            if (data && Array.isArray(data)) {
                setDepositData(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders data:', error);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        document.title = "Danh sách Đơn hàng | VinFast";
    }, []);

    const openModal = async (order) => {
        setSelectedOrder(order);
        setPaymentAmount(order.remainingBalance || 0);
        setDiscountName('');
        setDiscountAmount('');
        setPaymentMethod('bank_transfer');
        setIsModalOpen(true);
        
        // Fetch transactions
        try {
            setLoadingTransactions(true);
            const data = await transactionService.getTransactionsByDepositId(order._id);
            setOrderTransactions(data || []);
            setLoadingTransactions(false);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setLoadingTransactions(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
        setOrderTransactions([]);
    };

    const handleCreatePayment = async (e) => {
        e.preventDefault();
        if (!paymentAmount || isNaN(paymentAmount) || Number(paymentAmount) <= 0) {
            toast.error('Vui lòng nhập số tiền hợp lệ');
            return;
        }

        try {
            setSubmittingPayment(true);
            const payload = {
                depositId: selectedOrder._id,
                customerId: selectedOrder.customerId?._id || selectedOrder.customerId,
                carId: selectedOrder.carId?._id || selectedOrder.carId,
                amount: Number(paymentAmount),
                paymentMethod,
                description: `Thanh toán phần còn lại cho đơn hàng ${selectedOrder._id.slice(-6)}`,
                discountName: discountName || '',
                discountAmount: Number(discountAmount) || 0
            };

            await transactionService.createTransaction(payload);
            toast.success('Tạo thanh toán thành công!');
            
            // Refresh data
            fetchDepositData();
            closeModal();
            setSubmittingPayment(false);
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error.response?.data?.message || 'Lỗi khi tạo thanh toán');
            setSubmittingPayment(false);
        }
    };

    const statusMap = {
        'pending': 'Chờ cọc',
        'confirmed': 'Đã cọc',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };

    const methodMap = {
        'cash': 'Tiền mặt',
        'bank_transfer': 'Chuyển khoản',
        'credit_card': 'Thẻ tín dụng',
        'check': 'Séc'
    };

    return(
        <>
            <Navbar/>
            <div className="accounting-page">
                <div className="page-header-block">
                    <span className="page-overline">ORDER MANAGEMENT</span>
                    <h1 className="page-main-title">DANH SÁCH ĐƠN HÀNG</h1>
                    <p className="page-subtitle">Quản lý toàn bộ vòng đời đơn hàng, theo dõi thanh toán và giao xe.</p>
                </div>

                <div className="row" id="add-row-form3">
                    <div className="col">
                        <input 
                            type="text" 
                            id="id-search" 
                            placeholder="Tìm kiếm theo mã đơn hoặc tên khách hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="table table-hover table-sortable table-bordered">
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Xe</th>
                                <th>Tổng tiền</th>
                                <th>Đã thanh toán</th>
                                <th>Còn lại</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="admin-table-body">
                            {loading ? (
                                <tr><td colSpan="7" className="admin-text-center">Đang tải...</td></tr>
                            ) : depositData.length === 0 ? (
                                <tr><td colSpan="7" className="admin-text-center">Không có dữ liệu</td></tr>
                            ) : (
                            depositData
                                .filter(deposit => {
                                    const searchStr = searchTerm.toLowerCase();
                                    const depositId = deposit._id?.toString() || '';
                                    const customerName = deposit.customerId?.name || '';
                                    return depositId.includes(searchStr) || customerName.toLowerCase().includes(searchStr);
                                })
                                .map((deposit, index) => {
                                    return (
                                        <tr key={deposit._id || index} onClick={() => openModal(deposit)} className="cursor-pointer">
                                            <td>{deposit._id?.slice(-6).toUpperCase() || 'N/A'}</td>
                                            <td>{deposit.customerId?.name || 'N/A'}</td>
                                            <td>{deposit.carId?.name || deposit.carId?.model_car_name || 'N/A'}</td>
                                            <td>{deposit.totalPrice ? `${deposit.totalPrice.toLocaleString()} ₫` : 'N/A'}</td>
                                            <td>{(deposit.depositAmount || 0).toLocaleString()} ₫</td>
                                            <td>{deposit.remainingBalance ? `${deposit.remainingBalance.toLocaleString()} ₫` : '0 ₫'}</td>
                                            <td>
                                                <span className={`status-badge ${deposit.status}`}>
                                                    {statusMap[deposit.status] || deposit.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Detail Modal */}
            {isModalOpen && selectedOrder && (
                <div className="modal-overlay">
                    <div className="modal-content modal-content-lg">
                        <div className="modal-header">
                            <h2>Chi tiết Đơn hàng #{selectedOrder._id?.slice(-6).toUpperCase()}</h2>
                            <button className="close-btn" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="modal-body">
                            {/* Block 1: Info */}
                            <div className="info-block">
                                <h3>Thông tin chung</h3>
                                <div className="info-grid grid-2-cols">
                                    <div>
                                        <p><strong>Khách hàng:</strong> {selectedOrder.customerId?.name}</p>
                                        <p><strong>Ngày tạo:</strong> {new Date(selectedOrder.depositDate).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                    <div>
                                        <p><strong>Xe:</strong> {selectedOrder.carId?.name || selectedOrder.carId?.model_car_name}</p>
                                        <p><strong>Trạng thái:</strong> <span className={`status-badge ${selectedOrder.status}`}>{statusMap[selectedOrder.status]}</span></p>
                                    </div>
                                </div>
                            </div>

                            <hr className="hr-divider" />

                            {/* Block 2: Financial Summary */}
                            <div className="finance-block">
                                <h3>Tiến độ Thanh toán</h3>
                                <ul className="list-unstyled list-lg">
                                    <li className="flex-between mb-10">
                                        <span>Tổng giá trị xe:</span>
                                        <strong>{(selectedOrder.totalPrice + (selectedOrder.discountAmount || 0)).toLocaleString()} ₫</strong>
                                    </li>
                                    {selectedOrder.discountAmount > 0 && (
                                        <li className="flex-between mb-10 text-success">
                                            <span>Ưu đãi áp dụng ({selectedOrder.discountNote || 'Không có ghi chú'}):</span>
                                            <strong>- {selectedOrder.discountAmount.toLocaleString()} ₫</strong>
                                        </li>
                                    )}
                                    <li className="flex-between mb-10">
                                        <span>Đã thanh toán (Cọc + Các đợt):</span>
                                        <strong>{(selectedOrder.depositAmount).toLocaleString()} ₫</strong>
                                    </li>
                                    <li className="flex-between total-row">
                                        <span>Cần thu thêm:</span>
                                        <strong className="text-danger">{(selectedOrder.remainingBalance || 0).toLocaleString()} ₫</strong>
                                    </li>
                                </ul>
                            </div>

                            <hr className="hr-divider" />

                            {/* Block 3: Transactions Table */}
                            <div className="transaction-block">
                                <h3>Lịch sử Giao dịch</h3>
                                {loadingTransactions ? (
                                    <p>Đang tải giao dịch...</p>
                                ) : orderTransactions.length === 0 ? (
                                    <p>Chưa có giao dịch nào.</p>
                                ) : (
                                    <table className="table table-bordered table-sm table-sm-text">
                                        <thead>
                                            <tr>
                                                <th>Ngày</th>
                                                <th>Số tiền</th>
                                                <th>Phương thức</th>
                                                <th>Người tạo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderTransactions.map(tx => (
                                                <tr key={tx._id}>
                                                    <td>{new Date(tx.transactionDate).toLocaleDateString('vi-VN')}</td>
                                                    <td>{tx.amount?.toLocaleString()} ₫</td>
                                                    <td>{methodMap[tx.paymentMethod] || tx.paymentMethod}</td>
                                                    <td>{tx.createdBy?.name || 'Hệ thống'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Block 4: Payment Form if remaining balance > 0 */}
                            {selectedOrder.remainingBalance > 0 && (
                                <>
                                    <hr className="hr-divider" />
                                    <div className="payment-form-block">
                                        <h3>Tạo Giao dịch Thanh toán</h3>
                                        <form onSubmit={handleCreatePayment}>
                                            <div className="grid-2-cols mb-15">
                                                <div>
                                                    <label>Số tiền thanh toán (VNĐ)</label>
                                                    <input type="number" className="form-control" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} required min="1" max={selectedOrder.remainingBalance} />
                                                </div>
                                                <div>
                                                    <label>Phương thức</label>
                                                    <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                                        <option value="bank_transfer">Chuyển khoản</option>
                                                        <option value="cash">Tiền mặt</option>
                                                        <option value="credit_card">Thẻ tín dụng</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid-2-cols mb-15 bg-light-gray p-15 radius-8">
                                                <div className="col-span-2">
                                                    <h4 className="promo-heading">Phần Khuyến Mãi (Tùy chọn)</h4>
                                                    <p className="promo-subtitle">Nhập số tiền giảm thẳng vào tổng giá trị đơn hàng.</p>
                                                </div>
                                                <div>
                                                    <label>Tên khuyến mãi / Ghi chú</label>
                                                    <input type="text" className="form-control" placeholder="VD: Khách hàng thân thiết" value={discountName} onChange={(e) => setDiscountName(e.target.value)} />
                                                </div>
                                                <div>
                                                    <label>Số tiền giảm (VNĐ)</label>
                                                    <input type="number" className="form-control" placeholder="0" value={discountAmount} onChange={(e) => setDiscountAmount(e.target.value)} min="0" />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100" disabled={submittingPayment}>
                                                {submittingPayment ? 'Đang xử lý...' : 'Xác nhận Thanh toán'}
                                            </button>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </>
    );
};

export default AccountingPage;