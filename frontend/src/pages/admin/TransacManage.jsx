import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/Transaction.css';
import '../../assets/css/admin_pages/AdminModal.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import { accountingService } from '../../services/accountingService';
import { toast } from 'react-toastify';

const LedgerPage = () => {
    const [ledgerData, setLedgerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal state for Creating Voucher
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        type: 'income',
        category: 'other',
        amount: '',
        description: ''
    });
    
    useEffect(() => {
        fetchLedgerData();
    }, []);
    
    const fetchLedgerData = async () => {
        try {
            setLoading(true);
            const response = await accountingService.getAccountingData();
            const data = response.records || response.data || response;
            if (data && Array.isArray(data)) {
                setLedgerData(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ledger data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Kế toán | VinFast";
    }, []);

    const handleOpenModal = () => {
        setFormData({
            type: 'income',
            category: 'other',
            amount: '',
            description: ''
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.amount || Number(formData.amount) <= 0) {
            toast.error('Vui lòng nhập số tiền hợp lệ');
            return;
        }

        try {
            setSubmitting(true);
            const d = new Date();
            const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            
            const payload = {
                ...formData,
                amount: Number(formData.amount),
                month
            };

            await accountingService.createAccounting(payload);
            toast.success('Tạo phiếu thành công!');
            fetchLedgerData();
            handleCloseModal();
            setSubmitting(false);
        } catch (error) {
            console.error('Error creating voucher:', error);
            toast.error(error.response?.data?.message || 'Lỗi khi tạo phiếu');
            setSubmitting(false);
        }
    };

    const categoryMap = {
        'deposit': 'Đặt cọc',
        'sale': 'Bán xe',
        'service': 'Dịch vụ',
        'maintenance': 'Bảo dưỡng',
        'salary': 'Lương',
        'utilities': 'Điện nước',
        'other': 'Khác'
    };

    return(
        <>
            <Navbar/>
            <div className="transaction-page">
                <div className="page-header-block">
                    <span className="page-overline">ACCOUNTING LEDGER</span>
                    <h1 className="page-main-title">SỔ SÁCH KẾ TOÁN</h1>
                    <p className="page-subtitle">Quản lý các khoản thu chi, sổ quỹ tiền mặt và ngân hàng.</p>
                </div>

                <div className="row" id="add-row-form3">
                    <div className="col">
                        <input 
                            type="text" 
                            id="id-search" 
                            placeholder="Tìm kiếm theo mã phiếu hoặc ghi chú..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleOpenModal}>
                            <ion-icon name="add-outline"></ion-icon> <span className="hide-on-mobile">Tạo phiếu Thu/Chi</span>
                        </button>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="table table-hover table-sortable table-bordered">
                        <thead>
                            <tr>
                                <th>Ngày ghi nhận</th>
                                <th>Mã phiếu</th>
                                <th>Loại phiếu</th>
                                <th>Danh mục</th>
                                <th>Số tiền</th>
                                <th>Ghi chú</th>
                                <th>Người lập</th>
                            </tr>
                        </thead>
                        <tbody className="admin-table-body">
                            {loading ? (
                                <tr><td colSpan="7" className="admin-text-center">Đang tải...</td></tr>
                            ) : ledgerData.length === 0 ? (
                                <tr><td colSpan="7" className="admin-text-center">Không có dữ liệu</td></tr>
                            ) : (
                            ledgerData
                                .filter(item => {
                                    const searchStr = searchTerm.toLowerCase();
                                    const id = item._id?.toString() || '';
                                    const desc = item.description || '';
                                    return id.includes(searchStr) || desc.toLowerCase().includes(searchStr);
                                })
                                .map((item, index) => {
                                    const isIncome = item.type === 'income';
                                    return (
                                        <tr key={item._id || index}>
                                            <td>{item.accountingDate ? new Date(item.accountingDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                            <td>{item._id?.slice(-6).toUpperCase() || 'N/A'}</td>
                                            <td>
                                                <span className={`status-badge text-white px-10 py-5 radius-4 fw-bold ${isIncome ? 'bg-success' : 'bg-danger'}`}>
                                                    {isIncome ? 'THU' : 'CHI'}
                                                </span>
                                            </td>
                                            <td>{categoryMap[item.category] || item.category || 'Khác'}</td>
                                            <td className={`fw-bold ${isIncome ? 'text-success' : 'text-danger'}`}>
                                                {isIncome ? '+' : '-'}{item.amount ? `${item.amount.toLocaleString()} ₫` : '0 ₫'}
                                            </td>
                                            <td className="text-wrap-200" title={item.description}>
                                                {item.description || 'Không có'}
                                            </td>
                                            <td>{item.recordedBy?.name || 'Hệ thống'}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Voucher Modal */}
            {isModalOpen && (
                <div className="admin-modal-overlay" onClick={handleCloseModal}>
                    <div className="admin-modal-content admin-modal-md" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <div className="admin-modal-title-wrapper">
                                <h3 className="admin-modal-title">Tạo Phiếu Kế Toán</h3>
                                <p className="admin-modal-subtitle">Ghi nhận các khoản thu/chi vào sổ quỹ.</p>
                            </div>
                            <button type="button" onClick={handleCloseModal} className="admin-modal-close-btn">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-modal-form">
                            <div className="admin-modal-body">
                                <div className="admin-form-section">
                                    <h4 className="admin-form-section-title">Thông tin giao dịch</h4>
                                    <div className="admin-form-row">
                                        <div className="admin-form-col">
                                            <label className="admin-form-label">Loại Phiếu <span className="admin-required-asterisk">*</span></label>
                                            <select className="admin-form-control" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                                <option value="income">Phiếu Thu (Income)</option>
                                                <option value="expense">Phiếu Chi (Expense)</option>
                                            </select>
                                        </div>
                                        <div className="admin-form-col">
                                            <label className="admin-form-label">Danh mục <span className="admin-required-asterisk">*</span></label>
                                            <select className="admin-form-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                                {formData.type === 'income' ? (
                                                    <option value="other">Thu Khác</option>
                                                ) : (
                                                    <>
                                                        <option value="salary">Trả lương</option>
                                                        <option value="utilities">Điện nước</option>
                                                        <option value="maintenance">Bảo dưỡng/Sửa chữa</option>
                                                        <option value="other">Chi Khác</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="admin-form-row">
                                        <div className="admin-form-col">
                                            <label className="admin-form-label">Số tiền (VNĐ) <span className="admin-required-asterisk">*</span></label>
                                            <input type="number" className="admin-form-control" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required min="1" placeholder="Nhập số tiền..." />
                                        </div>
                                        <div className="admin-form-col">
                                            {/* Placeholder for future fields */}
                                        </div>
                                    </div>
                                    <div className="admin-form-row">
                                        <div className="admin-form-col">
                                            <label className="admin-form-label">Ghi chú</label>
                                            <textarea className="admin-form-control" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Diễn giải chi tiết..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-cancel" onClick={handleCloseModal}>Hủy</button>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
                                    {submitting ? 'Đang xử lý...' : 'Lưu phiếu'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer/>
        </>
    );
};

export default LedgerPage;
