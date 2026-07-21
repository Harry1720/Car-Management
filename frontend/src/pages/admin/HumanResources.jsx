import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/HR.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import { employeeService } from '../../services/employeeService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const HRPage = () => {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        fetchEmployees();
    }, []);
    
    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await employeeService.getAllEmployees();
            let employeeData = Array.isArray(response) ? response : (response?.data || response?.employees || []);
            
            if (employeeData && Array.isArray(employeeData)) {
                setEmployees(employeeData);
            } else {
                setEmployees([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]);
            setLoading(false);
        }
    };
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
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowAddForm(false);
                setEditingEmployee(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        
        const result = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn thêm nhân viên mới này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        });
        if (!result.isConfirmed) return;
        
        // Validate required fields
        if (!newEmployee.employee_citizenid?.trim() || !newEmployee.employee_name?.trim() || 
            !newEmployee.employee_birthday?.trim() || !newEmployee.employee_phone_no?.trim() || 
            !newEmployee.employee_email?.trim() || !newEmployee.employee_address?.trim() || 
            !newEmployee.role_title?.trim()) {
            toast.warning('Vui lòng điền đầy đủ tất cả các trường!');
            return;
        }
        
        try {
            await employeeService.createEmployee(newEmployee);
            await fetchEmployees();
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
            toast.success('Thêm nhân viên thành công!');
        } catch (error) {
            console.error('Error creating employee:', error);
            toast.error('Lỗi khi thêm nhân viên: ' + (error.response?.data?.message || error.message));
        }
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

    const handleDelete = async (citizenId) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa nhân viên này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });
        if (!result.isConfirmed) return;
        try {
            // Only delete from API if it's a MongoDB ID (starts with numbers or has _id)
            const employee = employees.find(emp => emp._id === citizenId || emp.employee_citizenid === citizenId);
            
            if (employee && employee._id && employee._id.length === 24) {
                // This is a MongoDB ID, delete from API
                await employeeService.deleteEmployee(employee._id);
            }
            
            // Remove from UI regardless
            setEmployees(employees.filter(emp => emp._id !== citizenId && emp.employee_citizenid !== citizenId));
            toast.success('Xóa nhân viên thành công!');
        } catch (error) {
            console.error('Error deleting employee:', error);
            toast.error('Lỗi khi xóa nhân viên');
        }
    };

    const handleEdit = (citizenId) => {
        const employeeToEdit = employees.find(emp => emp._id === citizenId || emp.employee_citizenid === citizenId);
        
        // Handle address - could be object or string
        let addressString = '';
        if (typeof employeeToEdit.address === 'object' && employeeToEdit.address) {
            addressString = [employeeToEdit.address.street, employeeToEdit.address.city, employeeToEdit.address.state].filter(Boolean).join(', ');
        } else {
            addressString = employeeToEdit.address || employeeToEdit.employee_address || '';
        }
        
        // Format date for input[type="date"] (YYYY-MM-DD)
        let formattedDate = '';
        if (employeeToEdit.dob) {
            const date = new Date(employeeToEdit.dob);
            formattedDate = date.toISOString().split('T')[0];
        } else if (employeeToEdit.employee_birthday) {
            formattedDate = employeeToEdit.employee_birthday;
        }
        
        // Map database fields to form fields
        setEditingEmployee({
            ...employeeToEdit,
            employee_citizenid: employeeToEdit.identityNumber || employeeToEdit.employee_citizenid || '',
            employee_name: employeeToEdit.name || employeeToEdit.employee_name || '',
            employee_birthday: formattedDate,
            employee_phone_no: employeeToEdit.phone || employeeToEdit.employee_phone_no || '',
            employee_email: employeeToEdit.email || employeeToEdit.employee_email || '',
            employee_address: addressString,
            role_title: employeeToEdit.position || employeeToEdit.role || employeeToEdit.role_title || ''
        });
        setShowAddForm(false); // Close add form when editing
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn cập nhật thông tin nhân viên này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        });
        if (!result.isConfirmed) return;
        try {
            const employeeId = editingEmployee._id || editingEmployee.employee_citizenid;
            
            // Map form fields back to database fields
            const updateData = {
                name: editingEmployee.employee_name,
                dob: editingEmployee.employee_birthday,
                phone: editingEmployee.employee_phone_no,
                email: editingEmployee.employee_email,
                address: editingEmployee.employee_address,
                position: editingEmployee.role_title,
                identityNumber: editingEmployee.employee_citizenid
            };
            
            await employeeService.updateEmployee(employeeId, updateData);
            await fetchEmployees(); // Refresh data from server
            setEditingEmployee(null);
            toast.success('Cập nhật nhân viên thành công!');
        } catch (error) {
            console.error('Error updating employee:', error);
            toast.error('Lỗi khi cập nhật nhân viên: ' + (error.response?.data?.message || error.message));
        }
    };

    const filteredEmployees = employees.filter(employee =>
        (employee.employee_citizenid || employee.identityNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar/>
            <div className="hr-page">
                <div className="page-header-block">
                    <span className="page-overline">HUMAN RESOURCES</span>
                    <h1 className="page-main-title">QUẢN LÝ NHÂN SỰ</h1>
                    <p className="page-subtitle">Quản lý thêm mới, chỉnh sửa thông tin nhân viên và phân quyền.</p>
                </div>

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
                            {showAddForm ? <><ion-icon name="close-outline"></ion-icon> Hủy thêm</> : <><ion-icon name="add-outline"></ion-icon> Thêm nhân viên</>}
                        </button>
                    </div>
                </div>

                {/* Add new employee form */}
                {showAddForm && (
                    <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
                        <div className="modal-content wide-modal-content" onClick={e => e.stopPropagation()}>
                            <button type="button" onClick={() => setShowAddForm(false)} className="modal-close-btn"><ion-icon name="close-outline"></ion-icon></button>
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
                            </div>
                            <div className="form-row">
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
                                    <label>Địa chỉ</label>
                                    <input 
                                        type="text" 
                                        id="new-address"
                                        value={newEmployee.employee_address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
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
                            <div className="button-group admin-flex-end-group">
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
                    </div>
                )}

                {/* Add edit form */}
                {editingEmployee && (
                    <div className="modal-overlay" onClick={() => setEditingEmployee(null)}>
                        <div className="modal-content wide-modal-content" onClick={e => e.stopPropagation()}>
                            <button type="button" onClick={() => setEditingEmployee(null)} className="modal-close-btn"><ion-icon name="close-outline"></ion-icon></button>
                            <h3>Chỉnh sửa thông tin nhân viên</h3>
                            <form onSubmit={handleUpdate}>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Mã nhân viên</label>
                                    <input 
                                        type="text"
                                        name="employee_citizenid"
                                        value={editingEmployee.employee_citizenid || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Họ và tên nhân viên</label>
                                    <input 
                                        type="text"
                                        name="employee_name"
                                        value={editingEmployee.employee_name || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Ngày tháng năm sinh</label>
                                    <input 
                                        type="date"
                                        name="employee_birthday"
                                        value={editingEmployee.employee_birthday || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Số điện thoại</label>
                                    <input 
                                        type="text"
                                        name="employee_phone_no"
                                        value={editingEmployee.employee_phone_no || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Email</label>
                                    <input 
                                        type="email"
                                        name="employee_email"
                                        value={editingEmployee.employee_email || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Địa chỉ</label>
                                    <input 
                                        type="text"
                                        name="employee_address"
                                        value={editingEmployee.employee_address || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Chức vụ</label>
                                    <input 
                                        type="text"
                                        name="role_title"
                                        value={editingEmployee.role_title || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="button-group admin-flex-end-group">
                                <button 
                                    type="button" 
                                    className="btn-cancel"
                                    onClick={() => setEditingEmployee(null)}
                                >
                                    Hủy
                                </button>
                                <button type="submit" className="btn-save">Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
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
                        <tbody className="admin-table-body">
                            {loading ? (
                                <tr><td colSpan="9" className="admin-text-center">Đang tải...</td></tr>
                            ) : employees.length === 0 ? (
                                <tr><td colSpan="9" className="admin-text-center">Không có dữ liệu</td></tr>
                            ) : (
                                filteredEmployees.map((employee) => {
                                    // Format date
                                    const formatDate = (dateString) => {
                                        if (!dateString) return '';
                                        const date = new Date(dateString);
                                        return date.toLocaleDateString('vi-VN');
                                    };

                                    // Format address
                                    const formatAddress = (addressData) => {
                                        if (!addressData) return '';
                                        if (typeof addressData === 'string') return addressData;
                                        if (typeof addressData === 'object') {
                                            return [addressData.street, addressData.city, addressData.state]
                                                .filter(Boolean)
                                                .join(', ');
                                        }
                                        return '';
                                    };

                                    return (
                                        <tr key={employee._id || employee.employee_citizenid}>
                                            <td>{employee.employee_citizenid || employee.identityNumber || ''}</td>
                                            <td>{employee.employee_name || employee.name || ''}</td>
                                            <td>{formatDate(employee.employee_birthday || employee.dob)}</td>
                                            <td>{employee.employee_phone_no || employee.phone || ''}</td>
                                            <td>{employee.employee_email || employee.email || ''}</td>
                                            <td>{formatAddress(employee.employee_address || employee.address)}</td>
                                            <td>{employee.role_title || employee.position || ''}</td>
                                            <td>
                                                <button 
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(employee._id || employee.employee_citizenid)}
                                                >
                                                    <ion-icon name="trash-outline"></ion-icon>
                                                </button>
                                            </td>
                                            <td>
                                                <button 
                                                    className="edit-btn"
                                                    onClick={() => handleEdit(employee._id || employee.employee_citizenid)}
                                                >
                                                    <ion-icon name="create-outline"></ion-icon>
                                                </button>
                                            </td>
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

export default HRPage;
