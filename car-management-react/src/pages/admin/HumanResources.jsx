import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/HR.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';

const HRPage = () => {
    const [employees, setEmployees] = useState([
        {
            employee_citizenid: "EMP001",
            employee_name: "Nguyễn Văn A",
            employee_birthday: "1990-01-01",
            employee_phone_no: "0901234567",
            employee_email: "nva@vinfast.com",
            employee_address: "123 Nguyễn Huệ, Q1, HCMC",
            role_title: "Quản lý"
        },
        {
            employee_citizenid: "EMP002",
            employee_name: "Trần Thị B",
            employee_birthday: "1992-03-15",
            employee_phone_no: "0902345678",
            employee_email: "ttb@vinfast.com",
            employee_address: "45 Lê Lợi, Q1, HCMC",
            role_title: "Nhân viên Kinh doanh"
        },
        {
            employee_citizenid: "EMP003",
            employee_name: "Lê Văn C",
            employee_birthday: "1988-07-20",
            employee_phone_no: "0903456789",
            employee_email: "lvc@vinfast.com",
            employee_address: "12 Trần Phú, Q5, HCMC",
            role_title: "Kỹ sư"
        },
        {
            employee_citizenid: "EMP004",
            employee_name: "Phạm Thị D",
            employee_birthday: "1995-11-02",
            employee_phone_no: "0904567890",
            employee_email: "ptd@vinfast.com",
            employee_address: "78 Pasteur, Q3, HCMC",
            role_title: "Chuyên viên Nhân sự"
        },
        {
            employee_citizenid: "EMP005",
            employee_name: "Ngô Văn E",
            employee_birthday: "1991-05-10",
            employee_phone_no: "0905678901",
            employee_email: "nve@vinfast.com",
            employee_address: "56 Hai Bà Trưng, Q1, HCMC",
            role_title: "Quản lý Dự án"
        },
        {
            employee_citizenid: "EMP006",
            employee_name: "Đỗ Thị F",
            employee_birthday: "1993-09-25",
            employee_phone_no: "0906789012",
            employee_email: "dtf@vinfast.com",
            employee_address: "34 Nguyễn Trãi, Q5, HCMC",
            role_title: "Kế toán"
        },
        {
            employee_citizenid: "EMP007",
            employee_name: "Vũ Minh G",
            employee_birthday: "1987-12-12",
            employee_phone_no: "0907890123",
            employee_email: "vmg@vinfast.com",
            employee_address: "23 Lý Tự Trọng, Q1, HCMC",
            role_title: "Trưởng phòng Kỹ thuật"
        },
        {
            employee_citizenid: "EMP008",
            employee_name: "Hoàng Thị H",
            employee_birthday: "1996-02-28",
            employee_phone_no: "0908901234",
            employee_email: "hth@vinfast.com",
            employee_address: "89 Điện Biên Phủ, Q3, HCMC",
            role_title: "Thư ký"
        },
        {
            employee_citizenid: "EMP009",
            employee_name: "Phan Văn I",
            employee_birthday: "1994-04-05",
            employee_phone_no: "0909012345",
            employee_email: "pvi@vinfast.com",
            employee_address: "67 Nguyễn Đình Chiểu, Q3, HCMC",
            role_title: "Nhân viên IT"
        },
        {
            employee_citizenid: "EMP010",
            employee_name: "Bùi Thị J",
            employee_birthday: "1990-08-18",
            employee_phone_no: "0910123456",
            employee_email: "btj@vinfast.com",
            employee_address: "101 Võ Thị Sáu, Q3, HCMC",
            role_title: "Chuyên viên Marketing"
        },
        {
            employee_citizenid: "EMP011",
            employee_name: "Nguyễn Quốc K",
            employee_birthday: "1989-06-22",
            employee_phone_no: "0911234567",
            employee_email: "nqk@vinfast.com",
            employee_address: "9 Cách Mạng Tháng 8, Q10, HCMC",
            role_title: "Giám sát Sản xuất"
        }

    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        employee_citizenid: '',
        employee_name: '',
        employee_birthday: '',
        employee_phone_no: '',
        employee_email: '',
        employee_address: '',
        role_title: ''
    });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        document.title = "Quản lý nhân sự | VinFast";
    }, []);

    const handleAddEmployee = (e) => {
        e.preventDefault();
        setEmployees([...employees, newEmployee]);
        setNewEmployee({
            employee_citizenid: '',
            employee_name: '',
            employee_birthday: '',
            employee_phone_no: '',
            employee_email: '',
            employee_address: '',
            role_title: ''
        });
        setShowAddForm(false);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace('new-', '');
        const mappedField = {
            'id': 'employee_citizenid',
            'name': 'employee_name',
            'birthdate': 'employee_birthday',
            'phoneNo': 'employee_phone_no',
            'email': 'employee_email',
            'address': 'employee_address',
            'position': 'role_title'
        }[fieldName];

        setNewEmployee(prev => ({
            ...prev,
            [mappedField]: value
        }));
    };

    const handleDelete = (citizenId) => {
        setEmployees(employees.filter(emp => emp.employee_citizenid !== citizenId));
    };

    const handleEdit = (citizenId) => {
        const employeeToEdit = employees.find(emp => emp.employee_citizenid === citizenId);
        setEditingEmployee({...employeeToEdit}); // Clone object to avoid direct mutation
        setShowAddForm(false); // Close add form when editing
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setEmployees(employees.map(emp => 
            emp.employee_citizenid === editingEmployee.employee_citizenid ? editingEmployee : emp
        ));
        setEditingEmployee(null);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.employee_citizenid.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar/>
            <div className="hr-page">
                <h1 id="heading"><b>Quản lý nhân sự</b></h1>

                {/* Search and Add button row */}
                <div className="row" id="add-row-form3">
                    <div className="col">
                        <input 
                            type="text" 
                            id="id-search" 
                            placeholder="Tìm kiếm theo mã nhân viên..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                setShowAddForm(!showAddForm);
                                setEditingEmployee(null); // Close edit form when adding
                            }}
                        >
                            {showAddForm ? 'Hủy thêm' : 'Thêm nhân viên'}
                        </button>
                    </div>
                </div>

                {/* Add new employee form */}
                {showAddForm && (
                    <div className="add-employee-form">
                        <h3>Thêm nhân viên mới</h3>
                        <form onSubmit={handleAddEmployee}>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Mã nhân viên</label>
                                    <input 
                                        type="text" 
                                        id="new-id" 
                                        value={newEmployee.employee_citizenid}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Họ và tên</label>
                                    <input 
                                        type="text" 
                                        id="new-name" 
                                        value={newEmployee.employee_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Ngày sinh</label>
                                    <input 
                                        type="date" 
                                        id="new-birthdate" 
                                        value={newEmployee.employee_birthday}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        id="new-email" 
                                        value={newEmployee.employee_email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Số điện thoại</label>
                                    <input 
                                        type="text" 
                                        id="new-phoneNo" 
                                        value={newEmployee.employee_phone_no}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Địa chỉ</label>
                                    <input 
                                        type="text" 
                                        id="new-address"
                                        value={newEmployee.employee_address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Chức vụ</label>
                                    <input 
                                        type="text" 
                                        id="new-position" 
                                        value={newEmployee.role_title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="btn-cancel"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Hủy
                                </button>
                                <button type="submit" className="btn-save">
                                    Thêm mới
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Add edit form */}
                {editingEmployee && (
                    <div className="edit-form-container">
                        <h3>Chỉnh sửa thông tin nhân viên</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="row">
                                <div className="col">
                                    <p>Họ và tên nhân viên</p>
                                    <input 
                                        type="text"
                                        name="employee_name"
                                        value={editingEmployee.employee_name}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <p>Ngày tháng năm sinh</p>
                                    <input 
                                        type="date"
                                        name="employee_birthday"
                                        value={editingEmployee.employee_birthday}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <p>Số điện thoại</p>
                                    <input 
                                        type="text"
                                        name="employee_phone_no"
                                        value={editingEmployee.employee_phone_no}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p>Email</p>
                                    <input 
                                        type="email"
                                        name="employee_email"
                                        value={editingEmployee.employee_email}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <p>Địa chỉ</p>
                                    <input 
                                        type="text"
                                        name="employee_address"
                                        value={editingEmployee.employee_address}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <p>Chức vụ</p>
                                    <input 
                                        type="text"
                                        name="role_title"
                                        value={editingEmployee.role_title}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn-save">Lưu thay đổi</button>
                                <button 
                                    type="button" 
                                    className="btn-cancel"
                                    onClick={() => setEditingEmployee(null)}
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
                                <th>Mã nhân viên</th>
                                <th>Họ và tên nhân viên</th>
                                <th>Ngày tháng năm sinh</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Chức vụ</th>
                                <th colSpan="2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody style={{backgroundColor: 'rgb(245, 252, 255)'}}>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.employee_citizenid}>
                                    <td>{employee.employee_citizenid}</td>
                                    <td>{employee.employee_name}</td>
                                    <td>{employee.employee_birthday}</td>
                                    <td>{employee.employee_phone_no}</td>
                                    <td>{employee.employee_email}</td>
                                    <td>{employee.employee_address}</td>
                                    <td>{employee.role_title}</td>
                                    <td>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDelete(employee.employee_citizenid)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="edit-btn"
                                            onClick={() => handleEdit(employee.employee_citizenid)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default HRPage;
