<!DOCTYPE html>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../assets/images/tab_logo.png" type="image/x-icon">
    <title>Danh sách xe</title>
    <link rel="stylesheet" href="../../assets/css/admin_pages/DSXe.css">
    <link rel="stylesheet" href="../../assets/css/components/navbar_admin.css">


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css"></link>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
   
</head>
    <script src="../../assets/js/admin/DSXe.js"></script>
    <script src="/Public/components/navbar_admin.js"></script>
<body>
    <script>createNavbarAdmin();</script>

    <h1 id="heading"><b>Danh sách xe</b></h1>

    <form id="add-row-form">
        <div class="container">

            <div class="row" id="add-row-form">
                <div class="col">
                    <p>Mã xe</p>
                    <div><input type="text" id="new-id"></div>
                </div>
                <div class="col">
                    <p>Tên xe</p>
                    <input type="text" id="new-name">
                </div>
                <div class="col">
                    <p>Giá tiền</p>
                    <input type="text" id="new-price">
                </div>
                <div class="col">
                    <p>Màu sắc</p>
                    <input type="text" id="new-color">
                </div>
                <div class="col">
                    <p>Nguồn gốc</p>
                    <input type="text" id="new-origin">
                </div>

            </div>

            <div class="row" id="add-row-form">

                <div class="col">
                    <p>Ngày nhập</p>
                    <input type="text" id="new-date-import">
                </div>
                
                
                <div class="col">
                    <p>Số lượng xe nhập</p>
                    <input type="text" id="new-import-car-number">
                </div>
                
                <div class="col">
                    <p>Số lượng xe đã bán</p>
                    <input type="text" id="new-sold-car-number">
                </div>

                <div class="col">
                    <p>Năm ra mắt</p>
                    <input type="text" id="new-launching-year">
                </div>

                <div class="col">
                    <button type="submit" onclick= "postCarData()">+<i class="fa-solid fa-car-side"></i></ion-icon></button>
                </div>

            </div>
            <!-- <input type="text" id="new-birthdate" placeholder="Ngày sinh"> -->
            <!-- <input type="text" id="new-occupation" placeholder="Nghề nghiệp"> -->
        </div>

    </form>
    <div class="row" id="add-row-form3">
        <div class="col">
            <input type="te1xt" id="id-search" placeholder="Tìm kiếm theo mã xe...">
        </div>
    </div>



    <table class="table table-hover table-sortable table-bordered">
        <thead>
            <tr>
                <th>Mã xe</th>
                <th>Tên xe</th>
                <th>Giá tiền</th>
                <th>Màu sắc</th>
                <th>Nguồn gốc</th>
                <th>Ngày nhập</th>
                <th>Số lượng tồn</th>
                <th>Số đã bán</th> 
                <!--<th>Số lượng xe đã bán</th> -->
                <th>Năm ra mắt</th>
                <th></th>
            </tr>
        </thead>
        <!--rgb(148, 238, 208)-->
        <tbody style="background-color: rgb(245, 252, 255)" id="car-data">
            
            
      
        </tbody>
    </table>
    <div class="footer" style="background-color: #EEEEEE; text-align: center; padding: 10px; color: #757575;">
        Copyright © HapiHapi 2024
    </div>

</body>

</html>