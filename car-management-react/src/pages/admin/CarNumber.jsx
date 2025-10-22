<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../assets/images/tab_logo.png" type="image/x-icon">
    <title>Quản lí số lượng xe</title>
    <link rel="stylesheet" href="../../assets/css/admin_pages/QLSLXe.css">
    <link rel="stylesheet" href="../../assets/css/components/navbar_admin.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css"></link>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <script>
        function alertFeature() {
            alert('Tính năng đang được được phát triển');
        }
    </script>
</head>
    <script src="/Public/components/navbar_admin.js"></script>
    <script src="../../assets/js/admin/QLSLXe.js"></script>
<body>
    <script>createNavbarAdmin();</script>


    <h1 id="heading"><b>Quản lí số lượng xe</b></h1>



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
                <th>Ngày nhập</th>
                <th>Số lượng tồn</th>
                <th>Số lượng nhập</th>
                <th>Số lượng xe đã bán</th>
                <th></th>
            </tr>
        </thead>
        <!--rgb(148, 238, 208)-->
        <tbody style="background-color: rgb(245, 252, 255)">
            <tr>
                <td class="editable">VINVF8BL</td>
                <td class="editable">2024-06-01</td>
                <td class="editable">8</td>
                <td class="editable">11</td>
                <td class="editable">3</td>

                <td class="action-buttons">
                    <button class="edit-btn"><ion-icon name="create-outline"></ion-icon></button>
                    <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
                    <!-- Delete button -->
                </td>
            </tr>

            <tr>
                <td class="editable">VINVF8WH</td>
                <td class="editable">2024-06-01</td>
                <td class="editable">9</td>
                <td class="editable">16</td>
                <td class="editable">7</td>

                <td class="action-buttons">
                    <button class="edit-btn"><ion-icon name="create-outline"></ion-icon></button>
                    <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
                    <!-- Delete button -->
                </td>
            </tr>

            <tr>
                <td class="editable">VINVF9CR</td>
                <td class="editable">2024-06-01</td>
                <td class="editable">10</td>
                <td class="editable">20</td>
                <td class="editable">10</td>

                <td class="action-buttons">
                    <button class="edit-btn"><ion-icon name="create-outline"></ion-icon></button>
                    <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
                    <!-- Delete button -->
                </td>
            </tr>

            <tr>
                <td class="editable">VINVF5B</td>
                <td class="editable">2024-07-01</td>
                <td class="editable">8</td>
                <td class="editable">20</td>
                <td class="editable">12</td>

                <td class="action-buttons">
                    <button class="edit-btn"><ion-icon name="create-outline"></ion-icon></button>
                    <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
                    <!-- Delete button -->
                </td>
            </tr>

            <tr>
                <td class="editable">VINVF6G</td>
                <td class="editable">2024-08-01</td>
                <td class="editable">8</td>
                <td class="editable">16</td>
                <td class="editable">8</td>

                <td class="action-buttons">
                    <button class="edit-btn"><ion-icon name="create-outline"></ion-icon></button>
                    <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
                    <!-- Delete button -->
                </td>
            </tr>




        </tbody>
    </table>
    <div class="footer" style="background-color: #EEEEEE; text-align: center; padding: 10px; color: #757575;">
        Copyright © HapiHapi 2024
    </div>


</body>

</html>