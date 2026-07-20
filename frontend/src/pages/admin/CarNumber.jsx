import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/CarNumber.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import { carService } from '../../services/carService';

const CarNumber = () => {
    const [carNumbers, setCarNumbers] = useState([]);
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
            
            setCarNumbers(apiCarNumbers);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cars:', error);
            setCarNumbers([]);
            setLoading(false);
        }
    };

    return(
        <>
            <Navbar/>
            <div className="car-number-page">
                <div className="page-header-block">
                    <span className="page-overline">CAR STOCK</span>
                    <h1 className="page-main-title">QUẢN LÝ SỐ LƯỢNG XE</h1>
                    <p className="page-subtitle">Quản lý và cập nhật số lượng xe tồn kho, xe đã bán.</p>
                </div>

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
                    <div className="modal-overlay" onClick={() => setEditingCarNumber(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
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
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </button>
                                        </td>
                                        <td>
                                            <button 
                                                className="edit-btn"
                                                onClick={() => setEditingCarNumber(car)}
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

export default CarNumber;