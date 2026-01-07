import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/CarNumber.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import { carService } from '../../services/carService';

const CarNumber = () => {
    // Sample data
    const oldCarNumbers = [
        {
            model_car_id: "VINVF8BL",
            date_import: "2024-06-01",
            remaining: 8,
            imported: 11,
            sold: 3
        },
        {
            model_car_id: "VINVF8WH",
            date_import: "2024-06-01",
            remaining: 9,
            imported: 16,
            sold: 7
        },
        {
            model_car_id: "VINVF9CR",
            date_import: "2024-06-01",
            remaining: 10,
            imported: 20,
            sold: 10
        },
        {
            model_car_id: "VINVF5B",
            date_import: "2024-07-01",
            remaining: 8,
            imported: 20,
            sold: 12
        },
        {
            model_car_id: "VINVF6G",
            date_import: "2024-08-01",
            remaining: 8,
            imported: 16,
            sold: 8
        },
        {
            model_car_id: "VINVF5B",
            date_import: "2024-08-05",
            remaining: 12,
            imported: 20,
            sold: 8
        },
        {
            model_car_id: "VINVF7P",
            date_import: "2024-08-10",
            remaining: 10,
            imported: 18,
            sold: 8
        },
        {
            model_car_id: "VINVF8B",
            date_import: "2024-08-15",
            remaining: 7,
            imported: 15,
            sold: 8
        },
        {
            model_car_id: "VINVF9BL",
            date_import: "2024-08-20",
            remaining: 6,
            imported: 14,
            sold: 8
        },
        {
            model_car_id: "VINVF6A",
            date_import: "2024-08-25",
            remaining: 9,
            imported: 17,
            sold: 8
        },
        {
            model_car_id: "VINVF8E",
            date_import: "2024-09-01",
            remaining: 11,
            imported: 19,
            sold: 8
        },
        {
            model_car_id: "VINVF9S",
            date_import: "2024-09-05",
            remaining: 5,
            imported: 13,
            sold: 8
        },
        {
            model_car_id: "VINVF5C",
            date_import: "2024-09-10",
            remaining: 14,
            imported: 22,
            sold: 8
        },
        {
            model_car_id: "VINVF6B",
            date_import: "2024-09-15",
            remaining: 8,
            imported: 16,
            sold: 8
        },
        {
            model_car_id: "VINVF9L",
            date_import: "2024-09-20",
            remaining: 4,
            imported: 12,
            sold: 8
        }
    ];

    const [carNumbers, setCarNumbers] = useState(oldCarNumbers);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [editingCarNumber, setEditingCarNumber] = useState(null);

    useEffect(() => {
        document.title = "Quản lý số lượng xe | VinFast";
        fetchCarNumbers();
    }, []);

    const fetchCarNumbers = async () => {
        try {
            setLoading(true);
            const response = await carService.getAllCars(1, 100);
            const carsArray = Array.isArray(response) ? response : (response?.cars || []);
            
            // Map API cars to carNumbers format
            const apiCarNumbers = carsArray.map(car => ({
                model_car_id: car.model,
                date_import: car.date_of_import || new Date().toISOString().split('T')[0],
                remaining: (car.stock || 0) - (car.car_sold || 0),
                imported: car.stock || 0,
                sold: car.car_sold || 0
            }));
            
            // Merge sample data with API data
            setCarNumbers([...oldCarNumbers, ...apiCarNumbers]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cars:', error);
            setCarNumbers(oldCarNumbers);
            setLoading(false);
        }
    };

    return(
        <>
            <Navbar/>
            <div className="car-number-page">
                <h1 id="heading"><b>Quản lý số lượng xe</b></h1>

                <div className="row" id="add-row-form3">
                    <div className="col">
                        <input 
                            type="text" 
                            id="id-search" 
                            placeholder="Tìm kiếm theo mã xe..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {editingCarNumber && (
                    <div className="edit-form">
                        <h3>Chỉnh sửa thông tin số lượng xe</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setCarNumbers(carNumbers.map(car => 
                                car.model_car_id === editingCarNumber.model_car_id ? editingCarNumber : car
                            ));
                            setEditingCarNumber(null);
                        }}>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Mã xe</label>
                                    <input 
                                        type="text" 
                                        value={editingCarNumber.model_car_id}
                                        disabled
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Ngày nhập</label>
                                    <input 
                                        type="date"
                                        value={editingCarNumber.date_import}
                                        onChange={(e) => setEditingCarNumber({
                                            ...editingCarNumber, 
                                            date_import: e.target.value
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>Số lượng tồn</label>
                                    <input 
                                        type="number"
                                        value={editingCarNumber.remaining}
                                        onChange={(e) => setEditingCarNumber({
                                            ...editingCarNumber, 
                                            remaining: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Số lượng nhập</label>
                                    <input 
                                        type="number"
                                        value={editingCarNumber.imported}
                                        onChange={(e) => setEditingCarNumber({
                                            ...editingCarNumber, 
                                            imported: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="form-col">
                                    <label>Số lượng đã bán</label>
                                    <input 
                                        type="number"
                                        value={editingCarNumber.sold}
                                        onChange={(e) => setEditingCarNumber({
                                            ...editingCarNumber, 
                                            sold: e.target.value
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setEditingCarNumber(null)}>
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
                                <th>Ngày nhập</th>
                                <th>Số lượng tồn</th>
                                <th>Số lượng nhập</th>
                                <th>Số lượng xe đã bán</th>
                                <th colSpan="2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" style={{textAlign: 'center'}}>Đang tải...</td></tr>
                            ) : carNumbers.length === 0 ? (
                                <tr><td colSpan="7" style={{textAlign: 'center'}}>Không có dữ liệu</td></tr>
                            ) : (
                            carNumbers
                                .filter(car => car.model_car_id.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((car, index) => (
                                    <tr key={index}>
                                        <td>{car.model_car_id}</td>
                                        <td>{car.date_import}</td>
                                        <td>{car.remaining}</td>
                                        <td>{car.imported}</td>
                                        <td>{car.sold}</td>
                                        <td>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => setCarNumbers(carNumbers.filter((_, i) => i !== index))}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button 
                                                className="edit-btn"
                                                onClick={() => setEditingCarNumber(car)}
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

export default CarNumber;