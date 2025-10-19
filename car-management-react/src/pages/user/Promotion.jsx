import styles from '../../assets/css/user_pages/Promotion.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect } from "react";
import Slideshow from '../../components/Slideshow';

const Promotion = () => {
    useEffect(() => {
        document.title = "Ưu đãi | VinFast";
    }, []);

    return (
        <>
            <Navbar activePage="promotions" />
            <Slideshow/>
            <div className={styles["promotion-container"]}>
                <h1 className={styles["section-title"]}>Ưu đãi đặc biệt</h1>
                <p className={styles["section-description"]}>
                    Khám phá các ưu đãi đặc biệt từ VinFast dành riêng cho bạn
                </p>

                <div className={styles["promotions-grid"]}>
                    <div className={styles["promotion-card"]}>
                        <div className={styles["promotion-image"]}>
                            <img src="/images/promotions/financing.jpg" alt="Ưu đãi tài chính" />
                        </div>
                        <div className={styles["promotion-content"]}>
                            <h3>Trả góp 0% lãi suất</h3>
                            <p>Áp dụng cho tất cả các dòng xe VF 5, VF 6 và VF 7 với kỳ hạn 12 tháng đầu khi mua xe thông qua ngân hàng đối tác</p>
                            <div className={styles["promotion-features"]}>
                                <span><i className="fas fa-check-circle"></i> Lãi suất 0%</span>
                                <span><i className="fas fa-check-circle"></i> Thời gian 12 tháng</span>
                                <span><i className="fas fa-check-circle"></i> Không cần chứng minh thu nhập</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles["promotion-card"]}>
                        <div className={styles["promotion-image"]}>
                            <img src="/images/promotions/battery.jpg" alt="Ưu đãi pin" />
                        </div>
                        <div className={styles["promotion-content"]}>
                            <h3>Miễn phí 1 năm thuê pin</h3>
                            <p>Nhận ngay 1 năm thuê pin miễn phí khi mua xe VinFast trong tháng 6/2024</p>
                            <div className={styles["promotion-features"]}>
                                <span><i className="fas fa-check-circle"></i> Tiết kiệm đến 31,2 triệu</span>
                                <span><i className="fas fa-check-circle"></i> Áp dụng cho tất cả dòng xe</span>
                                <span><i className="fas fa-check-circle"></i> Thời hạn: 30/06/2024</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles["promotion-card"]}>
                        <div className={styles["promotion-image"]}>
                            <img src="/images/promotions/trade-in.jpg" alt="Thu cũ đổi mới" />
                        </div>
                        <div className={styles["promotion-content"]}>
                            <h3>Thu cũ đổi mới - Lên đời xe điện</h3>
                            <p>Đổi xe xăng cũ lấy xe điện mới với ưu đãi đặc biệt lên đến 20 triệu đồng</p>
                            <div className={styles["promotion-features"]}>
                                <span><i className="fas fa-check-circle"></i> Định giá xe cũ cao hơn thị trường</span>
                                <span><i className="fas fa-check-circle"></i> Hỗ trợ thủ tục sang tên</span>
                                <span><i className="fas fa-check-circle"></i> Áp dụng cho mọi hãng xe</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles["promotion-card"]}>
                        <div className={styles["promotion-image"]}>
                            <img src="/images/promotions/holiday.jpg" alt="Khuyến mãi mùa lễ" />
                        </div>
                        <div className={styles["promotion-content"]}>
                            <h3>Ưu đãi mùa hè 2024</h3>
                            <p>Nhận ngay gói quà tặng trị giá 30 triệu đồng khi mua xe VinFast trong mùa hè này</p>
                            <div className={styles["promotion-features"]}>
                                <span><i className="fas fa-check-circle"></i> Tặng bộ phụ kiện chính hãng</span>
                                <span><i className="fas fa-check-circle"></i> Voucher sạc pin trị giá 10 triệu</span>
                                <span><i className="fas fa-check-circle"></i> Bảo hiểm vật chất 1 năm</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles["promotion-card"]}>
                        <div className={styles["promotion-image"]}>
                            <img src="/images/promotions/business.jpg" alt="Ưu đãi doanh nghiệp" />
                        </div>
                        <div className={styles["promotion-content"]}>
                            <h3>Gói ưu đãi doanh nghiệp</h3>
                            <p>Dành cho các doanh nghiệp và đơn vị mua xe với số lượng lớn từ 3 xe trở lên</p>
                            <div className={styles["promotion-features"]}>
                                <span><i className="fas fa-check-circle"></i> Giảm giá theo số lượng</span>
                                <span><i className="fas fa-check-circle"></i> Hỗ trợ dịch vụ sau bán hàng ưu tiên</span>
                                <span><i className="fas fa-check-circle"></i> Tặng trạm sạc miễn phí</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles["promotion-card"]}>
                        <div className={styles["promotion-image"]}>
                            <img src="/images/promotions/concert.jpg" alt="Vé concert" />
                        </div>
                        <div className={styles["promotion-content"]}>
                            <h3>Tặng vé concert PINK BORN</h3>
                            <p>Cơ hội nhận ngay 1 cặp vé concert PINK BORN cho 20 khách hàng đầu tiên mua xe VinFast VF 8 hoặc VF 9</p>
                            <div className={styles["promotion-features"]}>
                                <span><i className="fas fa-check-circle"></i> 20 cặp vé hạng VIP</span>
                                <span><i className="fas fa-check-circle"></i> Ưu tiên khách hàng đầu tiên</span>
                                <span><i className="fas fa-check-circle"></i> Thời hạn: 30/06/2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Promotion;
