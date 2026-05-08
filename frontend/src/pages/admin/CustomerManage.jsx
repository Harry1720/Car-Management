import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/CusManage.css';
import Navbar from '../../components/NavbarAdmin';
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
        if (!window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) return;
        try {
            await customerService.deleteCustomer(citizenId);
            setCustomers(customers.filter(customer => customer._id !== citizenId && customer.citizen_id !== citizenId));
        } catch (error) {
            console.error('Error deleting customer:', error);
            alert('Lỗi khi xóa khách hàng');
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
        if (!window.confirm('Bạn có chắc chắn muốn cập nhật thông tin khách hàng này?')) return;
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
            alert('Cập nhật khách hàng thành công!');
        } catch (error) {
            console.error('Error updating customer:', error);
            alert('Lỗi khi cập nhật khách hàng: ' + (error.response?.data?.message || error.message));
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
        if (!window.confirm('Bạn có chắc chắn muốn thêm khách hàng mới này?')) return;
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
            alert('Thêm khách hàng thành công!');
            fetchCustomers();
        } catch (error) {
            console.error('Error creating customer:', error);
            alert('Lỗi khi thêm khách hàng: ' + (error.message || 'Vui lòng thử lại'));
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
    }, []);

    return(
        <>
            <Navbar/>
            <div className='customer_page'>
                <h1 id="heading"><b>Quản lý thông tin khách hàng</b></h1>

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
                            {showAddForm ? 'Hủy thêm' : 'Thêm khách hàng'}
                        </button>
                    </div>
                </div>

                {/* Add new customer form */}
                {showAddForm && (
                    <div className="add-form">
                        <h3>Thêm khách hàng mới</h3>
                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <label>Số CCCD:</label>
                                <input
                                    type="text"
                                    name="identityNumber"
                                    value={newCustomer.identityNumber}
                                    onChange={handleNewCustomerChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Họ và Tên:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newCustomer.name}
                                    onChange={handleNewCustomerChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={newCustomer.address}
                                    onChange={handleNewCustomerChange}
                                    className="form-control"
                                    placeholder="Số nhà, đường, quận/huyện, thành phố"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={newCustomer.phone}
                                    onChange={handleNewCustomerChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newCustomer.email}
                                    onChange={handleNewCustomerChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn-save">
                                    Thêm khách hàng
                                </button>
                                <button 
                                    type="button" 
                                    className="btn-cancel"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Form chỉnh sửa */}
                {editingCustomer && (
                    <div className="edit-form">
                        <h3>Chỉnh sửa thông tin khách hàng</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Họ và Tên:</label>
                                <input
                                    type="text"
                                    name="customer_name"
                                    value={editingCustomer.customer_name}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editingCustomer.address}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại:</label>
                                <input
                                    type="text"
                                    name="phone_no"
                                    value={editingCustomer.phone_no}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editingCustomer.email}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="button-group">
                                <button 
                                    type="submit" 
                                    className="btn-save"
                                >
                                    Lưu thay đổi
                                </button>
                                <button 
                                    type="button" 
                                    className="btn-cancel"
                                    onClick={() => setEditingCustomer(null)}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
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
                                <th>Số giao dịch</th>
                                <th colSpan="2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody style={{backgroundColor: 'rgb(245, 252, 255)'}} id="customer-data">
                            {loading ? (
                                <tr><td colSpan="8" style={{textAlign: 'center'}}>Đang tải...</td></tr>
                            ) : customers.length === 0 ? (
                                <tr><td colSpan="8" style={{textAlign: 'center'}}>Không có dữ liệu</td></tr>
                            ) : (
                            filteredCustomers.map((customer) => (
                                <tr key={customer._id || customer.citizen_id}>
                                    <td>{customer.identityNumber || customer.citizen_id}</td>
                                    <td>{customer.name || customer.customer_name}</td>
                                    <td>{customer.address || 'N/A'}</td>
                                    <td>{customer.phone || customer.phone_no}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.number_transaction || 0}</td>
                                    <td>
                                        <button 
                                            className="delete-customer"
                                            onClick={() => handleDelete(customer._id || customer.citizen_id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="edit-customer"
                                            onClick={() => handleEdit(customer._id || customer.citizen_id)}
                                        >
                                            Edit
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
