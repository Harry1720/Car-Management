function createSlideShow() {
    document.write(`
        <div class="mySlides">
            <img src="../../assets/images/banner/adst.png" style="width:100%" onclick="openModal('modal1');">
        </div>
        <div class="mySlides">
            <img src="../../assets/images/banner/pbad.png" style="width:100%" onclick="openModal('modal2');">
        </div>

        <div class="mySlides">
            <img src="../../assets/images/banner/qotad.png" style="width:100%" onclick="openModal('modal3');">
        </div>

        <!-- Nút "Previous" -->
        <a class="prev" href="#" onclick="plusSlides(1); return false;">&#10094;</a>
        <a class="next" href="#" onclick="plusSlides(0); return false;">&#10095;</a>

        </div>
        <!-- Thêm div cho các nút chấm tròn -->
        <div style="text-align:center; margin-top: 15px;">
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
            <span class="dot" onclick="currentSlide(3)"></span>
        </div>
        <!-- Popup Modals -->
        <div id="modal1" class="modal" 
            style= "
                margin: 100px 40px; 
                width: 95%;
                "
        >
            <div class="modal-content"
                style="
                    background-color: rgb(255,255,255,0.8);
                    padding: 20px;
                "
            >
                <span class="close" onclick="closeModal('modal1')">&times;</span>
                <h2 class="modal-title">Nhận ngay 01 vé VIP Sky Tour</h2>
                <p class="modal-text">- Quý khách khi đặt cọc xe Vinfast VF Wild sẽ nhận ngay 01 vé VIP xem show Sky Tour của Sơn Tùng-MTP.</p>
                <p class="modal-text-notice">- Mỗi khách hàng chỉ được tham gia một (01) lần, chương trình áp dụng đến 30/06/2024.</p>
            </div>
        </div>
        <div id="modal2" class="modal"
            style= "
                margin: 100px 40px; 
                width: 95%;
            "
        >
            <div class="modal-content"
                style="
                    background-color: rgb(255,255,255,0.8);
                    padding: 20px;
                "
            >
                <span class="close" onclick="closeModal('modal2')">&times;</span>
                <h2 class="modal-title">Nhận ngay 01 cặp vé concert PINK BORN</h2>
                <p class="modal-text">- 20 cặp vé PINK BORN dành cho những khách hàng mua xe sớm nhất tại đại lý.</p>
                <p class="modal-text-notice">- Mỗi khách hàng chỉ được tham gia một (01) lần, chương trình áp dụng đến khi hết vé.</p>
            </div>
        </div>
        <div id="modal3" class="modal"
            style= "
                margin: 100px 40px; 
                width: 95%;
            "
        >
            <div class="modal-content"
                style="
                    background-color: rgb(255,255,255,0.8);
                    padding: 20px;
                "
            >
                <span class="close" onclick="closeModal('modal3')">&times;</span>
                <h2 class="modal-title">Giảm ngay 10% tiền phí trước bạ</h2>
                <p class="modal-text">- Vinfast luôn đồng hành cùng các gia đình trẻ tại Việt Nam, với mong muốn tiếp cận đến mọi gia đình, Vinfast trợ giá 10% tiền phí trước bạ cho những cặp đôi kết hôn vào năm 2024.</p>
                <p class="modal-text">- Điều kiện tham gia: Khi thực hiện nhận xe tại đại lý, đại lý sẽ trực tiếp thanh toán 10% phí trước bạ cho khách hàng.</p>
                <p class="modal-text">- Khách hàng khi tham gia chương trình phải xuất trình giấy chứng nhận kết hôn để nhân viên đại lý xác nhận</p>
                <p class="modal-text-notice">Chương trình chỉ áp dụng cho những giấy chứng nhận kết hôn trong năm 2024, áp dụng đến hết tháng 12/2024. Lưu ý: Mỗi hộ gia đình chỉ được tham gia một (01) lần.</p>
            </div>
        </div>
    `);
}

//ad
var slideIndex = 0;
var autoSlideInterval;
var manualChange = false;

// Hàm này sẽ tự động thay đổi slide
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" dot_active", "");
    }
    dots[slideIndex - 1].className += " dot_active";

    if (!manualChange) {
        autoSlideInterval = setTimeout(showSlides, 3000); // Thay đổi hình ảnh sau mỗi 3 giây
    } else {
        manualChange = false; // Reset lại trạng thái sau một lần dừng tự động chuyển
    }
}

// Hàm để điều khiển thủ công chuyển slide
function plusSlides(n) {
    clearTimeout(autoSlideInterval); // Dừng tự động chuyển
    manualChange = true; // Đặt cờ để chỉ ra người dùng đã thực hiện thay đổi thủ công
    slideIndex += n;

    var totalSlides = document.getElementsByClassName("mySlides").length;

    // Nếu slideIndex vượt quá hình cuối cùng, đặt slideIndex là 1
    if (slideIndex > totalSlides) {
        slideIndex = 1;
    }
    // Nếu slideIndex nhỏ hơn 1, đặt slideIndex là hình cuối cùng
    else if (slideIndex < 1) {
        slideIndex = totalSlides;
    }

    showSlides();
}

// Hàm để hiển thị slide cụ thể
function currentSlide(n) {
    clearTimeout(autoSlideInterval); // Dừng tự động chuyển
    manualChange = true; // Đặt cờ để chỉ ra người dùng đã thực hiện thay đổi thủ công
    slideIndex = n-1;
    showSlides();
}

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target.classList && event.target.classList.contains('modal-popup')) {
        event.target.style.display = "none";
    }
};