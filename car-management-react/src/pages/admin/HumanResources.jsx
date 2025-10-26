import { useEffect, useRef, useState } from 'react';
import '../../assets/css/admin_pages/QLNhanSu.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import Chart from 'chart.js/auto';

const HRPage = () => {
        useEffect(() => {
        document.title = "Quản lý khách hàng | VinFast";
    }, []);
    return (
        <>
        <Navbar/>
    <h1 id="heading"><b>Quản lý nhân sự</b></h1>

    <form id="add-row-form">
        <div className="container">

            <div className="row" id="add-row-form">
                <div className="col">
                    <p>Mã nhân viên</p>
                    <div><input type="text" id="new-id"/></div>
                </div>
                <div className="col">
                    <p>Họ và tên nhân viên</p>
                    <input type="text" id="new-name"/>
                </div>
                <div className="col">
                    <p>Ngày tháng năm sinh</p>
                    <input type="text" id="new-birthdate"/>
                </div>
                <div className="col">
                    <p>Địa chỉ</p>
                    <input type="text" id="new-address"/>
                </div>


            </div>

            <div className="row" id="add-row-form">
                <div className="col">
                    <p>Số điện thoại</p>
                    <input type="text" id="new-phoneNo"/>
                </div>
                <div className="col">
                    <p>Email</p>
                    <input type="text" id="new-email"/>
                </div>
                <div className="col">
                    <p>Chức vụ</p>
                    <input type="text" id="new-position"/>
                </div>
                <div className="col">
                    <button type="submit"   onClick ="postEmployeeData()"  ><ion-icon name="person-add-outline"></ion-icon></button>
                </div>

            </div>
            {/* <!-- <input type="text" id="new-birthdate" placeholder="Ngày sinh"> -->
            <!-- <input type="text" id="new-occupation" placeholder="Nghề nghiệp"> --> */}
        </div>

    </form>
    <div className="row" id="add-row-form3">
        <div className="col">
            <input type="te1xt" id="id-search" placeholder="Tìm kiếm theo mã nhân viên..."/>
        </div>
    </div>



    <table className="table table-hover table-sortable table-bordered">
        <thead>
            <tr>
                <th>Mã nhân viên</th>
                <th>Họ và tên nhân viên</th>
                <th>Ngày tháng năm sinh</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Chức vụ</th>
                <th></th>
            </tr>
        </thead> 

        
        {/* <tbody style="background-color: rgb(245, 252, 255)" id="employee-data">

        </tbody> */}
    </table>
    <Footer/>
</>
)
};
export default HRPage;
