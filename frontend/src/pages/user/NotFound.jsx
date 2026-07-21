import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/user_pages/NotFound.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <Navbar />
            <div className="not-found-container">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Không tìm thấy trang</h2>
                <p className="not-found-text">Xin lỗi, trang mà Quý khách đang tìm kiếm không tồn tại. <br/>Vui lòng truy cập vào các trang khác của chúng tôi để khám phá các sản phẩm cùng ưu đãi hấp dẫn. <br/>Trân trọng cảm ơn!</p>
                <Link to="/" className="not-found-btn">Quay về trang chủ</Link>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;
