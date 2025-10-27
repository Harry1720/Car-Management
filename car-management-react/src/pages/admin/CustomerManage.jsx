import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/CusManage.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';

const CustomerManage = () => {
    const [customers, setCustomers] = useState([
        {
            citizen_id: "079203012345",
            customer_name: "Nguyễn Văn An",
            address: "123 Nguyễn Huệ, Q1, TP.HCM",
            phone_no: "0901234567",
            email: "nguyenvanan@email.com",
            number_transaction: 2
        },
        {
            citizen_id: "079203012346",
            customer_name: "Trần Thị Bình",
            address: "456 Lê Lợi, Q5, TP.HCM",
            phone_no: "0912345678",
            email: "tranthibinh@email.com",
            number_transaction: 1
        },
        {
            citizen_id: "079203012347",
            customer_name: "Lê Văn Cường",
            address: "789 CMT8, Q3, TP.HCM",
            phone_no: "0923456789",
            email: "levancuong@email.com",
            number_transaction: 3
        },
        {
            citizen_id: "079203012348",
            customer_name: "Phạm Thị Dung",
            address: "321 Hai Bà Trưng, Q1, TP.HCM",
            phone_no: "0934567890",
            email: "phamthidung@email.com",
            number_transaction: 1
        },
        {
            citizen_id: "079203012349",
            customer_name: "Hoàng Văn Em",
            address: "654 Nguyễn Trãi, Q5, TP.HCM",
            phone_no: "0945678901",
            email: "hoangvanem@email.com",
            number_transaction: 2
        },
        {
            citizen_id: "079203012350",
            customer_name: "Ngô Thị Hoa",
            address: "987 Võ Văn Tần, Q3, TP.HCM",
            phone_no: "0956789012",
            email: "ngothihoa@email.com",
            number_transaction: 1
        },
        {
            citizen_id: "079203012351",
            customer_name: "Đặng Văn Giang",
            address: "147 Lý Tự Trọng, Q1, TP.HCM",
            phone_no: "0967890123",
            email: "dangvangiang@email.com",
            number_transaction: 4
        },
        {
            citizen_id: "079203012352",
            customer_name: "Vũ Thị Hương",
            address: "258 Trần Hưng Đạo, Q5, TP.HCM",
            phone_no: "0978901234",
            email: "vuthihuong@email.com",
            number_transaction: 2
        },
        {
            citizen_id: "079203012353",
            customer_name: "Bùi Văn Inh",
            address: "369 Nam Kỳ Khởi Nghĩa, Q3, TP.HCM",
            phone_no: "0989012345",
            email: "buivaninh@email.com",
            number_transaction: 1
        },
        {
            citizen_id: "079203012354",
            customer_name: "Trương Thị Kim",
            address: "159 Pasteur, Q1, TP.HCM",
            phone_no: "0990123456",
            email: "truongthikim@email.com",
            number_transaction: 3
        }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        citizen_id: '',
        customer_name: '',
        address: '',
        phone_no: '',
        email: '',
        number_transaction: 0
    });

    // Lọc customers dựa trên searchTerm
    const filteredCustomers = customers.filter(customer =>
        customer.citizen_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (citizenId) => {
        setCustomers(customers.filter(customer => customer.citizen_id !== citizenId));
    };

    const handleEdit = (citizenId) => {
        const customerToEdit = customers.find(c => c.citizen_id === citizenId);
        setEditingCustomer(customerToEdit);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setCustomers(customers.map(customer => 
            customer.citizen_id === editingCustomer.citizen_id ? editingCustomer : customer
        ));
        setEditingCustomer(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Add new handler for creating customer
    const handleCreate = (e) => {
        e.preventDefault();
        setCustomers([...customers, newCustomer]);
        setNewCustomer({
            citizen_id: '',
            customer_name: '',
            address: '',
            phone_no: '',
            email: '',
            number_transaction: 0
        });
        setShowAddForm(false);
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
                            onClick={() => setShowAddForm(!showAddForm)}
                        >
                            {showAddForm ? 'Hủy thêm' : 'Thêm khách hàng'}
                        </button>
                    </div>
                </div>

                {/* Add new customer form */}
                {showAddForm && (
                    <div className="add-form" style={{
                        padding: '20px',
                        margin: '20px 0',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '5px'
                    }}>
                        <h3>Thêm khách hàng mới</h3>
                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <label>Số CCCD:</label>
                                <input
                                    type="text"
                                    name="citizen_id"
                                    value={newCustomer.citizen_id}
                                    onChange={handleNewCustomerChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Họ và Tên:</label>
                                <input
                                    type="text"
                                    name="customer_name"
                                    value={newCustomer.customer_name}
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
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại:</label>
                                <input
                                    type="text"
                                    name="phone_no"
                                    value={newCustomer.phone_no}
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
                            <div style={{marginTop: '10px'}}>
                                <button type="submit" className="btn btn-success">
                                    Thêm khách hàng
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
                            <div style={{marginTop: '10px'}}>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setEditingCustomer(null)}
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    </div>
                )}

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
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.citizen_id}>
                                <td>{customer.citizen_id}</td>
                                <td>{customer.customer_name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phone_no}</td>
                                <td>{customer.email}</td>
                                <td>{customer.number_transaction}</td>
                                <td>
                                    <button 
                                        className="delete-customer"
                                        onClick={() => handleDelete(customer.citizen_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        className="edit-customer"
                                        onClick={() => handleEdit(customer.citizen_id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer/>
        </>
    );
};

export default CustomerManage;
