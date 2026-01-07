import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/CarList.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import { carService } from '../../services/carService';

const CarList = () => {
    const [cars, setCars] = useState([
        {
            model_car_id: "VINVF8B",
            model_car_name: "VinFast VF8",
            price: "1.089.000.000 VNĐ",
            color: "Xanh dương",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-01-15",
            car_number_availability: 15,
            car_sold: 8,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF9BL",
            model_car_name: "VinFast VF9",
            price: "1.491.000.000 VNĐ",
            color: "Đen",
            origin_of_car: "Việt Nam", 
            date_of_import: "2024-02-01",
            car_number_availability: 12,
            car_sold: 5,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF5B",
            model_car_name: "VinFast VF5",
            price: "458.000.000 VNĐ",
            color: "Xanh dương",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-03-10",
            car_number_availability: 20,
            car_sold: 15,
            lauching_year: "2023"
        }
    ]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchCars();
    }, []);
    
    const fetchCars = async () => {
        try {
            setLoading(true);
            const response = await carService.getAllCars(1, 100);
            let carsArr = Array.isArray(response) ? response : (response && Array.isArray(response.cars) ? response.cars : []);
            setCars([...oldCars, ...carsArr]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cars:', error);
            setCars(oldCars);
            setLoading(false);
        }
    };
    
    const oldCars = [
        {
            model_car_id: "VINVF8B",
            model_car_name: "VinFast VF8",
            price: "1.089.000.000 VNĐ",
            color: "Xanh dương",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-01-15",
            car_number_availability: 15,
            car_sold: 8,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF9BL",
            model_car_name: "VinFast VF9",
            price: "1.491.000.000 VNĐ",
            color: "Đen",
            origin_of_car: "Việt Nam", 
            date_of_import: "2024-02-01",
            car_number_availability: 12,
            car_sold: 5,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF5B",
            model_car_name: "VinFast VF5",
            price: "458.000.000 VNĐ",
            color: "Xanh dương",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-03-10",
            car_number_availability: 20,
            car_sold: 15,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF6A",
            model_car_name: "VinFast VF6",
            price: "765.000.000 VNĐ",
            color: "Trắng",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-04-12",
            car_number_availability: 18,
            car_sold: 10,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF7P",
            model_car_name: "VinFast VF7 Plus",
            price: "990.000.000 VNĐ",
            color: "Bạc",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-05-08",
            car_number_availability: 14,
            car_sold: 7,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF8E",
            model_car_name: "VinFast VF8 Eco",
            price: "1.059.000.000 VNĐ",
            color: "Đỏ",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-06-18",
            car_number_availability: 10,
            car_sold: 6,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF9S",
            model_car_name: "VinFast VF9 Smart",
            price: "1.680.000.000 VNĐ",
            color: "Trắng ngọc trai",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-07-02",
            car_number_availability: 9,
            car_sold: 4,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF5C",
            model_car_name: "VinFast VF5 Plus",
            price: "512.000.000 VNĐ",
            color: "Vàng",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-08-10",
            car_number_availability: 22,
            car_sold: 16,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF6B",
            model_car_name: "VinFast VF6 Plus",
            price: "820.000.000 VNĐ",
            color: "Xám",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-09-05",
            car_number_availability: 13,
            car_sold: 8,
            lauching_year: "2023"
        },
        {
            model_car_id: "VINVF9L",
            model_car_name: "VinFast VF9 Luxury",
            price: "1.750.000.000 VNĐ",
            color: "Xanh rêu",
            origin_of_car: "Việt Nam",
            date_of_import: "2024-10-01",
            car_number_availability: 8,
            car_sold: 3,
            lauching_year: "2023"
        }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [newCar, setNewCar] = useState({
        model_car_id: '',
        model_car_name: '',
        price: '',
        color: '',
        origin_of_car: '',
        date_of_import: '',
        car_number_availability: '',
        car_sold: '',
        lauching_year: '',
        engine: '',
        transmission: '',
        fuelType: '',
        fuelConsumption: ''
    });
    const [editingCar, setEditingCar] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleDelete = async (carId) => {
        if (!window.confirm('Bạn chắc chắn muốn xóa xe này?')) return;
        try {
            await carService.deleteCar(carId);
            await fetchCars();
            alert('Xóa xe thành công!');
        } catch (error) {
            console.error('Error deleting car:', error);
            alert('Lỗi khi xóa xe: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (carId) => {
        const carToEdit = cars.find(car => car._id === carId);
        setEditingCar(carToEdit);
        setShowAddForm(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const carId = editingCar._id;
            const updateData = {
                name: editingCar.model_car_name || editingCar.name,
                model: editingCar.model_car_id || editingCar.model,
                price: typeof editingCar.price === 'string' ? parseFloat(editingCar.price.toString().replace(/\./g, '')) : editingCar.price,
                color: editingCar.color,
                year: typeof editingCar.lauching_year === 'string' ? parseInt(editingCar.lauching_year) : editingCar.lauching_year,
                stock: typeof editingCar.car_number_availability === 'string' ? parseInt(editingCar.car_number_availability) : editingCar.car_number_availability
            };
            await carService.updateCar(carId, updateData);
            await fetchCars();
            setEditingCar(null);
            alert('Cập nhật xe thành công!');
        } catch (error) {
            console.error('Error updating car:', error);
            alert('Lỗi khi cập nhật xe: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        
        // Validate all required fields - properly check strings and numbers
        const hasErrors = 
            !newCar.model_car_name?.toString().trim() || 
            !newCar.model_car_id?.toString().trim() || 
            !newCar.price?.toString().trim() || 
            !newCar.color?.toString().trim() || 
            !newCar.origin_of_car?.toString().trim() || 
            !newCar.date_of_import?.toString().trim() || 
            !newCar.car_number_availability?.toString().trim() || 
            newCar.car_sold === '' || newCar.car_sold === null || newCar.car_sold === undefined || 
            !newCar.lauching_year?.toString().trim();
        
        console.log('=== DEBUG: handleCreate ===');
        console.log('newCar state:', newCar);
        console.log('hasErrors:', hasErrors);
        
        if (hasErrors) {
            alert('Vui lòng điền đầy đủ tất cả các trường!\n\nBắt buộc:\n- Mã xe\n- Tên xe\n- Giá tiền\n- Màu sắc\n- Nguồn gốc\n- Ngày nhập\n- Số lượng nhập\n- Số lượng bán\n- Năm ra mắt');
            return;
        }
        
        try {
            const carData = {
                name: newCar.model_car_name,
                model: newCar.model_car_id,
                price: parseFloat(newCar.price.toString().replace(/\./g, '')) || 0,
                color: newCar.color,
                year: parseInt(newCar.lauching_year) || new Date().getFullYear(),
                stock: parseInt(newCar.car_number_availability) || 0,
                origin_of_car: newCar.origin_of_car,
                date_of_import: newCar.date_of_import,
                car_sold: parseInt(newCar.car_sold) || 0,
                specifications: {
                    engine: newCar.engine,
                    transmission: newCar.transmission,
                    fuelType: newCar.fuelType,
                    fuelConsumption: newCar.fuelConsumption
                }
            };
            
            console.log('carData being sent to API:', carData);
            
            const response = await carService.createCar(carData);
            
            console.log('API response:', response);
            
            await fetchCars();
            setNewCar({
                model_car_id: '',
                model_car_name: '',
                price: '',
                color: '',
                origin_of_car: '',
                date_of_import: '',
                car_number_availability: '',
                car_sold: '',
                lauching_year: '',
                engine: '',
                transmission: '',
                fuelType: '',
                fuelConsumption: ''
            });
            setShowAddForm(false);
            alert('Thêm xe thành công!');
        } catch (error) {
            console.error('Error creating car:', error);
            console.error('Error response:', error.response?.data);
            alert('Lỗi khi thêm xe: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewCar(prev => ({
            ...prev,
            [id.replace('new-', '')]: value
        }));
    };

    const handleEditChange = (e) => {
        const { id, value } = e.target;
        setEditingCar(prev => ({
            ...prev,
            [id.replace('edit-', '')]: value
        }));
    };

    useEffect(() => {
        document.title = "Danh sách xe | VinFast";
    }, []);

    return(
        <>
            <Navbar/>
            <div className="car-list-page">
                <h1 id="heading"><b>Danh sách xe</b></h1>

                {/* Search and Add button row */}
                <div className="row" id="add-row-form3">
                    <div className="col">
                        <input 
                            type="text" 
                            id="id-search" 
                            placeholder="Tìm kiếm theo mã xe..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                setShowAddForm(!showAddForm);
                                setEditingCar(null); // Close edit form when adding
                            }}
                        >
                            {showAddForm ? 'Hủy thêm' : 'Thêm xe mới'}
                        </button>
                    </div>
                </div>

                {/* Add new car form */}
                {showAddForm && (
                    <div className="add-car-form">
                        <h3>Thêm xe mới</h3>
                        <form onSubmit={handleCreate}>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Mã xe</label>
                                    <input 
                                        type="text" 
                                        id="new-model_car_id"
                                        value={newCar.model_car_id || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Tên xe</label>
                                    <input 
                                        type="text" 
                                        id="new-model_car_name"
                                        value={newCar.model_car_name || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Giá tiền</label>
                                    <input 
                                        type="text" 
                                        id="new-price"
                                        value={newCar.price || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Màu sắc</label>
                                    <input 
                                        type="text" 
                                        id="new-color"
                                        value={newCar.color || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Nguồn gốc</label>
                                    <input 
                                        type="text" 
                                        id="new-origin_of_car"
                                        value={newCar.origin_of_car || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Ngày nhập</label>
                                    <input 
                                        type="date" 
                                        id="new-date_of_import"
                                        value={newCar.date_of_import || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Số lượng xe nhập</label>
                                    <input 
                                        type="number" 
                                        id="new-car_number_availability"
                                        value={newCar.car_number_availability || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Số lượng xe đã bán</label>
                                    <input 
                                        type="number" 
                                        id="new-car_sold"
                                        value={newCar.car_sold || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Năm ra mắt</label>
                                    <input 
                                        type="text" 
                                        id="new-lauching_year"
                                        value={newCar.lauching_year || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Công suất (Engine)</label>
                                    <input 
                                        type="text" 
                                        id="new-engine"
                                        value={newCar.engine || ''}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: 100 kW"
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Hộp số (Transmission)</label>
                                    <input 
                                        type="text" 
                                        id="new-transmission"
                                        value={newCar.transmission || ''}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: Tự động"
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Loại nhiên liệu</label>
                                    <input 
                                        type="text" 
                                        id="new-fuelType"
                                        value={newCar.fuelType || ''}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: Điện"
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Tiêu thụ nhiên liệu</label>
                                    <input 
                                        type="text" 
                                        id="new-fuelConsumption"
                                        value={newCar.fuelConsumption || ''}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: 5L/100km"
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
                                <button 
                                    type="submit" 
                                    className="btn-save"
                                >
                                    Thêm mới
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Edit car form */}
                {editingCar && (
                    <div className="edit-form">
                        <h3>Chỉnh sửa thông tin xe</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Mã xe</label>
                                    <input 
                                        type="text" 
                                        name="model_car_id"
                                        value={(editingCar.model_car_id || editingCar.model) || ''}
                                        onChange={(e) => setEditingCar({...editingCar, model_car_id: e.target.value})}
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Tên xe</label>
                                    <input 
                                        type="text" 
                                        name="model_car_name"
                                        value={(editingCar.model_car_name || editingCar.name) || ''}
                                        onChange={(e) => setEditingCar({...editingCar, model_car_name: e.target.value})}
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Giá tiền</label>
                                    <input 
                                        type="text" 
                                        name="price"
                                        value={editingCar.price || ''}
                                        onChange={(e) => setEditingCar({...editingCar, price: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Màu sắc</label>
                                    <input 
                                        type="text" 
                                        name="color"
                                        value={editingCar.color || ''}
                                        onChange={(e) => setEditingCar({...editingCar, color: e.target.value})}
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Nguồn gốc</label>
                                    <input 
                                        type="text" 
                                        name="origin_of_car"
                                        value={editingCar.origin_of_car || ''}
                                        onChange={(e) => setEditingCar({...editingCar, origin_of_car: e.target.value})}
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Ngày nhập</label>
                                    <input 
                                        type="date" 
                                        name="date_of_import"
                                        value={editingCar.date_of_import || ''}
                                        onChange={(e) => setEditingCar({...editingCar, date_of_import: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Số lượng xe nhập</label>
                                    <input 
                                        type="number" 
                                        name="car_number_availability"
                                        value={editingCar.car_number_availability || ''}
                                        onChange={(e) => setEditingCar({...editingCar, car_number_availability: e.target.value})}
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Số lượng xe đã bán</label>
                                    <input 
                                        type="number" 
                                        name="car_sold"
                                        value={editingCar.car_sold || ''}
                                        onChange={(e) => setEditingCar({...editingCar, car_sold: e.target.value})}
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Năm ra mắt</label>
                                    <input 
                                        type="text" 
                                        name="lauching_year"
                                        value={editingCar.lauching_year || ''}
                                        onChange={(e) => setEditingCar({...editingCar, lauching_year: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setEditingCar(null)}>
                                    Hủy
                                </button>
                                <button type="submit" className="btn-save">
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="table-wrapper">
                    <table className="table table-hover table-sortable table-bordered">
                        <thead>
                            <tr>
                                <th>Mã xe</th>
                                <th>Tên xe</th>
                                <th>Giá tiền</th>
                                <th>Màu sắc</th>
                                <th>Nguồn gốc</th>
                                <th>Ngày nhập</th>
                                <th>Số lượng tồn</th>
                                <th>Số đã bán</th>
                                <th>Năm ra mắt</th>
                                <th colSpan="2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="11" style={{textAlign: 'center'}}>Đang tải...</td></tr>
                            ) : cars.length === 0 ? (
                                <tr><td colSpan="11" style={{textAlign: 'center'}}>Không có dữ liệu</td></tr>
                            ) : (
                            cars
                                .filter(car => ((car.model_car_id || car.model || '').toLowerCase().includes(searchTerm.toLowerCase())))
                                .map(car => (
                                    <tr key={car._id || car.model_car_id || car.model}>
                                        <td>{car.model_car_id || car.model}</td>
                                        <td>{car.model_car_name || car.name}</td>
                                        <td>{car.price}</td>
                                        <td>{car.color}</td>
                                        <td>{car.origin_of_car || ''}</td>
                                        <td>{car.date_of_import || ''}</td>
                                        <td>{car.car_number_availability || car.stock}</td>
                                        <td>{car.car_sold || ''}</td>
                                        <td>{car.lauching_year || car.year}</td>
                                        <td>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(car._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleEdit(car._id)}
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

export default CarList;