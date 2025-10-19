import React, { useState, useEffect } from 'react';
import '../assets/css/components/Slideshow.css';

const Slideshow = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [manualChange, setManualChange] = useState(false);

    const showSlides = () => {
        setSlideIndex(prev => {
            const nextIndex = prev + 1 > 2 ? 0 : prev + 1;
            return nextIndex;
        });
    };

    useEffect(() => {
        let autoSlideInterval;
        if (!manualChange) {
            autoSlideInterval = setTimeout(showSlides, 3000);
        }
        setManualChange(false);
        return () => clearTimeout(autoSlideInterval);
    }, [slideIndex, manualChange]);

    const plusSlides = (n) => {
        setManualChange(true);
        setSlideIndex(prev => {
            let newIndex = prev + (n === 0 ? 1 : -1);
            if (newIndex > 2) newIndex = 0;
            if (newIndex < 0) newIndex = 2;
            return newIndex;
        });
    };

    const currentSlide = (n) => {
        setManualChange(true);
        setSlideIndex(n - 1);
    };

    const openModal = (modalId) => {
        document.getElementById(modalId).style.display = "block";
    };

    const closeModal = (modalId) => {
        document.getElementById(modalId).style.display = "none";
    };

    const handleModalClick = (event) => {
        if (event.target.className.contains('modal')) {
            event.target.style.display = "none";
        }
    };
    window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

    return (
        <div className="slideshow-container" onClick={handleModalClick}>
            <div className="mySlides" style={{ display: slideIndex === 0 ? 'block' : 'none' }}>
                <img src="/images/banner/adst.png" style={{ width: '100%' }} onClick={() => openModal('modal1')} alt="Slide 1" />
            </div>
            <div className="mySlides" style={{ display: slideIndex === 1 ? 'block' : 'none' }}>
                <img src="/images/banner/pbad.png" style={{ width: '100%' }} onClick={() => openModal('modal2')} alt="Slide 2" />
            </div>
            <div className="mySlides" style={{ display: slideIndex === 2 ? 'block' : 'none' }}>
                <img src="/images/banner/qotad.png" style={{ width: '100%' }} onClick={() => openModal('modal3')} alt="Slide 3" />
            </div>

            <a className="prev" href="#" onClick={(e) => { e.preventDefault(); plusSlides(1); }} style={{ cursor: 'pointer' }}>&#10094;</a>
            <a className="next" href="#" onClick={(e) => { e.preventDefault(); plusSlides(0); }} style={{ cursor: 'pointer' }}>&#10095;</a>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <span className={`dot ${slideIndex === 0 ? 'dot_active' : ''}`} onClick={() => currentSlide(1)}></span>
                <span className={`dot ${slideIndex === 1 ? 'dot_active' : ''}`} onClick={() => currentSlide(2)}></span>
                <span className={`dot ${slideIndex === 2 ? 'dot_active' : ''}`} onClick={() => currentSlide(3)}></span>
            </div>

            <div id="modal1" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => closeModal('modal1')}>&times;</span>
                    <h2 className="modal-title">Nhận ngay 01 vé VIP Sky Tour</h2>
                    <p className="modal-text">Quý khách khi đặt cọc xe Vinfast VF Wild sẽ nhận ngay 01 vé VIP xem show Sky Tour của Sơn Tùng-MTP.</p>
                    <p className="modal-text-notice">Mỗi khách hàng chỉ được tham gia một (01) lần, chương trình áp dụng đến 30/06/2024.</p>
                </div>
            </div>
            <div id="modal2" className="modal" style={{ margin: '100px 40px', width: '95%' }}>
                <div className="modal-content" style={{ backgroundColor: 'rgba(255,255,255,0.8)', padding: '20px' }}>
                    <span className="close" onClick={() => closeModal('modal2')}>&times;</span>
                    <h2 className="modal-title">Nhận ngay 01 cặp vé concert PINK BORN</h2>
                    <p className="modal-text">20 cặp vé PINK BORN dành cho những khách hàng mua xe sớm nhất tại đại lý.</p>
                    <p className="modal-text-notice">Mỗi khách hàng chỉ được tham gia một (01) lần, chương trình áp dụng đến khi hết vé.</p>
                </div>
            </div>
            <div id="modal3" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => closeModal('modal3')}>&times;</span>
                    <h2 className="modal-title">Giảm ngay 10% tiền phí trước bạ</h2>
                    <p className="modal-text">Vinfast luôn đồng hành cùng các gia đình trẻ tại Việt Nam, với mong muốn tiếp cận đến mọi gia đình, Vinfast trợ giá 10% tiền phí trước bạ cho những cặp đôi kết hôn vào năm 2024.</p>
                    <p className="modal-text">Điều kiện tham gia: Khi thực hiện nhận xe tại đại lý, đại lý sẽ trực tiếp thanh toán 10% phí trước bạ cho khách hàng.</p>
                    <p className="modal-text">Khách hàng khi tham gia chương trình phải xuất trình giấy chứng nhận kết hôn để nhân viên đại lý xác nhận</p>
                    <p className="modal-text-notice">Chương trình chỉ áp dụng cho những giấy chứng nhận kết hôn trong năm 2024, áp dụng đến hết tháng 12/2024. Lưu ý: Mỗi hộ gia đình chỉ được tham gia một (01) lần.</p>
                </div>
            </div>
        </div>
    );
};

export default Slideshow;