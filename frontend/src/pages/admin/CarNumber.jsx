import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/CarNumber.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import { carService } from '../../services/carService';

const CarNumber = () => {
    const [carNumbers, setCarNumbers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.title = "Quản lý số lượng xe | VinFast";
        fetchCarNumbers();
    }, []);

    const fetchCarNumbers = async () => {
        try {
            setLoading(true);
            const response = await carService.getAllCars(1, 100);
            const carsArray = Array.isArray(response) ? response : (response?.cars || []);
            
            const apiCarNumbers = carsArray.flatMap(car => {
                let dateImportStr = '';
                if (car.date_of_import) {
                    const d = new Date(car.date_of_import);
                    if (!isNaN(d)) {
                        dateImportStr = d.toLocaleDateString('vi-VN');
                    } else {
                        dateImportStr = car.date_of_import;
                    }
                }
                
                if (!car.variants || car.variants.length === 0) {
                    return [{
                        model_car_id: car.model,
                        colorName: 'Mặc định',
                        colorHex: '#ccc',
                        date_import: dateImportStr || new Date().toLocaleDateString('vi-VN'),
                        remaining: 0,
                        imported: 0,
                        sold: 0
                    }];
                }

                return car.variants.map(v => ({
                    model_car_id: `${car.model} (${v.colorName})`,
                    colorName: v.colorName,
                    colorHex: v.colorHex,
                    date_import: dateImportStr || new Date().toLocaleDateString('vi-VN'),
                    remaining: (v.stock || 0) - (v.sold || 0),
                    imported: v.stock || 0,
                    sold: v.sold || 0
                }));
            });
            
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
                    <h1 className="page-main-title">QUẢN LÝ TỒN KHO XE</h1>
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

                {/* Read-only Table */}

                <div className="table-wrapper">
                    <table className="table table-hover table-sortable table-bordered">
                        <thead>
                            <tr>
                                <th>Mã xe</th>
                                <th>Màu sắc</th>
                                <th>Ngày nhập</th>
                                <th>Số lượng tồn</th>
                                <th>Số lượng nhập</th>
                                <th>Số lượng xe đã bán</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="admin-text-center">Đang tải...</td></tr>
                            ) : carNumbers.length === 0 ? (
                                <tr><td colSpan="6" className="admin-text-center">Không có dữ liệu</td></tr>
                            ) : (
                            carNumbers
                                .filter(car => car.model_car_id.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((car, index) => (
                                    <tr key={index}>
                                        <td>{car.model_car_id}</td>
                                        <td>
                                            <div className="car-color-wrapper">
                                                <div className="car-color-swatch" style={{backgroundColor: car.colorHex}}></div>
                                                {car.colorName}
                                            </div>
                                        </td>
                                        <td>{car.date_import}</td>
                                        <td>{car.remaining}</td>
                                        <td>{car.imported}</td>
                                        <td>{car.sold}</td>
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