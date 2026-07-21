import "../../assets/css/user_pages/ChargingStation.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Slideshow from "../../components/Slideshow";
import { useEffect, useState } from "react";

const ChargingStation = () => {
  // State để quản lý active tab
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "tab-vf5",
  );

  useEffect(() => {
    document.title = "Trạm sạc | VinFast";

    // Logic từ chargingStation.js
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabBtns.forEach((button) => {
      button.addEventListener("click", function () {
        tabBtns.forEach((btn) => btn.classList.remove("active"));
        tabPanels.forEach((panel) => panel.classList.remove("active"));

        button.classList.add("active");

        const targetPanel = document.getElementById(button.dataset.target);
        if (targetPanel) {
          targetPanel.classList.add("active");
        }
      });
    });

    // Cleanup function
    return () => {
      tabBtns.forEach((button) => {
        button.removeEventListener("click", () => {});
      });
    };
  }, []); // Empty dependency array

  // Handler cho việc chuyển tab
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    localStorage.setItem("activeTab", tabId);

    // Remove active class from all tabs and panels
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabBtns.forEach((btn) => btn.classList.remove("active"));
    tabPanels.forEach((panel) => panel.classList.remove("active"));

    // Add active class to selected tab and panel
    const selectedBtn = document.querySelector(`[data-target="${tabId}"]`);
    const selectedPanel = document.getElementById(tabId);

    if (selectedBtn) selectedBtn.classList.add("active");
    if (selectedPanel) selectedPanel.classList.add("active");
  };
  return (
    <div className="charging_page">
      <Navbar activePage="charging" />
      {/* <Slideshow/> */}

      <img
        className="charging_page__banner"
        src="/images/tramsac/tram_sac_banner.webp"
        alt="tram_sac_banner"
      />

      <div className="container_charging">
        <div className="container_charging__hero_section">
          <div className="row charge_policy first_row">
            <div className="col">
              <h3 className="section-title">Thuê pin linh hoạt</h3>
              <p className="subtitle_below">
                Với phương châm luôn đặt lợi ích Khách hàng lên hàng đầu,
                VinFast áp dụng chính sách cho thuê pin độc đáo, ưu việt và khác
                biệt với tất cả các mô hình cho thuê pin từ trước tới nay trên
                thế giới.
              </p>
            </div>
            <div className="col">
              <img
                className="policy_img"
                src="/images/tramsac/pin-tramsac-1.png"
              />
            </div>
          </div>

          <div className="row charge_policy charge_solution">
            <div className="col">
              <img
                className="policy_img"
                src="https://storage.googleapis.com/vinfast-data-01/pin-tramsac-2_1660273363.png"
              />
            </div>
            <div className="col">
              <h3 className="section-title">Đa dạng giải pháp sạc</h3>
              <p className="subtitle_below">
                VinFast cung cấp đa dạng giải pháp sạc để đáp ứng nhu cầu sử
                dụng của Khách hàng một cách thuận tiện nhất.
              </p>
            </div>
          </div>
        </div>

        <div className="bat_profit">
          <h2 className="section-title">Lợi ích của thuê pin</h2>
          <p className="subtitle_below">
            Giúp khách hàng yên tâm & tiện lợi hơn khi sử dụng dịch vụ của
            Vinfast.
          </p>
          <div className="row">
            <div className="col located_charge">
              <img
                src="/images/tramsac/charging.svg"
                alt="icon"
                width="48"
                height="48"
              />
              <p>Khách hàng không tốn tiền sửa chữa, bảo dưỡng Pin.</p>
            </div>
            <div className="col located_charge">
              <img
                src="/images/tramsac/piggy.svg"
                alt="icon"
                width="48"
                height="48"
              />
              <p>
                Khách hàng sử dụng điều hòa, sưởi bằng điện với chi phí rẻ hơn
                chạy xăng.
              </p>
            </div>
            <div className="col located_charge">
              <img
                src="/images/tramsac/petrol.svg"
                alt="icon"
                width="48"
                height="48"
              />
              <p>
                Nếu Khách hàng di chuyển nhiều hàng tháng thì chi phí thuê pin
                theo gói cố định và tiền sạc điện sẽ rẻ hơn tiền xăng hàng tháng
                khi dùng xe xăng cùng hạng.
              </p>
            </div>
          </div>
        </div>

        {/* Chính sách thuê pin */}
        <div className="section-highlight">
          <h2 className="section-title charging_page__head-title">
            Chính sách thuê pin
          </h2>
          <p className="subtitle_below">
            Một vài điểm cần chú ý khi sử dụng dịch vụ thuê pin của Vinfast. Tuy
            nhiên quyền lợi của khách hàng luôn là trên hết.
          </p>
          <div className="policy-container">
            <div className="policy-tabs">
              <div className="policy-tab-buttons">
                <button
                  className="tab-btn"
                  data-target="tab-general"
                  onClick={() => handleTabClick("tab-general")}
                >
                  Chính sách chung
                </button>
                <button
                  className="tab-btn active"
                  data-target="tab-vf5"
                  onClick={() => handleTabClick("tab-vf5")}
                >
                  VF 5 Plus
                </button>
                <button
                  className="tab-btn"
                  data-target="tab-vf9"
                  onClick={() => handleTabClick("tab-vf9")}
                >
                  VF 9
                </button>
                <button
                  className="tab-btn"
                  data-target="tab-festival"
                  onClick={() => handleTabClick("tab-festival")}
                >
                  Khuyến mãi
                </button>
                <button
                  className="tab-btn"
                  data-target="tab-charge-fee"
                  onClick={() => handleTabClick("tab-charge-fee")}
                >
                  Phí thuê pin
                </button>
                <button
                  className="tab-btn"
                  data-target="tab-charge-contract"
                  onClick={() => handleTabClick("tab-charge-contract")}
                >
                  Hợp đồng
                </button>
                <button
                  className="tab-btn"
                  data-target="tab-charge-slow-fee"
                  onClick={() => handleTabClick("tab-charge-slow-fee")}
                >
                  Phí trả chậm
                </button>
                <button
                  className="tab-btn"
                  data-target="tab-battery-mantain"
                  onClick={() => handleTabClick("tab-battery-mantain")}
                >
                  Pin
                </button>
              </div>

              <div className="policy-tab-content">
                <div
                  className={`tab-panel ${activeTab === "tab-vf5" ? "active" : ""}`}
                  id="tab-vf5"
                >
                  <h4>
                    Chính sách thuê pin dòng xe điện VF 5 Plus thị trường Việt
                    Nam áp dụng từ ngày 22/02/2025
                  </h4>
                  <div className="table-responsive overflow-x-auto">
                    <table
                      className="policy-table charging-table-minwidth"
                    >
                      <thead>
                        <tr>
                          <th rowSpan="2">Dòng xe</th>
                          <th colSpan="3">
                            Phí dịch vụ cho quãng đường đi trong 01 tháng (*)
                          </th>
                          <th rowSpan="2">Phí cọc thuê pin</th>
                        </tr>
                        <tr>
                          <th>Dưới 1500 km</th>
                          <th>Từ 1500 km tới dưới 3000 km</th>
                          <th>Từ 3000 km trở lên</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>VF 5 Plus</td>
                          <td>1.200.000 VNĐ</td>
                          <td>1.600.000 VNĐ</td>
                          <td>2.700.000 VNĐ</td>
                          <td>15.000.000 VNĐ</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="policy-note">* Giá đã bao gồm VAT</p>
                </div>

                <div
                  className={`tab-panel ${activeTab === "tab-vf9" ? "active" : ""}`}
                  id="tab-vf9"
                >
                  <h4>
                    Chính sách thuê pin dòng xe điện VF 9 thị trường Việt Nam áp
                    dụng từ ngày 01/06/2025
                  </h4>
                  <div className="table-responsive overflow-x-auto">
                    <table
                      className="policy-table charging-table-minwidth"
                    >
                      <thead>
                        <tr>
                          <th rowSpan="2">Dòng xe</th>
                          <th colSpan="2">
                            Phí dịch vụ cho quãng đường đi trong 01 tháng (*)
                          </th>
                          <th rowSpan="2">Phí cọc thuê pin</th>
                        </tr>
                        <tr>
                          <th>Dưới 3500 km</th>
                          <th>Từ 3500 km trở lên</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>VF 9</td>
                          <td>6.000.000 VNĐ</td>
                          <td>8.400.000 VNĐ</td>
                          <td>60.000.000 VNĐ</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="policy-note">* Giá đã bao gồm VAT</p>
                </div>

                <div
                  className={`tab-panel ${activeTab === "tab-festival" ? "active" : ""}`}
                  id="tab-festival"
                >
                  <h4>
                    Chính sách bán hàng tri ân ngày Nhà Giáo Việt Nam 20/11
                  </h4>
                  <p>
                    Áp dụng cho KH đặt cọc mua xe từ 01/11/2025 tới 31/12/2025
                  </p>
                  <div className="table-responsive overflow-x-auto">
                    <table
                      className="policy-table charging-table-minwidth"
                    >
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Dòng xe</th>
                          <th>Quà tặng cho KH</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>VF 5 Plus</td>
                          <td>01 năm thuê pin (Tối đa 19.2 triệu)</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>VF 6</td>
                          <td>01 năm thuê pin (Tối đa 21.6 triệu)</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>VF e34</td>
                          <td>01 năm thuê pin (Tối đa 25.2 triệu)</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>VF 8</td>
                          <td>01 năm thuê pin (Tối đa 34.8 triệu)</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>VF 9</td>
                          <td>01 năm thuê pin (Tối đa 82.8 triệu)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="policy-condition">
                    Điều kiện áp dụng: Phí thuê pin được khuyến mại tối đa trong
                    1 tháng là phí dịch vụ cho quãng đường đi dưới 3000 km, hoặc
                    3500 km với VF 9.
                  </p>
                </div>

                <div
                  className={`tab-panel ${activeTab === "tab-general" ? "active" : ""}`}
                  id="tab-general"
                >
                  <h4>
                    Chính sách thuê pin các dòng xe điện thị trường Việt Nam áp
                    dụng từ ngày 01/03/2025
                  </h4>
                  <div className="table-responsive overflow-x-auto">
                    <table
                      className="policy-table charging-table-minwidth"
                    >
                      <thead>
                        <tr>
                          <th rowSpan="2">Dòng xe</th>
                          <th colSpan="2">
                            Phí dịch vụ cho quãng đường đi trong 01 tháng (*)
                          </th>
                          <th rowSpan="2">Phí cọc thuê pin</th>
                        </tr>
                        <tr>
                          <th>Dưới 3000 km</th>
                          <th>Từ 3000 km trở lên</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>VF 5 Plus</td>
                          <td>1.600.000 VNĐ</td>
                          <td>2.700.000 VNĐ</td>
                          <td>15.000.000 VNĐ</td>
                        </tr>
                        <tr>
                          <td>VF 6</td>
                          <td>1.800.000 VNĐ</td>
                          <td>3.000.000 VNĐ</td>
                          <td>25.000.000 VNĐ</td>
                        </tr>
                        <tr>
                          <td>VF e34</td>
                          <td>2.100.000 VNĐ</td>
                          <td>3.500.000 VNĐ</td>
                          <td>30.000.000 VNĐ</td>
                        </tr>
                        <tr>
                          <td>VF 7</td>
                          <td>2.900.000 VNĐ</td>
                          <td>4.800.000 VNĐ</td>
                          <td>41.000.000 VNĐ</td>
                        </tr>
                        <tr>
                          <td>VF 8</td>
                          <td>2.900.000 VNĐ</td>
                          <td>4.800.000 VNĐ</td>
                          <td>41.000.000 VNĐ</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="policy-note">* Giá đã bao gồm VAT</p>
                </div>
                <div
                  className={`tab-panel ${activeTab === "tab-charge-slow-fee" ? "active" : ""}`}
                  id="tab-charge-slow-fee"
                >
                  <h4>Phí trả chậm</h4>
                  <div className="policy-list">
                    <p>
                      Tỷ lệ phí thanh toán chậm là 10%/năm, áp dụng cho phí thuê
                      pin và phí đền bù pin hỏng (nếu có - trong trường hợp
                      Khách hàng làm hỏng pin thuê) mà Khách hàng quá hạn thanh
                      toán.
                    </p>

                    <h5>Chế tài khi Khách hàng nợ phí thuê pin</h5>
                    <ul className="policy-list">
                      <li>
                        VinFast sẽ chặn sạc pin của Khách hàng 50% cho tháng
                        đầu, từ tháng 2 chặn 70% dung lượng pin (SOC).
                      </li>
                      <li>
                        Khi Khách hàng thanh toán xong công nợ, hệ thống sẽ tự
                        động mở khóa và Khách hàng có thể sạc bình thường.
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className={`tab-panel ${activeTab === "tab-battery-mantain" ? "active" : ""}`}
                  id="tab-battery-mantain"
                >
                  <h4>Thay thế/sửa chữa/bảo dưỡng pin</h4>
                  <div className="policy-list">
                    <h6>
                      1. Pin cho thuê sẽ được thay thế/sửa chữa/bảo dưỡng miễn
                      phí trong các trường hợp:
                    </h6>
                    <ul className="policy-list">
                      <li>Pin hỏng/lỗi do Nhà sản xuất.</li>
                      <li>Bảo dưỡng (nếu có) miễn phí.</li>
                      <li>Trạng thái tiếp nhận sạc của pin xuống dưới 70%.</li>
                    </ul>

                    <h6>
                      2. Nếu pin hỏng do lỗi Khách hàng thì Khách hàng sẽ phải
                      đền bù chi phí sửa chữa/thay thế pin. Chi phí sửa
                      chữa/thay thế sẽ được niêm yết trên Website và các xưởng
                      dịch vụ VinFast.
                    </h6>
                  </div>
                </div>

                <div
                  className={`tab-panel ${activeTab === "tab-charge-fee" ? "active" : ""}`}
                  id="tab-charge-fee"
                >
                  <h4>Phí thuê pin hàng tháng</h4>
                  <ul className="policy-list">
                    <li>
                      Chu kỳ tính cước: Tính từ ngày 26 tháng trước tới ngày 25
                      của tháng tiếp theo
                    </li>
                    <li>
                      Khách hàng có thể thuê pin trọn đời đến khi hết nhu cầu sử
                      dụng xe. Trường hợp chuyển nhượng xe thì Khách hàng mới
                      chỉ cần ký xác nhận tiếp tục thực hiện hợp đồng thuê pin.
                    </li>
                    <li>
                      Giá thuê pin được cố định suốt vòng đời sản phẩm theo giá
                      thuê pin thời điểm khách hàng nhận xe, không phụ thuộc vào
                      chủ sở hữu. <br />
                      <i>
                        (Áp dụng với các Khách hàng ký Hợp đồng thuê pin trước
                        ngày 01.01.2025)
                      </i>
                    </li>
                  </ul>
                </div>

                <div
                  className={`tab-panel ${activeTab === "tab-charge-contract" ? "active" : ""}`}
                  id="tab-charge-contract"
                >
                  <h4>Thời hạn hợp đồng thuê pin & đặt cọc</h4>
                  <ul className="policy-list">
                    <li>
                      Thời hạn Hợp Đồng thuê pin là vô thời hạn đến khi Khách
                      hàng hết nhu cầu hoặc hủy xe.
                    </li>
                    <li>
                      Khách hàng không phải đặt cọc khi thuê pin <br />{" "}
                      <i>
                        (Áp dụng với Khách hàng ký Hợp đồng thuê pin trước ngày
                        01.11.2025)
                      </i>
                    </li>
                    <li>
                      Các Khách hàng ký Hợp đồng thuê pin từ ngày 01.11.2025 trở
                      đi cần đặt cọc thuê pin, phí đặt cọc áp dụng theo từng
                      dòng xe.
                    </li>
                  </ul>
                  <h6>
                    Phí chuyển đổi gói cước: 4.120.000 VNĐ/lần (đã bao gồm VAT)
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row payment-section">
          <div className="col payment-guide">
            <h2 className="section-title">Hướng dẫn thanh toán</h2>
            <p className="subtitle_below">
              Chi phí thuê pin sẽ được thanh toán trả sau, trước ngày 15 của
              tháng tiếp theo cho toàn bộ phí thuê pin của tháng trước đó.
            </p>
            <div className="payment-options">
              <div className="payment-option-box located_charge">
                <img
                  src="/images/tramsac/location.png"
                  alt="icon"
                  width="48"
                  height="48"
                />
                <div>
                  <h5>Thanh toán trực tiếp</h5>
                  <p>
                    Tại các Điểm Cung Cấp Dịch Vụ bằng các phương thức thanh
                    toán mà Điểm Cung Cấp Dịch Vụ chấp nhận.
                  </p>
                </div>
              </div>
              <div className="payment-option-box located_charge">
                <img
                  src="/images/tramsac/money.png"
                  alt="icon"
                  width="48"
                  height="48"
                />
                <div>
                  <h5>Thanh toán online</h5>
                  <p>
                    Thông qua ứng dụng VinFast với các phương thức thanh toán
                    tiện lợi.
                  </p>
                </div>
              </div>
            </div>
            <div className="payment-process located_charge">
              <h4>Quy trình thanh toán</h4>
              <ol>
                <li>Nhận thông báo thanh toán qua ứng dụng hoặc SMS.</li>
                <li>Kiểm tra chi tiết hóa đơn phí thuê pin hàng tháng.</li>
                <li>
                  Chọn phương thức thanh toán phù hợp và hoàn tất giao dịch.
                </li>
              </ol>
            </div>
          </div>
          <div className="col charging-guide">
            <h2 className="section-title">Hướng dẫn thuê &amp; sạc PIN</h2>
            <p className="subtitle_below">
              Với hệ thống trạm sạc phủ sóng toàn quốc, Khách hàng có thể dễ
              dàng sử dụng dịch vụ sạc ô tô điện VinFast ở bất cứ đâu.
            </p>
            <div className="charging-guide-image">
              <img
                src="https://storage.googleapis.com/vinfast-data-01/pin-tramsac-14_1660273636.png"
                alt="Hướng dẫn thuê và sạc pin"
              />
              <div className="charging-steps">
                <div className="step-item">
                  <span className="step-badge">1</span>
                  <span className="step-text">Đăng ký tài khoản</span>
                </div>
                <div className="step-item">
                  <span className="step-badge">2</span>
                  <span className="step-text">Ký hợp đồng thuê pin</span>
                </div>
                <div className="step-item">
                  <span className="step-badge">3</span>
                  <span className="step-text">Sử dụng dịch vụ sạc</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="quy_dinh">
          <h2 className="section-title">Quy định chung về việc sử dụng pin</h2>
          <p className="subtitle_below">
            Một số quy định khi khách hàng sử dụng pin của Vinfast.
          </p>
          <div className="row">
            <div className="col">
              <img src="https://storage.googleapis.com/vinfast-data-01/pin-tramsac-4_1660273675.png" />
            </div>
            <div className="col product_charge2">
              {/* <h4>Quy định chung</h4> */}
              <ul>
                <li>
                  Không tự ý tháo rời, sửa chữa hoặc thay thế các bộ phận, dây
                  cáp hoặc đầu nối điện áp cao.
                </li>
                <li>
                  Chỉ được sử dụng nguồn sạc theo khuyến cáo của nhà sản xuất.
                </li>
                <li>
                  Không sử dụng Pin làm nguồn điện để vận hành các thiết bị
                  khác.
                </li>
                <li>
                  Không tự ý can thiệp hoặc cập nhật phần mềm trái phép mà không
                  được sự cho phép của nhà sản xuất.
                </li>
                <li>
                  Không để Xe ở những nơi có thể ngập lụt, vì ngập lụt có thể
                  làm hỏng Pin hoặc Xe.
                </li>
                <li>
                  Tránh để Xe tiếp xúc với nhiệt độ môi trường trên 55°C hoặc
                  dưới -20°C quá 24 giờ tại một điểm. Không tuân theo khuyến
                  nghị nhiệt độ này có thể làm giảm vĩnh viễn hiệu suất vận hành
                  của Pin.
                </li>
                <li>
                  Nếu dung lượng Pin còn lại thấp hơn 5% (dung lượng hiển thị
                  màu đỏ trên màn hình), Pin cần được sạc ngay lập tức. Không
                  thực hiện điều này có thể gây ra hỏng Pin vĩnh viễn và có thể
                  dẫn đến trách nhiệm bồi thường thiệt hại của Khách Hàng.
                </li>
                <li>Tuân thủ hướng dẫn sử dụng Xe và Pin của nhà sản xuất.</li>
                <li>
                  Thông báo ngay cho VinFast Trading khi phát hiện bất cứ lỗi,
                  hỏng hóc, sự cố nào liên quan đến Pin và chịu trách nhiệm tự
                  bảo quản Pin cho đến khi bàn giao lại Pin cho VinFast.
                </li>
                <li>
                  Nếu Xe gặp phải một tai nạn có khả năng ảnh hưởng đến Pin,
                  Khách Hàng cần yêu cầu xưởng dịch vụ của VinFast Trading kiểm
                  tra tổng quát hệ thống Pin.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div className="row quy_hoach">
            <div className="col product_charge3">
              <h2 className="section-title">Quy hoạch trạm sạc</h2>
              <p className="subtitle_below">
                Nhằm khuyến khích người dân sử dụng xe điện, dần thay thế phương
                tiện sử dụng xăng dầu nhằm giảm khối lượng khí phát thải vào môi
                trường. VinFast phát triển hệ thống trạm sạc với hơn 150.000
                cổng sạc cho xe máy điện và ô tô điện, trải dài rộng khắp 63
                tỉnh thành tại Việt Nam.
              </p>
              <div className="row quy_hoach__so_lieu">
                <div className="col station_child">
                  <h1>63</h1>
                  <p>Tỉnh thành</p>
                </div>
                <div className="col station_child">
                  <h1>150.000</h1>
                  <p>Cổng sạc</p>
                </div>
              </div>
            </div>
            <div className="col">
              <img src="https://storage.googleapis.com/vinfast-data-01/pin-tramsac-5_1660273699.png" />
            </div>
          </div>
        </div>

        <div className="quy_hoach_VF">
          <h2 className="section-title ">Quy hoạch trạm sạc VinFast</h2>
          <p className="subtitle_below">
            Trạm sạc dành cho ô tô và xe máy điện VinFast có thể lắp đặt tại khu
            vực đỗ xe hiện có mà không làm thay đổi công năng của bãi đỗ xe,
            thiết bị sạc là do VinFast sản xuất, chế tạo với hình thức đẹp, hiện
            đại, tuân thủ theo tiêu chuẩn của Châu Âu về an toàn điện.
          </p>
          <div className="row">
            <div className="col located_charge">
              <img
                src="/images/tramsac/parking.svg"
                alt="icon"
                width="25"
                height="25"
              />
              <p>
                Bãi đỗ xe
                <br /> Bến xe
              </p>
            </div>
            <div className="col located_charge">
              <img
                src="/images/tramsac/petrol.svg"
                alt="icon"
                width="25"
                height="25"
              />
              <p>
                Trạm dừng nghỉ
                <br /> Trạm xăng dầu
              </p>
            </div>
            <div className="col located_charge">
              <img
                src="/images/tramsac/money.png"
                alt="icon"
                width="20"
                height="20"
              />
              <p>
                Trung tâm
                <br /> thương mại
              </p>
            </div>
            <div className="col located_charge">
              <img
                src="/images/tramsac/apartment.svg"
                alt="icon"
                width="20"
                height="20"
              />
              <p>
                Chung cư,
                <br /> tòa văn phòng
              </p>
            </div>
            <div className="col located_charge">
              <img
                src="/images/tramsac/road.svg"
                alt="icon"
                width="20"
                height="20"
              />
              <p>
                Cao tốc
                <br /> Quốc lộ
              </p>
            </div>
            <div className="col located_charge">
              <img
                src="/images/tramsac/location.png"
                alt="icon"
                width="20"
                height="20"
              />
              <p>
                Địa điểm
                <br /> phù hợp khác
              </p>
            </div>
          </div>

          <div className="row charge_policy">
            <div className="col">
              <img
                className="policy_img2"
                src="https://storage.googleapis.com/vinfast-data-01/pin-tramsac-6_1660273722.png"
              />
            </div>
            <div className="col">
              <h3 className="section-title">Chính sách sạc pin</h3>
              <p>
                VinFast cung cấp đơn giá sạc ô tô điện, xe máy điện và hình thức
                thanh toán áp dụng tại các trạm sạc công cộng như sau:
              </p>
              <ul>
                <li>
                  <b>Đơn giá sạc: 3.858 VNĐ/kWh</b> áp dụng từ ngày 19/03/2025
                </li>
                <li>
                  <b>Đơn giá sạc quá giờ: 1.000 đồng/phút</b>, kể từ phút thứ 31
                  sau khi pin đầy. Đơn giá sạc quá giờ không áp dụng cho các
                  dòng xe máy điện và với các trụ sạc thường ô tô loại AC11kW.
                </li>
              </ul>
              <p>
                <b>Hình thức thanh toán:</b> Thanh toán cùng chi phí thuê bao
                pin hàng tháng
              </p>
              <p>
                <b>Ghi chú:</b>
              </p>
              <ul>
                <li>Đơn giá nêu trên đã bao gồm VAT</li>
                <li>
                  Đơn giá áp dụng từ ngày ban hành cho đến khi có thông báo mới
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="tru_sac">
          <h2 className="section-title ">
            Các loại trụ sạc công cộng cho Ô tô điện
          </h2>
          <p className="subtitle_below">
            Giúp khách hàng có thể tiếp thêm "năng lượng" cho xe của mình trong
            hành trình di chuyển.
          </p>
          <div className="row">
            <div className="col product-charge">
              <img
                className="pro_charge_img"
                src="https://storage.googleapis.com/vinfast-data-01/pin-tramsac-7_1660273744.png "
              />
              <div className="item-content ">
                <h4>Trụ sạc ô tô - Sạc siêu nhanh DC 250kW</h4>
                <p>
                  Thiết bị sạc Ô tô điện DC 250 kW là thiết bị cung cấp nguồn
                  điện một chiều để sạc trực tiếp cho pin, được thiết kế dạng tủ
                  đứng, mỗi thiết bị được trang bị 1 cổng sạc, công suất 250 kW.
                </p>
                <div className="item-detail ">
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Kiểu dáng </span>{" "}
                    <span className="subtitle col-6 "> Tủ đứng </span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Điện áp hoạt động (V) </span>{" "}
                    <span className="subtitle col-6 ">
                      {" "}
                      400VAC ± 10%, 3 pha{" "}
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Điện áp đầu ra </span>{" "}
                    <span className="subtitle col-6 "> 200-1000 VDC </span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Công suất </span>{" "}
                    <span className="subtitle col-6 "> 250 kW/ cổng sạc </span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Số lượng đầu ra </span>{" "}
                    <span className="subtitle col-6 "> 1 cổng/trụ sạc </span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Nhiệt độ hoạt động </span>{" "}
                    <span className="subtitle col-6 "> -30oC đến 55oC</span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Bảo vệ </span>{" "}
                    <span className="subtitle col-6 ">
                      {" "}
                      Bảo vệ quá tải/ quá nhiệt/ ngắn mạch/ IP 54{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col product-charge">
              <img
                className="pro_charge_img"
                src="https://storage.googleapis.com/vinfast-data-01/img_1705981400.png "
              />
              <div className="item-content ">
                <h4>Trụ sạc ô tô - Sạc siêu nhanh DC 150kW</h4>
                <p>
                  Thiết kế dạng tủ đứng, mỗi thiết bị được trang bị 2 cổng sạc,
                  công suất sạc có thể lên tới 150kW.
                  <br />
                  <br />
                </p>
                <div className="item-detail ">
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Kiểu dáng</span>{" "}
                    <span className="subtitle col-6 ">Tủ đứng</span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Điện áp hoạt động (V)</span>{" "}
                    <span className="subtitle col-6 ">
                      3 pha, 304 - 456 VAC
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Điện áp đầu ra</span>{" "}
                    <span className="subtitle col-6 ">200 - 1000 VDC</span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Tần số hoạt động</span>{" "}
                    <span className="subtitle col-6 ">50 ± 5% Hz</span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Công suất</span>{" "}
                    <span className="subtitle col-6 ">150kW/cổng sạc</span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Số lượng đầu ra</span>{" "}
                    <span className="subtitle col-6 ">2 cổng sạc/trụ sạc</span>
                  </div>
                  <div className="d-flex align-items-center mb-1 ">
                    <span className="title col-6 ">Bảo vệ</span>{" "}
                    <span className="subtitle col-6 ">
                      Bảo vệ quá tải/quá nhiệt/ngắn mạch/IP 54
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ChargingStation;
