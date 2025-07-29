// script.js

const cars = [
    { name: "VinFast VF3", image: "/Public/assets/images/car-pics/vf3/vf3yl.png", origin: "Việt Nam", year: "2023", hw: "32kW", value: "$8 500", link: "../user/Deposit.html?model=vf3" },
    { name: "VinFast VF5", image: "/Public/assets/images/car-pics/vf5/vf5b.png", origin: "Việt Nam", year: "2023", hw: "100kW", value: "$20 000", link: "../user/Deposit.html?model=vf5" },
    { name: "VinFast VF6", image: "/Public/assets/images/car-pics/vf6/vf6b.png", origin: "Việt Nam", year: "2023", hw: "150kW", value: "$29 000", link: "../user/Deposit.html?model=vf6" },
    { name: "VinFast VF7", image: "/Public/assets/images/car-pics/vf7/vf7bl.png", origin: "Việt Nam", year: "2023", hw: "200kW", value: "$36 000", link: "../user/Deposit.html?model=vf7" },
    { name: "VinFast VF8", image: "/Public/assets/images/car-pics/vf8/vf8b.png", origin: "Việt Nam", year: "2023", hw: "260kW", value: "$47 000", link: "../user/Deposit.html?model=vf8" },
    { name: "VinFast VF9", image: "/Public/assets/images/car-pics/vf9/vf9r.png", origin: "Việt Nam", year: "2023", hw: "300kW", value: "$64 000", link: "../user/Deposit.html?model=vf9" },
    { name: "VinFast VFe34", image: "/Public/assets/images/car-pics/vfe34/vfe34wh.png", origin: "Việt Nam", year: "2022", hw: "100kW", value: "$30 000", link: "../user/Deposit.html?model=vfe34" },
    { name: "VinFast Wild", image: "/Public/assets/images/car-pics/vfwild.jpg", origin: "Việt Nam", year: "2024", hw: "664HP", value: "$50 000", link: "../user/Deposit.html?model=vfwild" },
];

const carsPerPage = 9; // Hiển thị 9 xe một trang (3 hàng, mỗi hàng 3 xe)
let currentPage = 1;

// Hàm render xe dạng lưới
function renderCars() {
    const gridContainer = document.getElementById("cars-grid-container");
    gridContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = Math.min(startIndex + carsPerPage, cars.length);
    const carsToShow = cars.slice(startIndex, endIndex);

    // Chia thành các hàng, mỗi hàng 3 xe
    for (let i = 0; i < carsToShow.length; i += 3) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "car-row";

        // Thêm tối đa 3 xe vào mỗi hàng
        for (let j = i; j < Math.min(i + 3, carsToShow.length); j++) {
            const car = carsToShow[j];
            
            const carCard = document.createElement("div");
            carCard.className = "car-card";
            
            carCard.innerHTML = `
                <div class="car-image">
                    <img src="${car.image}" alt="${car.name}">
                </div>
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <ul class="car-details">
                        <li><i class="fas fa-globe"></i> Xuất xứ: ${car.origin}</li>
                        <li><i class="fas fa-calendar"></i> Năm: ${car.year}</li>
                        <li><i class="fas fa-tachometer-alt"></i> Công suất: ${car.hw}</li>
                    </ul>
                    <div class="car-price">${car.value}</div>
                </div>
                <button class="car-button" onclick="location.href='${car.link}'">Chi tiết</button>
            `;
            
            rowDiv.appendChild(carCard);
        }
        
        gridContainer.appendChild(rowDiv);
    }
}

function renderPagination() {
    const totalPages = Math.ceil(cars.length / carsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("num_button");
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? "page-btn active" : "page-btn";
        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderCars();
            renderPagination();
        });
        paginationContainer.appendChild(pageButton);
    }
}

// Khởi tạo trang
document.addEventListener("DOMContentLoaded", function() {
    renderCars();
    renderPagination();
});