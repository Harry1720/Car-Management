import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/Accounting.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';

const AccountingPage = () => {
    const [accountingData, setAccountingData] = useState([
        {
            transaction_id: "TRX001",
            deposit_price: "100,000,000 VNĐ",
            transaction_price: "1,089,000,000 VNĐ",
            totalprice: "1,189,000,000 VNĐ"
        },
        {
            transaction_id: "TRX002",
            deposit_price: "150,000,000 VNĐ",
            transaction_price: "1,491,000,000 VNĐ",
            totalprice: "1,641,000,000 VNĐ"
        },
        {
            transaction_id: "TRX003",
            deposit_price: "85,000,000 VNĐ",
            transaction_price: "0 VNĐ",
            totalprice: "85,000,000 VNĐ"
        },
        {
            transaction_id: "TRX004",
            deposit_price: "67,000,000 VNĐ",
            transaction_price: "675,000,000 VNĐ",
            totalprice: "742,000,000 VNĐ"
        },
        {
            transaction_id: "TRX005",
            deposit_price: "45,000,000 VNĐ",
            transaction_price: "0 VNĐ",
            totalprice: "45,000,000 VNĐ"
        },
        {
            transaction_id: "TRX006",
            deposit_price: "67,000,000 VNĐ",
            transaction_price: "675,000,000 VNĐ",
            totalprice: "742,000,000 VNĐ"
        },
        {
            transaction_id: "TRX007",
            deposit_price: "100,000,000 VNĐ",
            transaction_price: "1,089,000,000 VNĐ",
            totalprice: "1,189,000,000 VNĐ"
        },
        {
            transaction_id: "TRX008",
            deposit_price: "45,000,000 VNĐ",
            transaction_price: "0 VNĐ",
            totalprice: "45,000,000 VNĐ"
        },
        {
            transaction_id: "TRX009",
            deposit_price: "45,000,000 VNĐ",
            transaction_price: "458,000,000 VNĐ",
            totalprice: "503,000,000 VNĐ"
        },
        {
            transaction_id: "TRX010",
            deposit_price: "85,000,000 VNĐ",
            transaction_price: "0 VNĐ",
            totalprice: "85,000,000 VNĐ"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        document.title = "Kế toán | VinFast";
    }, []);

    return(
        <>
            <Navbar/>
            <div className="accounting-page">
                <h1 id="heading"><b>Danh sách doanh thu</b></h1>

                <div className="row" id="add-row-form3">
                    <div className="col">
                        <input 
                            type="text" 
                            id="id-search" 
                            placeholder="Tìm kiếm theo mã giao dịch..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="table table-hover table-sortable table-bordered">
                    <thead>
                        <tr>
                            <th>Mã giao dịch</th>
                            <th>Số tiền đặt cọc</th>
                            <th>Số tiền đã thanh toán</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor: "rgb(245, 252, 255)"}}>
                        {accountingData
                            .filter(keToan => 
                                keToan.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(keToan => (
                                <tr key={keToan.transaction_id}>
                                    <td>{keToan.transaction_id}</td>
                                    <td>{keToan.deposit_price}</td>
                                    <td>{keToan.transaction_price}</td>
                                    <td>{keToan.totalprice}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Footer/>
        </>
    );
};

export default AccountingPage;