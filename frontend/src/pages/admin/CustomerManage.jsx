import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/CusManage.css';
import '../../assets/css/admin_pages/AdminModal.css';
import Navbar from '../../components/NavbarAdmin';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Footer from '../../components/FooterAdmin';
import { customerService } from '../../services/customerService';

const CustomerManage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchCustomers();
    }, []);
    
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await customerService.getAllCustomers();
            const data = response.customers || response.data || response;
            if (Array.isArray(data)) {
                setCustomers(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setLoading(false);
        }
    };
    
    const [searchTerm, setSearchTerm] = useState('');
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        identityNumber: '',
        name: '',
        address: '',
        phone: '',
        email: ''
    });

    // Lọc customers dựa trên searchTerm
    const filteredCustomers = customers.filter(customer =>
        (customer.identityNumber || customer.citizen_id || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (citizenId) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa khách hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });
        if (!result.isConfirmed) return;
        try {
            await customerService.deleteCustomer(citizenId);
            setCustomers(customers.filter(customer => customer._id !== citizenId && customer.citizen_id !== citizenId));
        } catch (error) {
            console.error('Error deleting customer:', error);
            toast.error('Lỗi khi xóa khách hàng');
        }
    };

    const handleEdit = (citizenId) => {
        const customerToEdit = customers.find(c => c._id === citizenId || c.citizen_id === citizenId);
        // Map database fields to form fields
        setEditingCustomer({
            ...customerToEdit,
            citizen_id: customerToEdit.identityNumber || customerToEdit.citizen_id,
            identityNumber: customerToEdit.identityNumber || customerToEdit.citizen_id,
            customer_name: customerToEdit.name || customerToEdit.customer_name,
            name: customerToEdit.name || customerToEdit.customer_name,
            address: customerToEdit.address,
            phone_no: customerToEdit.phone || customerToEdit.phone_no,
            phone: customerToEdit.phone || customerToEdit.phone_no,
            email: customerToEdit.email,
            number_transaction: customerToEdit.number_transaction !== undefined ? customerToEdit.number_transaction : 0
        });        
        setShowAddForm(false); // Close add form when editing    
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn cập nhật thông tin khách hàng này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        });
        if (!result.isConfirmed) return;
        try {
            const customerId = editingCustomer._id || editingCustomer.citizen_id;
            
            // Map form fields back to database fields
            const updateData = {
                name: editingCustomer.customer_name || editingCustomer.name,
                email: editingCustomer.email,
                phone: editingCustomer.phone_no || editingCustomer.phone,
                address: editingCustomer.address,
                identityNumber: editingCustomer.identityNumber || editingCustomer.citizen_id
            };
            
            await customerService.updateCustomer(customerId, updateData);
            await fetchCustomers(); // Refresh data from server
            setEditingCustomer(null);
            toast.success('Cập nhật khách hàng thành công!');
        } catch (error) {
            console.error('Error updating customer:', error);
            toast.error('Lỗi khi cập nhật khách hàng: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Add new handler for creating customer
    const handleCreate = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn thêm khách hàng mới này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        });
        if (!result.isConfirmed) return;
        try {
            const response = await customerService.createCustomer(newCustomer);
            setCustomers([...customers, response]);
            setNewCustomer({
                identityNumber: '',
                name: '',
                address: '',
                phone: '',
                email: ''
            });
            setShowAddForm(false);
            toast.success('Thêm khách hàng thành công!');
            fetchCustomers();
        } catch (error) {
            console.error('Error creating customer:', error);
            toast.error('Lỗi khi thêm khách hàng: ' + (error.message || 'Vui lòng thử lại'));
        }
    };

    // Add handler for new customer form changes
    const handleNewCustomerChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        document.title = "Quản lý khách hàng | VinFast";
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowAddForm(false);
                setEditingCustomer(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return(
        <>
            <Navbar/>
            <div className='customer_page'>
                <div className="page-header-block">
                    <span className="page-overline">CUSTOMER MANAGEMENT</span>
                    <h1 className="page-main-title">QUẢN LÝ KHÁCH HÀNG</h1>
                    <p className="page-subtitle">Quản lý thêm mới, chỉnh sửa và tra cứu thông tin khách hàng.</p>
                </div>

                {/* Combine search and add button in one row */}
                <div className="row" id="add-row-form3">
                    <div className="col">
                        <input 
                            type="text" 
                            id="id-search" 
                            placeholder="Tìm kiếm theo số CCCD..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                setShowAddForm(!showAddForm);
                                setEditingCustomer(null); // Close edit form when adding
                            }}
                        >
                            {showAddForm ? <><ion-icon name="close-outline"></ion-icon> Hủy thêm</> : <><ion-icon name="add-outline"></ion-icon> Thêm khách hàng</>}
                        </button>
                    </div>
                </div>

                {/* Add new customer form */}
                {showAddForm && (
                    <div className="admin-modal-overlay" onClick={() => setShowAddForm(false)}>
                        <div className="admin-modal-content admin-modal-md" onClick={e => e.stopPropagation()}>
                            <div className="admin-modal-header">
                                <div className="admin-modal-title-wrapper">
                                    <h3 className="admin-modal-title">Thêm khách hàng mới</h3>
                                    <p className="admin-modal-subtitle">Thông tin sẽ được lưu ngay sau khi tạo.</p>
                                </div>
                                <button type="button" onClick={() => setShowAddForm(false)} className="admin-modal-close-btn">✕</button>
                            </div>
                            <form onSubmit={handleCreate} className="admin-modal-form">
                                <div className="admin-modal-body">
                                    <div className="admin-form-section">
                                        <h4 className="admin-form-section-title">Thông tin cá nhân</h4>
                                        <div className="admin-form-row">
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Số CCCD <span className="admin-required-asterisk">*</span></label>
                                                <input type="text" name="identityNumber" value={newCustomer.identityNumber} onChange={handleNewCustomerChange} className="admin-form-control" required />
                                            </div>
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Họ và Tên <span className="admin-required-asterisk">*</span></label>
                                                <input type="text" name="name" value={newCustomer.name} onChange={handleNewCustomerChange} className="admin-form-control" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admin-form-section">
                                        <h4 className="admin-form-section-title">Thông tin liên hệ</h4>
                                        <div className="admin-form-row">
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Số điện thoại <span className="admin-required-asterisk">*</span></label>
                                                <input type="text" name="phone" value={newCustomer.phone} onChange={handleNewCustomerChange} className="admin-form-control" required />
                                            </div>
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Email <span className="admin-optional-text">(không bắt buộc)</span></label>
                                                <input type="email" name="email" value={newCustomer.email} onChange={handleNewCustomerChange} className="admin-form-control" />
                                            </div>
                                        </div>
                                        <div className="admin-form-row">
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Địa chỉ <span className="admin-required-asterisk">*</span></label>
                                                <input type="text" name="address" value={newCustomer.address} onChange={handleNewCustomerChange} className="admin-form-control" placeholder="Số nhà, đường, quận/huyện, thành phố" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-modal-footer">
                                    <button type="button" className="admin-btn admin-btn-cancel" onClick={() => setShowAddForm(false)}>Hủy</button>
                                    <button type="submit" className="admin-btn admin-btn-primary">Thêm khách hàng</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit customer form */}
                {editingCustomer && (
                    <div className="admin-modal-overlay" onClick={() => setEditingCustomer(null)}>
                        <div className="admin-modal-content admin-modal-md" onClick={e => e.stopPropagation()}>
                            <div className="admin-modal-header">
                                <div className="admin-modal-title-wrapper">
                                    <h3 className="admin-modal-title">✏️ Chỉnh sửa thông tin khách hàng</h3>
                                    <p className="admin-modal-subtitle">Cập nhật thông tin chi tiết của khách hàng.</p>
                                </div>
                                <button type="button" onClick={() => setEditingCustomer(null)} className="admin-modal-close-btn">✕</button>
                            </div>
                            <form onSubmit={handleUpdate} className="admin-modal-form">
                                <div className="admin-modal-body">
                                    <div className="admin-form-section">
                                        <h4 className="admin-form-section-title">Thông tin cá nhân</h4>
                                        <div className="admin-form-row">
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Số CCCD <span className="admin-required-asterisk">*</span></label>
                                                <input type="text" name="identityNumber" value={editingCustomer.identityNumber || ''} onChange={handleChange} className="admin-form-control" required />
                                            </div>
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Họ và Tên</label>
                                                <input type="text" name="customer_name" value={editingCustomer.customer_name} onChange={handleChange} className="admin-form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admin-form-section">
                                        <h4 className="admin-form-section-title">Thông tin liên hệ</h4>
                                        <div className="admin-form-row">
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Số điện thoại</label>
                                                <input type="text" name="phone_no" value={editingCustomer.phone_no} onChange={handleChange} className="admin-form-control" />
                                            </div>
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Email</label>
                                                <input type="email" name="email" value={editingCustomer.email} onChange={handleChange} className="admin-form-control" />
                                            </div>
                                        </div>
                                        <div className="admin-form-row">
                                            <div className="admin-form-col">
                                                <label className="admin-form-label">Địa chỉ</label>
                                                <input type="text" name="address" value={editingCustomer.address} onChange={handleChange} className="admin-form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-modal-footer">
                                    <button type="button" className="admin-btn admin-btn-cancel" onClick={() => setEditingCustomer(null)}>Hủy</button>
                                    <button type="submit" className="admin-btn admin-btn-primary">Lưu thay đổi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="table-wrapper">
                    <table className="table table-hover table-sortable table-bordered">
                        <thead>
                            <tr>
                                <th>Số CCCD</th>
                                <th>Họ và Tên</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th>Xe quan tâm</th>
                                <th>Số giao dịch</th>
                                <th colSpan="2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="admin-table-body" id="customer-data">
                            {loading ? (
                                <tr><td colSpan="9" className="admin-text-center"> ...</td></tr>
                            ) : customers.length === 0 ? (
                                <tr><td colSpan="9" className="admin-text-center">Không có dữ liệu</td></tr>
                            ) : (
                            filteredCustomers.map((customer) => (
                                <tr key={customer._id || customer.citizen_id}>
                                    <td>{customer.identityNumber || customer.citizen_id}</td>
                                    <td>{customer.name || customer.customer_name}</td>
                                    <td>{customer.address || 'N/A'}</td>
                                    <td>{customer.phone || customer.phone_no}</td>
                                    <td>{customer.email}</td>
                                    <td>
                                        {customer.carsInterested && customer.carsInterested.length > 0
                                            ? customer.carsInterested.map(car => car.name).join(', ')
                                            : <span className="text-muted-italic">Không có</span>}
                                    </td>
                                    <td>{customer.number_transaction || 0}</td>
                                    <td>
                                        <button 
                                            className="delete-customer"
                                            onClick={() => handleDelete(customer._id || customer.citizen_id)}
                                            title="Xóa"
                                        >
                                            <ion-icon name="trash-outline"></ion-icon>
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="edit-customer"
                                            onClick={() => handleEdit(customer._id || customer.citizen_id)}
                                            title="Sửa"
                                        >
                                            <ion-icon name="create-outline"></ion-icon>
                                        </button>
                                    </td>
                                </tr>
                            ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default CustomerManage;
