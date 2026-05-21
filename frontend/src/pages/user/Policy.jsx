import "../../assets/css/user_pages/Policy.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import Slideshow from "../../components/Slideshow";

const Policy = () => {
  useEffect(() => {
    document.title = "Chính sách | VinFast";
  }, []);

  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    document.title = "Chính sách | VinFast";
  }, []);

  const handleTabClick = (tabId) => {
    // Cập nhật active tab
    setActiveTab(tabId);
  };

  return (
    <div className="policy_page">
      <Navbar activePage="policy" />
      {/* <Slideshow/> */}
      <img
        className="policy_page__banner"
        src="/images/banner_chinh_sach.png"
        alt="chinh_sach_banner"
      />

      {/* <h1 className="text-center page-title">Điều khoản, Pháp lý</h1>
      <p className="text-center page-desc">
        Tổng hợp các thông tin về điều khoản và pháp lý của các dịch vụ của
        VinFast.
      </p> */}

      <div className="policy_page-container">
        <div className="policy-tabs">
          <button
            className={`policy-tab ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => handleTabClick("tab1")}
          >
            Cho thuê pin xe điện
          </button>
          <button
            className={`policy-tab ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => handleTabClick("tab2")}
          >
            Điều khoản sử dụng
          </button>
          <button
            className={`policy-tab ${activeTab === "tab3" ? "active" : ""}`}
            onClick={() => handleTabClick("tab3")}
          >
            Quyền riêng tư
          </button>
          <button
            className={`policy-tab ${activeTab === "tab4" ? "active" : ""}`}
            onClick={() => handleTabClick("tab4")}
          >
            Bảo mật thanh toán
          </button>
          <button
            className={`policy-tab ${activeTab === "tab5" ? "active" : ""}`}
            onClick={() => handleTabClick("tab5")}
          >
            Đặt cọc & Đổi trả
          </button>
        </div>

        <div
          className={`policy-content ${activeTab === "tab1" ? "active" : ""}`}
          id="tab1"
        >
          <div className="policy-card">
            <h3>Chính sách dịch vụ cho thuê pin xe ô tô điện VinFast</h3>
            <div className="policy-summary">
              <p>
                Công ty TNHH Kinh Doanh Thương Mại và Dịch Vụ VinFast ("Vinfast
                Trading") là đại lý thương mại cung cấp dịch vụ cho thuê pin ô
                tô của Công ty cổ phần Giải Pháp Năng Lượng VinES ("Bên Cho
                Thuê") tới Khách Hàng, với các điều kiện cơ bản sau:
              </p>
            </div>
            <div className="policy-details">
              <h4>Điều kiện chung của Dịch Vụ</h4>
              <ul>
                <li>
                  Pin là tài sản cho thuê và trong mọi trường hợp thuộc sở hữu
                  của Bên Cho Thuê
                </li>
                <li>
                  Pin phải được sử dụng phù hợp với mục đích nêu trên, không
                  được sử dụng cho xe khác
                </li>
                <li>
                  Bên Cho Thuê có trách nhiệm sửa chữa hoặc thay thế pin trong
                  trường hợp lỗi nhà sản xuất hoặc khi dung lượng pin tối đa
                  (SOH) dưới 70%
                </li>
                <li>
                  Khách Hàng có trách nhiệm tuân thủ quy định về sử dụng và bảo
                  quản pin
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-card">
            <h3>Điều kiện sử dụng và bảo quản pin</h3>
            <div className="policy-details">
              <ul>
                <li>
                  Không tự ý tháo rời, sửa chữa hoặc thay thế các bộ phận, dây
                  cáp hoặc đầu nối điện áp cao
                </li>
                <li>
                  Chỉ được sử dụng nguồn sạc theo khuyến cáo của nhà sản xuất
                </li>
                <li>
                  Không sử dụng pin làm nguồn điện để vận hành các thiết bị khác
                </li>
                <li>
                  Tránh để xe tiếp xúc với nhiệt độ môi trường trên 55°C hoặc
                  dưới -20°C quá 24 giờ
                </li>
                <li>Sạc pin ngay khi dung lượng pin còn lại thấp hơn 5%</li>
              </ul>
            </div>
          </div>

          <div className="policy-card">
            <h3>Biểu phí thuê pin</h3>
            <div className="policy-summary">
              <p>
                Phí thuê pin được áp dụng theo từng dòng xe và quãng đường di
                chuyển hàng tháng:
              </p>
            </div>
            <div className="policy-details">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th rowspan="2">Dòng xe</th>
                      <th colspan="3" style={{ textAlign: "center" }}>
                        Phí dịch vụ hàng tháng (đã bao gồm VAT)
                      </th>
                    </tr>
                    <tr>
                      <th>Dưới 1500 km</th>
                      <th>1500 km - 3000 km</th>
                      <th>Trên 3000 km</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>VF 5 Plus</td>
                      <td>1.200.000 VNĐ</td>
                      <td>1.600.000 VNĐ</td>
                      <td>2.700.000 VNĐ</td>
                    </tr>
                    <tr>
                      <td>VF 6</td>
                      <td>1.600.000 VNĐ</td>
                      <td>1.800.000 VNĐ</td>
                      <td>3.000.000 VNĐ</td>
                    </tr>
                    <tr>
                      <td>VF e34</td>
                      <td>1.800.000 VNĐ</td>
                      <td>2.100.000 VNĐ</td>
                      <td>3.500.000 VNĐ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`policy-content ${activeTab === "tab2" ? "active" : ""}`}
          id="tab2"
        >
          <div className="policy-card">
            <h3>Điều khoản và điều kiện giao dịch</h3>
            <div className="policy-summary">
              <p>
                Điều khoản và Điều kiện này áp dụng cho tất cả các giao dịch
                trên website Vinfastauto.com. Bằng việc truy cập vào Website,
                Quý khách đồng ý với các điều khoản này.
              </p>
            </div>
            <div className="policy-details">
              <h4>Phạm vi áp dụng</h4>
              <p>
                Điều khoản và Điều kiện sẽ được áp dụng cho khách hàng đặt cọc
                mua Sản Phẩm trên Website. Khách hàng tham gia giao dịch trên
                Website bao gồm:
              </p>
              <ul>
                <li>
                  Cá nhân từ đủ 18 tuổi trở lên, có năng lực hành vi dân sự phù
                  hợp
                </li>
                <li>
                  Tổ chức được thành lập và hoạt động hợp pháp theo quy định của
                  pháp luật Việt Nam
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-card">
            <h3>Miễn trừ trách nhiệm</h3>
            <div className="policy-details">
              <p>
                Chúng tôi luôn nỗ lực đảm bảo duy trì hệ thống kỹ thuật của
                Vinfastauto.com trong tình trạng chạy ổn định, an toàn và tuân
                thủ quy định pháp luật. Tuy nhiên, Vinfastauto.com không chịu
                trách nhiệm trước những thiệt hại, tổn thất của Khách Hàng phát
                sinh trong quá trình giao dịch, trừ phi những thiệt hại, tổn
                thất này là do lỗi cố ý của chúng tôi.
              </p>
              <p>
                Vinfastauto.com có thể cung cấp các liên kết hoặc tham chiếu tới
                các trang khác trên Internet được vận hành bởi bên thứ ba, chỉ
                nhằm giúp tạo sự thuận tiện cho Khách Hàng. Vinfastauto.com
                không chịu trách nhiệm với nội dung của các trang khác và vì vậy
                không chịu trách nhiệm pháp lý cho bất kỳ thiệt hại hay thương
                tổn nào phát sinh.
              </p>
            </div>
          </div>

          <div className="policy-card">
            <h3>Điều khoản cookies</h3>
            <div className="policy-summary">
              <p>
                Website thương mại điện tử Vinfastauto.com sử dụng các loại
                Cookies khác nhau cho những mục đích cụ thể.
              </p>
            </div>
            <div className="policy-details">
              <h4>Các loại cookies</h4>
              <ul>
                <li>
                  <strong>Cookies thiết yếu:</strong> Cần thiết để cung cấp dịch
                  vụ và sử dụng các tính năng cơ bản
                </li>
                <li>
                  <strong>Cookies chức năng:</strong> Cho phép sử dụng các tính
                  năng chính và truy cập vào các khu vực an toàn
                </li>
                <li>
                  <strong>Cookies hiệu suất:</strong> Cho phép nâng cao hiệu
                  suất và chức năng của Website
                </li>
                <li>
                  <strong>Cookies cá nhân hóa:</strong> Giúp tùy chỉnh Website
                  khi sử dụng và ghi nhớ lựa chọn
                </li>
                <li>
                  <strong>Cookies tiếp thị:</strong> Sử dụng để truyền tải thông
                  điệp quảng cáo phù hợp
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`policy-content ${activeTab === "tab3" ? "active" : ""}`}
          id="tab3"
        >
          <div className="policy-card">
            <h3>Chính sách quyền riêng tư</h3>
            <div className="policy-summary">
              <p>
                Chính sách quyền riêng tư này mô tả cách thức Công ty TNHH Kinh
                doanh Thương mại và Dịch vụ VinFast và các công ty liên kết thu
                thập và sử dụng thông tin cá nhân của Khách Hàng.
              </p>
            </div>
            <div className="policy-details">
              <h4>Thông tin cá nhân được thu thập</h4>
              <ul>
                <li>
                  <strong>Thông tin Khách Hàng cung cấp:</strong> Tên, địa chỉ
                  email, địa chỉ thực, số điện thoại, thông tin thanh toán, vị
                  trí...
                </li>
                <li>
                  <strong>Thông tin tự động:</strong> Thông tin mạng, thiết bị,
                  vị trí, tương tác với nội dung...
                </li>
                <li>
                  <strong>Thông tin từ nguồn khác:</strong> Thông tin tiếp thị,
                  thông tin đăng ký, thông tin tín dụng...
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-card">
            <h3>Cách thức sử dụng thông tin cá nhân</h3>
            <div className="policy-details">
              <ul>
                <li>
                  <strong>Cung cấp Sản Phẩm:</strong> Để cung cấp, giao hàng và
                  xử lý giao dịch
                </li>
                <li>
                  <strong>Cải thiện Sản Phẩm:</strong> Đo lường sử dụng, phân
                  tích hiệu suất, sửa lỗi...
                </li>
                <li>
                  <strong>Cá nhân hóa trải nghiệm:</strong> Đề xuất sản phẩm,
                  nhận diện sở thích...
                </li>
                <li>
                  <strong>Liên lạc với Khách hàng:</strong> Thông qua email,
                  chat và các kênh khác
                </li>
                <li>
                  <strong>Tiếp thị:</strong> Quảng bá sản phẩm dựa trên sở thích
                </li>
                <li>
                  <strong>Phòng chống gian lận:</strong> Ngăn chặn và phát hiện
                  gian lận, đánh giá rủi ro...
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-card">
            <h3>Thông tin liên lạc và giải quyết khiếu nại</h3>
            <div className="policy-details">
              <p>
                Nếu Khách Hàng có bất kỳ câu hỏi về quyền riêng tư hoặc cần giải
                quyết khiếu nại về việc lộ thông tin cá nhân, vui lòng liên hệ
                với chúng tôi:
              </p>
              <div className="contact-info mt-4">
                <p>
                  <i className="fas fa-building"></i>{" "}
                  <strong>
                    CÔNG TY TNHH KINH DOANH THƯƠNG MẠI VÀ DỊCH VỤ VINFAST
                  </strong>
                </p>
                <p>
                  <i className="fas fa-map-marker-alt"></i> Số 7, đường Bằng
                  Lăng 1, Khu đô thị sinh thái Vinhomes Riverside, Phường Việt
                  Hưng, Quận Long Biên, Hà Nội
                </p>
                <p>
                  <i className="fas fa-envelope"></i> Email:{" "}
                  <a href="mailto:support.vn@vinfastauto.com">
                    support.vn@vinfastauto.com
                  </a>
                </p>
                <p>
                  <i className="fas fa-phone-alt"></i> Điện thoại:{" "}
                  <a href="tel:02439749999">024.3974.9999</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`policy-content ${activeTab === "tab4" ? "active" : ""}`}
          id="tab4"
        >
          <div className="policy-card">
            <h3>Chính sách bảo mật thanh toán</h3>
            <div className="policy-summary">
              <p>
                Hệ thống thanh toán trực tuyến của Vinfastauto.com được cung cấp
                bởi các đối tác cung cấp dịch vụ trung gian thanh toán đã được
                cấp phép hoạt động hợp pháp tại Việt Nam.
              </p>
            </div>
            <div className="policy-details">
              <h4>Cam kết bảo mật</h4>
              <ul>
                <li>
                  Các tiêu chuẩn bảo mật trong thanh toán tuân thủ theo tiêu
                  chuẩn của Đối Tác Thanh Toán
                </li>
                <li>
                  Thành Viên không được đưa thông tin thanh toán, thông tin tài
                  khoản/thẻ cho bất kỳ bên thứ ba nào
                </li>
                <li>
                  Thành Viên không được sử dụng công cụ để xâm nhập trái phép
                  vào hệ thống
                </li>
              </ul>
              <h4>Quy định bảo mật</h4>
              <ul>
                <li>
                  Giao dịch thẻ quốc tế và thẻ nội địa tuân thủ tiêu chuẩn bảo
                  mật TLS
                </li>
                <li>Được chứng nhận bảo mật PCI DSS do Trustwave cung cấp</li>
                <li>
                  Vinfastauto.com không trực tiếp lưu trữ thông tin thẻ khách
                  hàng
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`policy-content ${activeTab === "tab5" ? "active" : ""}`}
          id="tab5"
        >
          <div className="policy-card">
            <h3>Điều khoản đặt cọc</h3>
            <div className="policy-summary">
              <p>
                Khi đặt cọc mua xe VinFast, Khách Hàng cần tuân thủ các điều
                khoản và điều kiện theo quy định.
              </p>
            </div>
            <div className="policy-details">
              <h4>Thỏa thuận đặt cọc</h4>
              <ul>
                <li>
                  Khách Hàng đặt cọc để đảm bảo việc giao kết hợp đồng mua bán
                  xe ô tô VinFast
                </li>
                <li>
                  Việc đặt hàng, chấp thuận Điều Khoản Đặt Cọc và thanh toán
                  Tiền Đặt Cọc tạo thành thỏa thuận có hiệu lực pháp lý
                </li>
              </ul>
              <h4>Tiền đặt cọc</h4>
              <ul>
                <li>
                  Khách Hàng có thể chuyển tiền đặt cọc qua thẻ tín dụng, ATM
                  nội địa hoặc chuyển khoản ngân hàng
                </li>
                <li>
                  Thời hạn đặt cọc bắt đầu từ Thời Điểm Hoàn Tất Đặt Cọc tới
                  ngày ký kết Hợp Đồng Mua Bán
                </li>
                <li>
                  Nếu Khách Hàng không ký Hợp Đồng Mua Bán, VinFast Trading được
                  quyền giữ lại/sở hữu Tiền Đặt Cọc
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-card">
            <h3>Chính sách đổi trả</h3>
            <div className="policy-details">
              <ul>
                <li>Sản Phẩm không áp dụng đổi, trả</li>
                <li>
                  Sản Phẩm được bảo hành tại hệ thống showroom của VinFast và
                  nhà phân phối chính hãng
                </li>
                <li>
                  Chương trình triệu hồi được áp dụng để xử lý miễn phí các lỗi
                  liên quan đến chất lượng và an toàn cho các xe đang lưu hành
                </li>
              </ul>
            </div>
          </div>

          <div className="policy-card">
            <h3>Chính sách vận chuyển</h3>
            <div className="policy-details">
              <p>
                Sản Phẩm được phân phối thông qua hệ thống showroom VinFast và
                Nhà phân phối chính hãng trên toàn quốc. Chúng tôi không áp dụng
                chính sách vận chuyển trực tiếp tới Khách Hàng mua hàng qua
                vinfastauto.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Policy;
