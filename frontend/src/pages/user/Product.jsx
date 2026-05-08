import '../../assets/css/user_pages/Product.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from "react";
import Slideshow from '../../components/Slideshow';
import { carService } from '../../services/carService';

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const carsPerPage = 6;

    useEffect(() => {
        document.title = "Sản phẩm | VinFast";
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            setLoading(true);
            const data = await carService.getAllCars(1, 100); // Lấy 100 xe
            const carsArray = Array.isArray(data) ? data : (data?.cars || []);
            const carsData = carsArray.map(car => {
                const priceValue = car.price || 0;
                const displayPrice = priceValue >= 100000000 ? (priceValue / 1000000000).toFixed(1) : (priceValue / 1000000).toFixed(1);
                const unit = priceValue >= 100000000 ? 'B' : 'M';
                return {
                    _id: car._id,
                    name: car.name,
                    model: car.model,
                    image: car.images && car.images.length > 0 ? car.images[0] : "/images/car-pics/vf3/vf3yl.png",
                    origin: car.origin_of_car || "Việt Nam",
                    year: car.year || 2024,
                    hw: car.specifications?.engine || "N/A",
                    price: car.price,
                    value: `${displayPrice}${unit} VND`,
                    link: `../deposit?model=${car.model.toLowerCase()}`
                };
            });
            setCars(carsData);
            setError('');
        } catch (err) {
            setError('Không thể tải danh sách xe. Vui lòng thử lại.');
            console.error('Error fetching cars:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderCars = () => {
        const startIndex = (currentPage - 1) * carsPerPage;
        const endIndex = Math.min(startIndex + carsPerPage, cars.length);
        const carsToShow = cars.slice(startIndex, endIndex);

        const rows = [];
        for (let i = 0; i < carsToShow.length; i += 3) {
            const rowCars = carsToShow.slice(i, Math.min(i + 3, carsToShow.length));
            rows.push(
                <div className="car-row" key={i}>
                    {rowCars.map((car, index) => (
                        <div className="car-card" key={index}>
                            <div className="car-image">
                                <img src={car.image} alt={car.name} />
                            </div>
                            <div className="car-info">
                                <h3>{car.name}</h3>
                                <ul className="car-details">
                                    <li><i className="fas fa-globe"></i> Xuất xứ: {car.origin}</li>
                                    <li><i className="fas fa-calendar"></i> Năm: {car.year}</li>
                                    <li><i className="fas fa-tachometer-alt"></i> Công suất: {car.hw}</li>
                                </ul>
                                <div className="car-price">{car.value}</div>
                            </div>
                            <button className="car-button" onClick={() => window.location.href = car.link}>
                                Chi tiết
                            </button>
                        </div>
                    ))}
                </div>
            );
        }
        return rows;
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(cars.length / carsPerPage);
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`page-btn ${i === currentPage ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className='product_page'>
            <Navbar activePage="products" />
            <Slideshow/>
            <h1 className="text-center page-title">Dòng xe ô tô điện VinFast</h1>
            <p className="text-center page-desc">Khám phá các mẫu xe điện thông minh, hiện đại và thân thiện với môi trường từ VinFast – Lựa chọn tối ưu cho tương lai di chuyển xanh.</p>

            {loading && <p className="text-center">Đang tải danh sách xe...</p>}
            {error && <p className="text-center text-danger">{error}</p>}
            
            {!loading && !error && (
                <>
                    <div className="cars-grid-container">
                        {renderCars()}
                    </div>
                    <div className="pagination">
                        {renderPagination()}
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};

export default Products;