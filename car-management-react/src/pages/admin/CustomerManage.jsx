<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../assets/images/tab_logo.png" type="image/x-icon">
    <link rel="stylesheet" href="../../assets/css/admin_pages/quanlyttkh.css">
    <link rel="stylesheet" href="../../assets/css/components/navbar_admin.css">

    <title>Quản lý thông tin khách hàng</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <script>
        function alertFeature() {
            alert('Tính năng đang được được phát triển');
        }
    </script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

</head>
    <script src="/Public/components/navbar_admin.js"></script>
    <script src="../../assets/js/admin/quanlyttkh.js"></script>
<body>
    <script>createNavbarAdmin();</script>

    <h1 id="heading"><b>Quản lý thông tin khách hàng</b></h1>

    <div class="row" id="add-row-form3">
        <div class="col">
            <input type="text1" id="id-search" placeholder="Tìm kiếm theo số CCCD...">
        </div>
    </div>

    <table class="table table-hover table-sortable table-bordered">
        <thead>
            <tr>
                <th>Số CCCD</th>
                <th>Họ và Tên</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Số giao dịch</th>
                <th></th>
            </tr>
        </thead>
        <tbody style="background-color: rgb(245, 252, 255)" id="customer-data">
            <!-- Dữ liệu sẽ được hiển thị ở đây -->
        </tbody>
    </table>

    <div class="footer" style="background-color: #EEEEEE; text-align: center; padding: 10px; color: #757575;">
        Copyright © HapiHapi 2024
    </div>

</body>

</html>