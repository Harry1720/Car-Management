import '../../assets/css/user_pages/Product.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from "react";
import Slideshow from '../../components/Slideshow';

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 6;

    const cars = [
        { name: "VinFast VF3", image: "/images/car-pics/vf3/vf3yl.png", origin: "Việt Nam", year: "2023", hw: "32kW", value: "$8 500", link: "../user/Deposit.html?model=vf3" },
        { name: "VinFast VF5", image: "/images/car-pics/vf5/vf5b.png", origin: "Việt Nam", year: "2023", hw: "100kW", value: "$20 000", link: "../user/Deposit.html?model=vf5" },
        { name: "VinFast VF6", image: "/images/car-pics/vf6/vf6b.png", origin: "Việt Nam", year: "2023", hw: "150kW", value: "$29 000", link: "../user/Deposit.html?model=vf6" },
        { name: "VinFast VF7", image: "/images/car-pics/vf7/vf7bl.png", origin: "Việt Nam", year: "2023", hw: "200kW", value: "$36 000", link: "../user/Deposit.html?model=vf7" },
        { name: "VinFast VF8", image: "/images/car-pics/vf8/vf8b.png", origin: "Việt Nam", year: "2023", hw: "260kW", value: "$47 000", link: "../user/Deposit.html?model=vf8" },
        { name: "VinFast VF9", image: "/images/car-pics/vf9/vf9r.png", origin: "Việt Nam", year: "2023", hw: "300kW", value: "$64 000", link: "../user/Deposit.html?model=vf9" },
        { name: "VinFast VFe34", image: "/images/car-pics/vfe34/vfe34wh.png", origin: "Việt Nam", year: "2022", hw: "100kW", value: "$30 000", link: "../user/Deposit.html?model=vfe34" },
        { name: "VinFast Wild", image: "/images/car-pics/vfwild.png", origin: "Việt Nam", year: "2024", hw: "664HP", value: "$50 000", link: "../user/Deposit.html?model=vfwild" },
    ];

    useEffect(() => {
        document.title = "Sản phẩm | VinFast";
    }, []);

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
        <>
            <Navbar activePage="products" />
            <Slideshow/>
            <h1 className="text-center page-title">Dòng xe ô tô điện VinFast</h1>
            <p className="text-center page-desc">Khám phá các mẫu xe điện thông minh, hiện đại và thân thiện với môi trường từ VinFast – Lựa chọn tối ưu cho tương lai di chuyển xanh.</p>

            <div className="cars-grid-container">
                {renderCars()}
            </div>
            <div className="pagination">
                {renderPagination()}
            </div>
            <Footer />
        </>
    );
};

export default Products;