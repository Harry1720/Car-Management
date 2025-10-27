import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/CarNumber.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';

const CarNumber = () => {
    const [carNumbers, setCarNumbers] = useState([
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
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [editingCarNumber, setEditingCarNumber] = useState(null);

    const handleDelete = (carId) => {
        setCarNumbers(carNumbers.filter(car => car.model_car_id !== carId));
    };

    const handleEdit = (carId) => {
        const carToEdit = carNumbers.find(car => car.model_car_id === carId);
        setEditingCarNumber(carToEdit);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setCarNumbers(carNumbers.map(car => 
            car.model_car_id === editingCarNumber.model_car_id ? editingCarNumber : car
        ));
        setEditingCarNumber(null);
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB'); // Will format as DD/MM/YYYY
    };

    useEffect(() => {
        document.title = "Quản lý số lượng xe | VinFast";
    }, []);

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
                        <form onSubmit={handleUpdate}>
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
                        {carNumbers
                            .filter(car => car.model_car_id.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(car => (
                                <tr key={car.model_car_id}>
                                    <td>{car.model_car_id}</td>
                                    <td>{formatDate(car.date_import)}</td>
                                    <td>{car.remaining}</td>
                                    <td>{car.imported}</td>
                                    <td>{car.sold}</td>
                                    <td>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDelete(car.model_car_id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="edit-btn"
                                            onClick={() => handleEdit(car.model_car_id)}
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

export default CarNumber;