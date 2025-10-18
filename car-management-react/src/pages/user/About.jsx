import style from '../../assets/css/user_pages/About.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        document.title = "Về chúng tôi | VinFast";
    }, []);
    return(
        <>
            <Navbar activePage="about" />
            <video className={style.video_ab} src="https://storage.googleapis.com/vinfast-data-01/The%20company%20behind%20VinFast%20electric%20cars.mp4" muted autoPlay loop></video>

            <div className = {style.container1}>
                <div className = {style.top_about}>
                    <div className={style.top_head_about}>
                        <h3 className = {style.heading3}>Giới thiệu về<br/></h3>
                        <h1 className = {style.heading1}>Công ty VinFast</h1>
                        <p>VinFast là công ty thành viên thuộc tập đoàn Vingroup, một trong những Tập đoàn Kinh tế tư nhân đa ngành lớn nhất Châu Á. <br/> Với triết lý “Đặt khách hàng làm trọng tâm”, VinFast không ngừng sáng tạo để tạo ra các sản phẩm đẳng cấp và
                            trải nghiệm xuất sắc cho mọi người.</p>
                    </div>
                    <img className = {style.imageconfg} src="/images/About_Us_VF9NeptuneGray.png" alt="Giới thiệu về VinFast - hãng xe điện đầu tiên tại Việt Nam"/>

                </div>

                <div className={style.row_head}>
                    <div className={style.col}>
                        <h2 className = {style.heading2}>Tầm nhìn</h2>
                        <p>Trở thành thương hiệu xe điện thông minh thúc đẩy mạnh mẽ cuộc cách mạng xe điện toàn cầu.</p>
                    </div>
                    <div className={style.col}>
                        <h2 className = {style.heading2}>Sứ mệnh</h2>
                        <p>Vì một tương lai xanh cho mọi người</p>

                    </div>
                    <div className={style.col}>
                        <h2 className = {style.heading2}>Triết lý thương hiệu</h2>
                        <p>Đặt khách hàng làm trọng tâm, VinFast không ngừng sáng tạo để tạo ra các sản phẩm đẳng cấp và trải nghiệm xuất sắc cho mọi người.</p>

                    </div>
                    <div className={style.col}>
                        <h2 className = {style.heading2}>Giá trị cốt lõi</h2>
                        <p>Sản phẩm đẳng cấp, giá tốt, hậu mãi vượt trội.</p>
                    </div>
                </div>

                <div className = {style.dau_chan1}>
                    <h2 className = {style.heading2}>Dấu chân toàn cầu </h2>
                    <p>VinFast đã nhanh chóng thiết lập sự hiện diện toàn cầu, thu hút những tài năng tốt nhất từ khắp nơi trên thế giới và hợp tác với một số thương hiệu mang tính biểu tượng nhất trong ngành Ô tô.</p>
                    <div className={style.row}>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/dau-chan-vf8_1664352740.png" alt="VF8"/>
                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/dau-chan-vf9_1664352747.png" alt="VF9"/>
                        </div>
                    </div>
                </div>

                <div className ={style.dau_chan}>
                    <h2 className = {style.heading2}>Lịch sử thương hiệu</h2>
                    <div className={`${style["row"]} ${style["row-cols-4"]}`}>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/vinfast-ipo_1694854769.png" alt="VinFast chính thức niêm yết trên Nasdaq Global Select Market" />
                            <h3 className = {style.heading3}>15.08.2023</h3>
                            <p>VinFast chính thức niêm yết trên Nasdaq Global Select Market<br></br></p>
                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/Ban-giao-VF5_1694854848.png" alt="VinFast chính thức bàn giao xe VF 5 Plus cho khách hàng" />
                            <h3 className = {style.heading3}>21.04.2023</h3>
                            <p>VinFast chính thức bàn giao xe VF 5 Plus cho khách hàng<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/vf9-full-size_1693250642.jpg" alt="VinFast chính thức bàn giao xe VF 9 cho khách hàng" />
                            <h3 className = {style.heading3}>27.03.2023</h3>
                            <p>VinFast chính thức bàn giao xe VF 9 cho khách hàng<br></br></p>
                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/26-04_1664352910.png" alt="VinFast ra mắt 5 mẫu xe máy điện thế hệ mới sử dụng pin LFP." />
                            <h3 className = {style.heading3}>26.04.2022</h3>
                            <p>VinFast ra mắt 5 mẫu xe máy điện thế hệ mới sử dụng pin LFP.<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/07-04_1664352929.png" alt="Hành trình 111 xe chinh phục Sa Vĩ - điểm cực Đông Bắc của Tổ quốc được vinh danh kỷ lục &quot;Đoàn caravan xe điện nhiều nhất Việt Nam&quot;" />
                            <h3 className = {style.heading3}>07.04.2022</h3>
                            <p>Hành trình 111 xe VF e34 chinh phục Sa Vĩ - điểm cực Đông Bắc của Tổ quốc được vinh danh kỷ lục "Đoàn caravan xe điện nhiều nhất Việt Nam".<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/30-03_1664352963.png" alt="VinFast tiếp tục được vinh danh “Xe được yêu thích nhất cho cả 4 dòng xe gồm Fadil, Lux A2.0, Lux SA2.0, VF e34, tại bình chọn &quot;Xe của năm 2022&quot; bởi cộng đồng OTOFUN và OTOSAIGON."/>
                            <h3 className = {style.heading3}>30.03.2022</h3>
                            <p>VinFast tiếp tục được vinh danh “Xe được yêu thích nhất phân khúc” cho cả 4 dòng xe gồm Fadil, Lux A2.0, Lux SA2.0, VF e34 tại bình chọn "Xe của năm 2022" bởi cộng đồng OTOFUN và OTOSAIGON.</p>
                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/29-03_1664352977.png" alt="VinFast và chính quyền bang Bắc Carolina (Mỹ) công bố ký kết ghi nhớ về việc xây dựng nhà máy sản xuất đầu tiên của VinFast tại thị trường Bắc Mỹ." />
                            <h3 className = {style.heading3}>29.03.2022</h3>
                            <p>VinFast và chính quyền bang Bắc Carolina (Mỹ) công bố ký kết ghi nhớ về việc xây dựng nhà máy sản xuất đầu tiên của VinFast tại thị trường Bắc Mỹ.<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/20-01_1664352995.png" alt="VF e34 giành vị trí dẫn đầu tại 2 hạng mục gồm: “Xe ô tô phổ thông giá dưới 1 tỷ yêu thích nhất” và “Xe điện đáng mong chờ nhất” tại chương trình &quot;Tinh tế Bình chọn 2021&quot;."/>
                            <h3 className = {style.heading3}>20.01.2022</h3>
                            <p>VF e34 giành vị trí dẫn đầu tại 2 hạng mục gồm: “Xe ô tô phổ thông giá dưới 1 tỷ yêu thích nhất” và “Xe điện đáng mong chờ nhất” tại chương trình "Tinh tế Bình chọn 2021".<br></br></p>
                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/15-01_1664353045.png" alt="VinFast Fadil và VinFast Lux A2.0 lần lượt được bình chọn là “Ô tô của năm” "/>
                            <h3 className = {style.heading3}>15.01.2022</h3>
                            <p>VinFast Fadil và VinFast Lux A2.0 lần lượt được bình chọn là “Ô tô của năm” phân khúc xe nhỏ cỡ A và sedan cỡ D-E trong khuôn khổ lễ trao giải Car Awards 2021 do VnExpress-Xe tổ chức.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/15-01-2_1664353059.png" alt="VinFast là hãng xe được đánh giá cao nhất về chất lượng dịch vụ trong lễ trao giải Car Awards 2021 do VnExpress-Xe tổ chức." />
                            <h3 className = {style.heading3}>15.01.2022</h3>
                            <p>VinFast là hãng xe được đánh giá cao nhất về chất lượng dịch vụ trong lễ trao giải Car Awards 2021 do VnExpress-Xe tổ chức.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/06-01_1664353071.png" alt="VinFast công bố chiến lược thuần điện và dải sản phẩm hoàn thiện tại CES 2022 và mở bán toàn cầu VF 8, VF9" />
                            <h3 className = {style.heading3}>06.01.2022</h3>
                            <p>VinFast công bố chiến lược thuần điện và dải sản phẩm hoàn thiện tại CES 2022 và mở bán toàn cầu VF 8, VF 9.<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/15-12_1664353087.png" alt="VinFast bàn giao những chiếc VF e34 - ô tô điện thông minh đầu tiên của Việt Nam tới khách hàng." />
                            <h3 className = {style.heading3}>15.12.2021</h3>
                            <p>VinFast bàn giao những chiếc VF e34 - ô tô điện thông minh đầu tiên của Việt Nam tới khách hàng.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/15-10_1664353132.png" alt="VinFast VF e34 chính thức ra mắt với nhiều tính năng thông minh lần đầu được công bố." />
                            <h3 className = {style.heading3}>15.10.2021</h3>
                            <p>VinFast VF e34 chính thức ra mắt với nhiều tính năng thông minh lần đầu được công bố.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/12-07_1664353146.png" alt="VinFast chính thức hoạt động tại 5 thị trường ở Bắc Mỹ và Châu Âu." />
                            <h3 className = {style.heading3}>12.07.2021</h3>
                            <p>VinFast chính thức hoạt động tại 5 thị trường ở Bắc Mỹ và Châu Âu.<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/24-03_1664353159.png" alt="VinFast mở đặt hàng trước mẫu xe điện đầu tiên tại Việt Nam VF e34" />
                            <h3 className = {style.heading3}>24.03.2021</h3>
                            <p>VinFast mở đặt hàng trước mẫu ô tô điện đầu tiên tại Việt Nam VF e34.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/03_1664353173.png" alt="VinFast khai trương và vận hành Green Bus – xe buýt điện đầu tiên tại " />
                            <h3 className = {style.heading3}>Th 03.2021</h3>
                            <p>VinFast khai trương và vận hành Green Bus – xe buýt điện đầu tiên tại Việt Nam.<br></br> </p>
                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/03-3_1664353227.png" alt="VinFast được trao giải Mẫu xe được yêu thích nhất ở cả 3 phân khúc trong giải thưởng “Xe của năm 2021” tại Việt Nam, do thành viên 2 cộng đồng Otofun và OtoSaigon bình chọn."/>
                            <h3 className = {style.heading3}>Th 03.2021</h3>
                            <p>VinFast được trao giải "Mẫu xe được yêu thích nhất" ở cả 3 phân khúc trong giải thưởng “Xe của năm 2021” tại Việt Nam, do thành viên 2 cộng đồng Otofun và OtoSaigon bình chọn.<br></br></p>
                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/16-02_1664353239.png" alt="VinFast nhận giải thưởng “Hãng xe mới có cam kết cao về an toàn” của Asean NCAP." />
                            <h3 className = {style.heading3}>16.02.2021</h3>
                            <p>VinFast nhận giải thưởng “Hãng xe mới có cam kết cao về an toàn” của Asean NCAP.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/03-2_1664353213.png" alt="VinFast ra mắt mô hình bán hàng O2O, showroom xe máy điện kết hợp trung tâm trải nghiệm sản phẩm, dịch vụ Vin3S trên toàn quốc" />
                            <p><br/>VinFast ra mắt mô hình bán hàng O2O, showroom xe máy điện kết hợp trung tâm trải nghiệm sản phẩm, dịch vụ Vin3S trên toàn quốc, khai trương đồng loạt 64 showroom đầu tiên.<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/22-01_1664353256.png" alt="VinFast ra mắt 3 mẫu ô tô điện VF e34, VF e35, VF e36; đồng thời công bố kế hoạch, tầm nhìn toàn cầu." />
                            <h3 className = {style.heading3}>22.01.2021</h3>
                            <p>VinFast ra mắt 3 mẫu ô tô điện VF e34, VF e35, VF e36; đồng thời công bố kế hoạch, tầm nhìn toàn cầu.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/21-01_1664353293.png" alt="VinFast ra mắt hai dòng Theon và Feliz tại Việt Nam." />
                            <h3 className = {style.heading3}>21.01.2021</h3>
                            <p>VinFast ra mắt hai dòng xe máy điện Theon và Feliz tại Việt Nam.<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/07-09_1664353306.png" alt="VinFast ra mắt mẫu SUV V8 phiên bản giới hạn tại Việt Nam: President." />
                            <h3 className = {style.heading3}>07.09.2020</h3>
                            <p>VinFast ra mắt mẫu SUV V8 phiên bản giới hạn tại Việt Nam: President.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/23-10_1664353318.png" alt="VinFast nhận chứng nhận an toàn ASEAN NCAP 5 sao cho VinFast Lux và 4 sao cho VinFast Fadil." />
                            <h3 className = {style.heading3}>23.10.2019</h3>
                            <p>VinFast nhận chứng nhận an toàn ASEAN NCAP 5 sao cho VinFast Lux và 4 sao cho VinFast Fadil.<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/09-12_1664353332.png" alt="VinFast ra mắt mẫu xe máy điện Ludo, Impes và Klara S tại Việt Nam." />
                            <h3 className = {style.heading3}>T9 - T12.2019</h3>
                            <p>VinFast ra mắt mẫu xe máy điện Ludo, Impes và Klara S tại Việt Nam.<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/17-06_1664353348.png" alt="VinFast bàn giao 3 mẫu ô tô gồm Fadil (17/06/2019) và Lux A2.0 &amp; Lux SA2.0 (28/07/2019)" />
                            <h3 className = {style.heading3}>17.06.2019</h3>
                            <p>VinFast bàn giao 3 mẫu ô tô gồm Fadil (17/06/2019) và Lux A2.0 Lux SA2.0 (28/07/2019).<br></br></p>

                        </div>
                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/20-11_1664353362.png" alt="VinFast khánh thành và đưa vào vận hành nhà máy sản xuất ô tô VinFast tại Cát Hải, Hải Phòng sau 21 tháng xây dựng." />
                            <h3 className = {style.heading3}>14.06.2019</h3>
                            <p>VinFast khánh thành và đưa vào vận hành nhà máy sản xuất ô tô VinFast tại Cát Hải, Hải Phòng sau 21 tháng xây dựng.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/20-11-1_1664353377.png" alt="VinFast ra mắt 3 mẫu ô tô đầu tiên Lux SA2.0, Lux A2.0 và Fadil tại Công viên Thống Nhất (Hà Nội)" />
                            <h3 className = {style.heading3}>20.11.2018</h3>
                            <p>VinFast ra mắt 3 mẫu ô tô đầu tiên tại <span className="text-nowrap">Việt Nam</span> gồm Lux SA2.0, Lux A2.0 và Fadil tại Công viên Thống Nhất (Hà Nội).<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/03-11_1664353397.png" alt="VF khánh thành nhà máy xe máy điện và ra mắt VF Klara A1 &amp; A2" />
                            <h3 className = {style.heading3}>03.11.2018</h3>
                            <p>VinFast khánh thành nhà máy xe máy điện và ra mắt mẫu xe điện đầu tiên tại Việt Nam: VinFast Klara A1, Klara A2.<br></br></p>

                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/01-10_1664353411.png" alt="VinFast ra mắt 2 mẫu xe VinFast  Lux A2.0 và Lux SA2.0 tại Paris Motor Show (Pháp), đồng thời được AUTOBEST – tổ chức về ô tô hàng đầu Châu Âu vinh danh là “Ngôi sao mới” của ngành công nghiệp ô tô thế giới."/>
                            <h3 className = {style.heading3}>01.01.2018</h3>
                            <p>VinFast ra mắt 2 mẫu xe VinFast Lux A2.0 và Lux SA2.0 tại Paris Motor Show (Pháp), đồng thời được AUTOBEST – tổ chức về ô tô hàng đầu Châu Âu vinh danh là “Ngôi sao mới” của ngành công nghiệp ô tô thế giới.<br></br></p>
                        </div>

                        <div className={style.col}>
                            <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/02-09_1664353426.png" alt="VinFast ra đời bằng lễ khởi công xây dựng nhà máy." />
                            <h3 className = {style.heading3}>02.09.2017</h3>
                            <p>VinFast ra đời bằng lễ khởi công xây dựng nhà máy.<br></br></p>
                        </div>
                    </div>
                </div>
            </div> 

            <section className={style["awards-section"]}>
                <div className={style.container}>
                    <h2 className={style["section-title"]}>Giải thưởng</h2>
                <div className={style.row1}>
                    <div className={style["award-year"]}>
                        <h4 className={style["year-title"]}>Giải thưởng 2022</h4>
                        <div className={style["award-cards"]}>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/giai-thuong_1664353512.png" alt="VinFast tiếp tục được vinh danh 'Xe được yêu thích nhất phân khúc'"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>Xe được yêu thích nhất phân khúc</h5>
                                    <p>VinFast tiếp tục được vinh danh "Xe được yêu thích nhất phân khúc" cho cả 4 dòng xe gồm Fadil, Lux A2.0, Lux SA2.0, VF e34 tại bình chọn "Xe của năm 2022" bởi cộng đồng OTOFUN và OTOSAIGON.</p>
                                </div>
                            </div>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/ky-luc_1664353543.png" alt="VinFast được trao kỷ lục"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>Kỷ lục Guinness Việt Nam</h5>
                                    <p>VinFast được trao kỷ lục "Đoàn caravan xe điện nhiều nhất Việt Nam" do Hội Kỷ lục Việt Nam chứng nhận.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={style["award-year"]}>
                        <h4 className={style["year-title"]}>Giải thưởng 2021</h4>
                        <div className={style["award-cards"]}>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/giai-thuong-car_1664353562.png" alt="VinFast Lux A2.0 được bình chọn là Ô tô của năm"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>Ô tô của năm</h5>
                                    <p>VinFast Lux A2.0 được bình chọn là Ô tô của năm phân khúc sedan cỡ D-E trong khuôn khổ lễ trao giải Car Awards 2021 do VnExpress-Xe tổ chức.</p>
                                </div>
                            </div>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/car-awards-2021_1664353577.png" alt="VinFast là hãng xe được đánh giá cao nhất về chất lượng dịch vụ"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>Hãng xe có chất lượng dịch vụ tốt nhất</h5>
                                    <p>VinFast là hãng xe được đánh giá cao nhất về chất lượng dịch vụ trong lễ trao giải Car Awards 2021 do VnExpress-Xe tổ chức.</p>
                                </div>
                            </div>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/xe-cua-nam-2021_1664353590.png" alt="VinFast chiến thắng giải xe được yêu thích nhất phân khúc"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>Xe được yêu thích nhất</h5>
                                    <p>VinFast chiến thắng giải xe được yêu thích nhất phân khúc tại Chương trình "Bình chọn xe của năm 2021" bởi 2 cộng đồng OTOFUN và OTOSAIGON.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={style["award-year"]}>
                        <h4 className={style["year-title"]}>Giải thưởng 2020</h4>
                        <div className={style["award-cards"]}>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/best-sale-2020_1664353617.png" alt="Các mẫu xe Fadil, Lux A2.0, Lux SA2.0 dẫn đầu doanh số bán xe"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>Dẫn đầu doanh số</h5>
                                    <p>Các mẫu xe Fadil, Lux A2.0, Lux SA2.0 dẫn đầu doanh số bán xe tại các phân khúc tham gia.</p>
                                </div>
                            </div>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/asean-ncap_1664353604.png" alt="VinFast được ASEAN NCAP vinh danh"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>Grand Prix Award 2020</h5>
                                    <p>VinFast được ASEAN NCAP vinh danh "Hãng xe mới có cam kết cao về an toàn" Grand Prix Award 2020.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={style["award-year"]}>
                        <h4 className={style["year-title"]}>Giải thưởng 2019</h4>
                        <div className={style["award-cards"]}>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/vinfast-lux-a20_1664353629.png" alt="VinFast Lux A2.0 và VinFast Lux SA2.0 đạt chuẩn an toàn 5 sao"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>An toàn 5 sao ASEAN NCAP</h5>
                                    <p>VinFast Lux A2.0 và VinFast Lux SA2.0 đạt chuẩn an toàn 5 sao ASEAN NCAP.</p>
                                </div>
                            </div>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/vinfast-fadil_1664353641.png" alt="VinFast Fadil đạt chuẩn an toàn 4 sao ASEAN NCAP"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>An toàn 4 sao ASEAN NCAP</h5>
                                    <p>VinFast Fadil đạt chuẩn an toàn 4 sao ASEAN NCAP.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={style["award-year"]}>
                        <h4 className={style["year-title"]}>Giải thưởng 2018</h4>
                        <div className={`${style['award-cards']} ${style['special-award']}`}>
                            <div className={style["award-card"]}>
                                <div className={style["award-image"]}>
                                    <img className = {style.imageconfg} src="https://storage.googleapis.com/vinfast-data-01/giai-thuong-auto-best-2018_1664353654.png" alt="VinFast được Auto Best trao giải thưởng 'A star is born'"/>
                                </div>
                                <div className={style["award-content"]}>
                                    <h5>"A star is born"</h5>
                                    <p>VinFast được Auto Best trao giải thưởng "A star is born".</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></div>
            </section>
            <Footer/>
        </>
    )
}

export default About;