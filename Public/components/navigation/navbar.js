function createNavbar(activePage) {
    // Xác định trang hiện tại dựa trên URL nếu không có tham số activePage
    if (!activePage) {
        const currentUrl = window.location.pathname;
        if (currentUrl.includes('/about/')) activePage = 'about';
        else if (currentUrl.includes('/products/')) activePage = 'products';
        else if (currentUrl.includes('/charging/')) activePage = 'charging';
        else if (currentUrl.includes('/promotion/')) activePage = 'promotion';
        else if (currentUrl.includes('/policy/')) activePage = 'policy';
        else if (currentUrl.includes('/home/')) activePage = 'home';
    }
    
    document.write(`
        <nav class="nav-container">
            <a href="/Public/pages/home/index.html">
                <img class="logo" src="/Public/assets/images/vinlogo.png" alt="VinFast Logo" />
            </a>
            <ul>
                <li><a href="/Public/pages/about/aboutVF.html" class="${activePage === 'about' ? 'active' : ''}">Về chúng tôi</a></li>
                <li><a href="/Public/pages/products/banhang.html" class="${activePage === 'products' ? 'active' : ''}">Sản phẩm</a></li>
                <li><a href="/Public/pages/charging/ChargingStation1.html" class="${activePage === 'charging' ? 'active' : ''}">Trạm sạc</a></li>
                <li><a href="/Public/pages/promotion/uudai.html" class="${activePage === 'promotion' ? 'active' : ''}">Ưu đãi</a></li>
                <li><a href="/Public/pages/policy/ChinhSach1.html" class="${activePage === 'policy' ? 'active' : ''}">Chính sách</a></li>
            </ul>
            <div class="icons">
                <a href="/Public/pages/login/login.html" style="text-decoration: none; color: inherit;">
                    <i class="bx bx-user-circle"></i>
                </a>
            </div>
        </nav>
    `);
}