function createNavbarAdmin() {
    document.write(`
    <div class="navbar navbar-expand">
        <a href="/Public/pages/user/index.html">
            <img src="https://vinfastauto.com/themes/porto/img/new-home-page/VinFast-logo.svg" alt="VINFAST" class="logo" style="margin-left: 20px; width: 200px; margin-right: 100px;">
        </a>

        <ul class="main-menu">
            <li>
                <a href="/Public/pages/admin/Dashboard.html">
                    <ion-icon name="home-outline"></ion-icon> Trang chủ</a>
            </li>
            <li>
                <a href="/Public/pages/admin/quanlyttkh.html">
                    <ion-icon name="people-outline"></ion-icon> Quản lý thông tin khách hàng</a>
            </li>
            <li>
                <a href="/Public/pages/admin/QLNhanSu.html">
                    <ion-icon name="man-outline"></ion-icon> Quản lý nhân sự</a>
            </li>
            <li class="submenu">
                <a href="#">
                    <ion-icon name="server-outline"></ion-icon> Thông tin doanh thu</a>
                <ul>
                    <li>
                        <a href="/Public/pages/admin/qlgd.html">
                            <ion-icon name="receipt-outline"></ion-icon> Thông tin giao dịch</a>
                    </li>
                    <li>
                        <a href="/Public/pages/admin/ketoan.html">
                            <ion-icon name="stats-chart-outline"></ion-icon> Thống kê doanh thu</a>
                    </li>
                </ul>

            </li>

            <li class="submenu">
                <a href="#">
                    <ion-icon name="car-sport-outline"></ion-icon>Thông tin về xe</a>
                <ul>
                    <li>
                        <a href="/Public/pages/admin/DSXe.html">
                            <ion-icon name="receipt-outline"></ion-icon> Danh sách xe</a>
                    </li>
                    <li>
                        <a href="/Public/pages/admin/QLSLXe.html">
                            <ion-icon name="stats-chart-outline"></ion-icon> Quản lý số lượng xe</a>
                    </li>
                </ul>
            </li>

            <li>
                <a href="/Public/pages/user/index.html">
                    <ion-icon name="log-out-outline"></ion-icon> Đăng xuất</a>
            </li>
        </ul>
    </div>
`);
}