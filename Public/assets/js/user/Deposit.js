// Car models data
const carModels = {
    "vf3": {
        id: "VINVF3YL",
        name: "VinFast 3",
        version: "VF3 - Tiêu chuẩn",
        specs: {
            power: "32 kW",
            acceleration: "5,3 giây",
            range: "~210 km"
        },
        price: "198.000.000 VNĐ",
        deposit: "20.000.000 VNĐ",
        defaultImage: "../../../../images/car-pics/vf3/vf3yl.png",
        colors: [
            {
                name: "Vàng",
                color: "yellow",
                image: "../Images/car-pics/vf3/vf3yl.png"
            },
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "../Images/car-pics/vf3/vf3b.png"
            },
            {
                name: "Hồng",
                color: "pink",
                image: "../Images/car-pics/vf3/vf3pk.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "../Images/car-pics/vf3/vf3r.png"
            },
            {
                name: "Trắng",
                color: "white",
                image: "../Images/car-pics/vf3/vf3wh.png"
            }
        ]
    },
    "vf5": {
        id: "VINVF5B",
        name: "VinFast 5",
        version: "VF5 - Tiêu chuẩn",
        specs: {
            power: "100 kW",
            acceleration: "~4 giây",
            range: "~326,4 km"
        },
        price: "458.000.000 VNĐ",
        deposit: "45.000.000 VNĐ",
        defaultImage: "../Images/car-pics/vf5/vf5b.png",
        colors: [
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "../Images/car-pics/vf5/vf5b.png"
            },
            {
                name: "Đen",
                color: "rgb(0, 0, 0)",
                image: "../Images/car-pics/vf5/vf5bl.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "../Images/car-pics/vf5/vf5r.png"
            },
            {
                name: "Trắng",
                color: "rgb(255, 255, 255)",
                image: "../Images/car-pics/vf5/vf5wh.png"
            }
        ]
    },
    "vf6": {
        id: "VINVF6G",
        name: "VinFast 6",
        version: "VF6 - Tiêu chuẩn",
        specs: {
            power: "150 kW",
            acceleration: "~3 giây",
            range: "~399 km"
        },
        price: "675.000.000 VNĐ",
        deposit: "67.000.000 VNĐ",
        defaultImage: "../Images/car-pics/vf6/vf6b.png",
        colors: [
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "../Images/car-pics/vf6/vf6b.png"
            },
            {
                name: "Đen",
                color: "rgb(0, 0, 0)",
                image: "../Images/car-pics/vf6/vf6bl.png"
            },
            {
                name: "Xanh lá",
                color: "green",
                image: "../Images/car-pics/vf6/vf6g.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "../Images/car-pics/vf6/vf6r.png"
            },
            {
                name: "Trắng",
                color: "rgb(255, 255, 255)",
                image: "../Images/car-pics/vf6/vf6wh.png"
            }
        ]
    },
    "vf7": {
        id: "VINVF7B",
        name: "VinFast 7",
        version: "VF7 - Tiêu chuẩn",
        specs: {
            power: "200 kW",
            acceleration: "~3 giây",
            range: "~450 km"
        },
        price: "850.000.000 VNĐ",
        deposit: "85.000.000 VNĐ",
        defaultImage: "../Images/car-pics/vf7/vf7bl.png",
        colors: [
            {
                name: "Đen",
                color: "black",
                image: "../Images/car-pics/vf7/vf7bl.png"
            },
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "../Images/car-pics/vf7/vf7b.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "../Images/car-pics/vf7/vf7r.png"
            },
            {
                name: "Xanh lá",
                color: "green",
                image: "../Images/car-pics/vf7/vf7g.png"
            },
            {
                name: "Trắng",
                color: "rgb(255, 255, 255)",
                image: "../Images/car-pics/vf7/vf7wh.png"
            }
        ]
    },
    "vf8": {
        id: "VINVF8B",
        name: "VinFast 8",
        version: "VF8 - Tiêu chuẩn",
        specs: {
            power: "260 kW",
            acceleration: "~2.9 giây",
            range: "~471 km"
        },
        price: "1.089.000.000 VNĐ",
        deposit: "100.000.000 VNĐ",
        defaultImage: "../Images/car-pics/vf8/vf8b.png",
        colors: [
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "../Images/car-pics/vf8/vf8b.png"
            },
            {
                name: "Đỏ",
                color: "red",
                image: "../Images/car-pics/vf8/vf8r.png"
            },
            {
                name: "Xám",
                color: "rgb(224, 224, 224)",
                image: "../Images/car-pics/vf8/vf8g.png"
            },
            {
                name: "Đen",
                color: "black",
                image: "../Images/car-pics/vf8/vf8bl.png"
            },
            {
                name: "Xanh lá",
                color: "green",
                image: "../Images/car-pics/vf8/vf8gr.png"
            }
        ]
    },
    "vf9": {
        id: "VINVF9BL",
        name: "VinFast 9",
        version: "VF9 - Tiêu chuẩn",
        specs: {
            power: "300 kW",
            acceleration: "~2.5 giây",
            range: "~580 km"
        },
        price: "1.491.000.000 VNĐ",
        deposit: "150.000.000 VNĐ",
        defaultImage: "../Images/car-pics/vf9/vf9r.png",
        colors: [
            {
                name: "Đỏ",
                color: "red",
                image: "../Images/car-pics/vf9/vf9r.png"
            },
            {
                name: "Trắng",
                color: "rgb(255, 255, 255)",
                image: "../Images/car-pics/vf9/vf9wh.png"
            },
            {
                name: "Đen",
                color: "black",
                image: "../Images/car-pics/vf9/vf9bl.png"
            },
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "../Images/car-pics/vf9/vf9b.png"
            }
        ]
    },
    "vfe34": {
        id: "VINE34WH",
        name: "VinFast e34",
        version: "VF e34 - Tiêu chuẩn",
        specs: {
            power: "100 kW",
            acceleration: "~4 giây",
            range: "~326,4 km"
        },
        price: "690.000.000 VNĐ",
        deposit: "69.000.000 VNĐ",
        defaultImage: "../Images/car-pics/vfe34/vfe34wh.png",
        colors: [
            {
                name: "Trắng",
                color: "white",
                image: "../Images/car-pics/vfe34/vfe34wh.png"
            },
            {
                name: "Đen",
                color: "black",
                image: "../Images/car-pics/vfe34/vfe34bl.png"
            },
            {
                name: "Xanh dương",
                color: "rgb(0, 145, 255)",
                image: "../Images/car-pics/vfe34/vfe34b.png"
            },
            {
                name: "Đỏ",
                color: "rgb(255, 0, 0)",
                image: "../Images/car-pics/vfe34/vfe34r.png"
            }
        ]
    },
    "vfwild": {
        id: "VINVFWG",
        name: "VinFast Wild",
        version: "VF Wild - Tiêu chuẩn",
        specs: {
            power: "300 kW",
            acceleration: "---",
            range: "---"
        },
        price: "1.190.000.000 VNĐ",
        deposit: "120.000.000 VNĐ",
        defaultImage: "../Images/vfwild.jpg",
        colors: [
            {
                name: "Bạc",
                color: "silver",
                image: "../Images/vfwild.jpg"
            }
        ]
    }
};


  // Call the function after the DOM is loaded (ensure this script runs after the button is loaded):
window.addEventListener("DOMContentLoaded", extractId);
 

function postDatabase() {
    let Customer_Name = document.getElementById("CustomerName").value;
    let Citizen_ID = document.getElementById("IdentityCard").value;
    let Phone_No = document.getElementById("NumberPhone").value;
    let Email = document.getElementById("Email").value;
    let Address = document.getElementById("Address").value;
    let Model_Car_ID = document.getElementById("model_car_id").value;
    // console.log(Customer_Name)
    // console.log(Citizen_ID)
    // console.log(Phone_No)
    // console.log(Email)
    // console.log(Address)
    // console.log(Model_Car_ID )

    fetch('http://localhost:8989/fillCustomerInfo', {
            method: 'post',

            headers: {
                "Content-type": "application/json; charset=UTF-8"
                },
            body: JSON.stringify({
                //username and password are parameters, which declared above
                Customer_Name: Customer_Name,
                Citizen_ID: Citizen_ID,
                Phone_No: Phone_No,
                Email: Email,
                Address: Address,
                Model_Car_ID: Model_Car_ID
                
            })
        })  
        .then(res => res.json()) //parse data send from BE to JSON format - the line that receives the data (JSON object) 
        .then(loginRespond => {

        });  
        // loginRespond -> data after being parsed by JSON 
  
}


// function extractId() {
//     const buttonElement = document.querySelector("button[type='submit']"); // Assuming there's only one submit button
//     if (buttonElement) {
//       const id = buttonElement.id;
//        console.log("Extracted ID:", id); // Process or store the ID as 

//       return id;

//       // You can also perform actions based on the ID here
//     } else {
//       console.error("Submit button not found.");
//     }
//   }


document.getElementById('deposit-nav').addEventListener('click', function(event) {
    event.preventDefault();
    var form = document.getElementById('dwfrm_billing');
    if (form.checkValidity()) {
        document.querySelectorAll('.content').forEach(function(content) {
            content.style.display = 'none';
        });
        document.getElementById('content3').style.display = 'block';
    } else {
        form.reportValidity();
    }
});

document.querySelectorAll('.navbar a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        var targetContent = this.getAttribute('data-content');
        if (targetContent !== 'content3' || document.getElementById('dwfrm_billing').checkValidity()) {
            document.querySelectorAll('.content').forEach(function(content) {
                content.style.display = 'none';
            });
            document.getElementById(targetContent).style.display = 'block';
        }
    });
});

// document.querySelectorAll('.js_numText').forEach(input => {
//     const maxNum = input.nextElementSibling.nextElementSibling.querySelector('.max_num').textContent;
//     input.addEventListener('input', function() {
//         const currentNum = input.value.length;
//         input.nextElementSibling.nextElementSibling.querySelector('.num').textContent = currentNum;
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const contents = document.querySelectorAll('.content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetContent = document.querySelector(this.getAttribute('data-content'));

            contents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            targetContent.classList.add('active');
            targetContent.style.display = 'block';
        });
    });

    // Trigger the first tab by default
    navLinks[0].click();
});

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const contents = document.querySelectorAll('.content');
    const radioButtons = document.querySelectorAll('.radio-button');
    const nextStep1Button = document.getElementById('next-step-1');
    const nextStep2Button = document.getElementById('next-step-2');
    const submitDepositButton = document.getElementById('submit-deposit');

    let step1Complete = false;
    let step2Complete = false;

    function showContent(contentId) {
        contents.forEach(content => {
            if (content.id === contentId) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
}
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-content');

            if (contentId === 'content2' && !step1Complete) {
                document.getElementById('step1-warning').style.display = 'block';
            } else if (contentId === 'content3' && !step2Complete) {
                document.getElementById('step2-warning').style.display = 'block';
            } else {
                document.getElementById('step1-warning').style.display = 'none';
                document.getElementById('step2-warning').style.display = 'none';
                showContent(contentId);
            }
        });
    });

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                nextStep1Button.disabled = false;
                step1Complete = true;
            }
        });
    });

    nextStep1Button.addEventListener('click', function() {
        showContent('content2');
    });

    nextStep2Button.addEventListener('click', function(e) {
        e.preventDefault();
        const requiredFields = document.querySelectorAll('#content2 input[required]');

        let allFieldsValid = true;
        requiredFields.forEach(field => {
            if (!field.value) {
                allFieldsValid = false;
                field.nextElementSibling.innerText = field.dataset.missingError;
            } else if (!field.checkValidity()) {
                allFieldsValid = false;
                field.nextElementSibling.innerText = field.dataset.parseError;
            } else {
                field.nextElementSibling.innerText = '';
            }
        });

        if (allFieldsValid) {
            step2Complete = true;
            showContent('content3');
        } else {
            step2Complete = false;
        }
    });

    submitDepositButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (step2Complete) {
            // Add your deposit submission logic here
            alert('Đặt cọc thành công!');
        } else {
            alert('Vui lòng hoàn thiện các bước trước khi đặt cọc.');
        }
    });
});

function validateStepTwo() {
    var lastName = document.getElementsByName('dwfrm_billing_addressFields_lastName')[0].value.trim();
    var companyName = document.getElementsByName('companyName')[0].value.trim();
    var phone = document.getElementsByName('dwfrm_billing_contactInfoFields_phone')[0].value.trim();
    var email = document.getElementsByName('dwfrm_billing_contactInfoFields_email')[0].value.trim();
    var address = document.getElementsByName('dwfrm_billing_addressFields_address')[0].value.trim();

    // Kiểm tra điều kiện
    if (lastName === '' || companyName === '' || phone === '' || email === '' || address === '') {
        return false;
    }
    return true;
}




document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const swatches = document.querySelectorAll('.color-swatch');

    function removeSelectedClass() {
        swatches.forEach(swatch => {
            swatch.classList.remove('selected');
        });
    }

    swatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            console.log('Swatch clicked:', swatch);
            removeSelectedClass();
            this.classList.add('selected');
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const contents = document.querySelectorAll('.content');

    function showContent(contentId) {
        contents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        document.getElementById(contentId).classList.add('active');
        document.getElementById(contentId).style.display = 'block';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-content');
            showContent(contentId);
        });
    });

    // Trigger the first tab by default
    navLinks[0].click();
});

document.addEventListener('DOMContentLoaded', function() {
    const radioVFStandard = document.getElementById('vf3-standard');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const nextStep1Button = document.getElementById('next-step-1');

    // Sự kiện khi thay đổi radio button
    radioVFStandard.addEventListener('change', function() {
        checkConditions();
    });

    // Sự kiện khi click vào mẫu màu
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Xóa lớp 'selected' của tất cả các mẫu màu
            colorSwatches.forEach(s => s.classList.remove('selected'));
            // Thêm lớp 'selected' cho mẫu màu được click
            this.classList.add('selected');
            checkConditions();
        });
    });

    // Hàm kiểm tra điều kiện và cập nhật trạng thái của button
    function checkConditions() {
        const radioChecked = radioVFStandard.checked;
        const colorSelected = document.querySelector('.color-swatch.selected') !== null;

        if (radioChecked && colorSelected) {
            nextStep1Button.removeAttribute('disabled');
        } else {
            nextStep1Button.setAttribute('disabled', 'disabled');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required]');
    const nextStep2Button = document.getElementById('next-step-2');

    // Thêm sự kiện input cho các trường nhập liệu bắt buộc
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            checkInputs();
        });
    });

    // Hàm kiểm tra các trường nhập liệu
    function checkInputs() {
        let allValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allValid = false;
            }
        });

        if (allValid) {
            nextStep2Button.removeAttribute('disabled');
        } else {
            nextStep2Button.setAttribute('disabled', 'disabled');
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const agree1Checkbox = document.getElementById('Agree1');
    const agree2Checkbox = document.getElementById('Agree2');
    const agree3Checkbox = document.getElementById('Agree3');
    const submitDepositBtn = document.getElementById('submit-deposit');

    function checkAllCheckboxes() {
        if (agree1Checkbox.checked && agree2Checkbox.checked && agree3Checkbox.checked) {
            submitDepositBtn.removeAttribute('disabled');
        } else {
            submitDepositBtn.setAttribute('disabled', 'disabled');
        }
    }

    agree1Checkbox.addEventListener('change', checkAllCheckboxes);
    agree2Checkbox.addEventListener('change', checkAllCheckboxes);
    agree3Checkbox.addEventListener('change', checkAllCheckboxes);

    // Kiểm tra trạng thái ban đầu
    checkAllCheckboxes();
});

// add
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const carModel = urlParams.get('model') || 'vf3';  // Default to VF3 if no model specified
    
    // Load car data
    loadCarData(carModel);
    
    // Setup navigation
    setupNavigation();
    
    // Setup form validation
    setupFormValidation();
    
    // Setup color swatches
    setupColorSwatches();
});

function loadCarData(carModel) {
    const car = carModels[carModel];
    
    if (!car) {
        console.error('Car model not found:', carModel);
        return;
    }
    
    // Set page title
    document.title = `${car.name} - Điền thông tin & Đặt cọc xe`;
    
    // Set car title
    document.getElementById('car-title').textContent = car.name;
    
    // Set car image
    const carImage = document.getElementById('car-image');
    carImage.src = car.defaultImage;
    carImage.alt = car.name;
    
    // Set version label
    document.getElementById('version-label').textContent = car.version;
    
    // Set specs
    document.getElementById('power-spec').textContent = car.specs.power;
    document.getElementById('acceleration-spec').textContent = car.specs.acceleration;
    document.getElementById('range-spec').textContent = car.specs.range;
    
    // Set car model ID
    document.getElementById('model_car_id').value = car.id;
    
    // Set order details
    document.getElementById('order-version').textContent = car.version;
    document.getElementById('order-price').textContent = car.price;
    document.getElementById('deposit-amount').textContent = car.deposit;
    
    // Generate color options for color picker
    const colorOptions = document.getElementById('color-options');
    colorOptions.innerHTML = '';
    car.colors.forEach(colorOption => {
        const colorDiv = document.createElement('div');
        colorDiv.setAttribute('data-img', colorOption.image);
        colorDiv.style.background = colorOption.color;
        colorDiv.style.border = 'black solid';
        colorDiv.style.borderRadius = '10px';
        colorDiv.style.width = '50px';
        colorDiv.style.height = '50px';
        colorOptions.appendChild(colorDiv);
    });

    // Generate color swatches
    const swatchesContainer = document.getElementById('swatches-container');
    swatchesContainer.innerHTML = '';
    car.colors.forEach(colorOption => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = colorOption.color;
        swatchesContainer.appendChild(swatch);
    });

    // Setup event listener for color selection
    setupColorSelection();
}

function setupColorSelection() {
    const thumb = document.querySelector(".thumb");
    const listColor = document.querySelectorAll(".list-color div");

    listColor.forEach(element => {
        element.addEventListener("click", function() {
            const imgSrc = element.getAttribute("data-img");
            thumb.src = imgSrc;
            console.log(`Image changed to: ${imgSrc}`);
        });
    });
}

function setupNavigation() {
    const links = document.querySelectorAll('.navbar a');
    const contents = document.querySelectorAll('.content');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Hide all contents
            contents.forEach(content => {
                content.style.display = 'none';
            });

            // Remove active class from all links
            links.forEach(link => {
                link.classList.remove('active');
            });

            // Show selected content and add active class to clicked link
            const contentId = this.getAttribute('data-content');
            document.getElementById(contentId).style.display = 'block';
            this.classList.add('active');
        });
    });

    // Show first content by default
    if (links.length > 0) {
        links[0].click();
    }

    // Step navigation buttons
    document.getElementById('next-step-1').addEventListener('click', function() {
        links[1].click();
    });

    document.getElementById('next-step-2').addEventListener('click', function() {
        if (validateStepTwo()) {
            links[2].click();
        } else {
            alert('Vui lòng điền đầy đủ thông tin.');
        }
    });

    // Enable the "Next step" button when a color is selected
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            removeSelectedClass();
            this.classList.add('selected');
            document.getElementById('next-step-1').disabled = false;
        });
    });

    function removeSelectedClass() {
        swatches.forEach(swatch => {
            swatch.classList.remove('selected');
        });
    }
}

function setupColorSwatches() {
    const swatches = document.querySelectorAll('.color-swatch');
    const listColorItems = document.querySelectorAll('.list-color div');
    
    swatches.forEach((swatch, index) => {
        swatch.addEventListener('click', function() {
            // Trigger click on corresponding color in the left panel
            if (listColorItems[index]) {
                listColorItems[index].click();
            }
        });
    });
}

function validateStepTwo() {
    const lastName = document.getElementById('CustomerName').value.trim();
    const identityCard = document.getElementById('IdentityCard').value.trim();
    const phone = document.getElementById('NumberPhone').value.trim();
    const email = document.getElementById('Email').value.trim();
    const address = document.getElementById('Address').value.trim();

    // Check if all required fields are filled
    if (lastName === '' || identityCard === '' || phone === '' || email === '' || address === '') {
        return false;
    }
    return true;
}

function setupFormValidation() {
    // Form submission handling
    document.getElementById('submit-deposit').addEventListener('click', function(e) {
        e.preventDefault();

        const agree1 = document.getElementById('Agree1').checked;
        const agree2 = document.getElementById('Agree2').checked;
        const agree3 = document.getElementById('Agree3').checked;

        if (!agree1 || !agree2 || !agree3) {
            alert('Vui lòng đồng ý với các điều khoản và điều kiện.');
            return;
        }

        // Simulate successful payment
        alert('Đặt cọc thành công! Cảm ơn quý khách đã lựa chọn VinFast.');
        
        // Redirect to product page after successful payment
        window.location.href = '/Public/Sanpham/banhang.html';
    });
}