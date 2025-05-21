// script.js

const cars = [
    { name: "VinFast Wild", image: "/Public/assets/images/car-pics/vfwild.jpg", origin: "Việt Nam", year: "2024", hw: "664HP", value: "$50 000", link: "../Desposit/Deposit_VFwild.html" },
    { name: "VinFast VF 9", image: "/Public/assets/images/car-pics/vf9/vf9r.png", origin: "Việt Nam", year: "2024", hw: "402HP", value: "$81 000", link: "../Desposit/Deposit_VF9.html" },
    { name: "Vinfast VF 8", image: "/Public/assets/images/car-pics/vf8/vf8wh.png", origin: "Việt Nam", year: "2024", hw: "402HP", value: "$47 200", link: "../Desposit/Deposit_VF8.html" },
    { name: "Vinfast VF 7", image: "/Public/assets/images/car-pics/vf7/vf7b.png", origin: "Việt Nam", year: "2024", hw: "349HP", value: "$37 000", link: "../Desposit/Deposit_VF7.html" },
    { name: "VinFast VF 6", image: "/Public/assets/images/car-pics/vf6/vf6r.png", origin: "Việt Nam", year: "2024", hw: "201HP", value: "$35 000", link: "../Desposit/Deposit_VF6.html" },
    { name: "VinFast VF 5", image: "/Public/assets/images/car-pics/vf5/vf5bl.png", origin: "Việt Nam", year: "2024", hw: "134HP", value: "$30 000", link: "../Desposit/Deposit_VF5.html" },
    { name: "VinFast VF 3", image: "/Public/assets/images/car-pics/vf3/vf3yl.png", origin: "Việt Nam", year: "2024", hw: "43HP", value: "$16 000", link: "../Desposit/Deposit_VF3.html" },
    { name: "VinFast VF e34", image: "/Public/assets/images/car-pics/vfe34/vfe34b.png", origin: "Việt Nam", year: "2024", hw: "147HP", value: "$26 000", link: "../Desposit/Deposit_VFe34.html" },
    { name: "VinFast Wild", image: "/Public/assets/images/car-pics/vfwild.jpg", origin: "Việt Nam", year: "2024", hw: "664HP", value: "$50 000", link: "../Desposit/Deposit_VFwild.html" },
    { name: "VinFast Wild", image: "/Public/assets/images/car-pics/vfwild.jpg", origin: "Việt Nam", year: "2024", hw: "664HP", value: "$50 000", link: "../Desposit/Deposit_VFwild.html" },
    { name: "VinFast Wild", image: "/Public/assets/images/car-pics/vfwild.jpg", origin: "Việt Nam", year: "2024", hw: "664HP", value: "$50 000", link: "../Desposit/Deposit_VFwild.html" },
    { name: "VinFast Wild", image: "/Public/assets/images/car-pics/vfwild.jpg", origin: "Việt Nam", year: "2024", hw: "664HP", value: "$50 000", link: "../Desposit/Deposit_VFwild.html" },
    { name: "VinFast Wild", image: "/Public/assets/images/car-pics/vfwild.jpg", origin: "Việt Nam", year: "2024", hw: "664HP", value: "$50 000", link: "../Desposit/Deposit_VFwild.html" },
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