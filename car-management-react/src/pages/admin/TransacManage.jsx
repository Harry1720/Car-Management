import { useEffect, useState } from 'react';
import '../../assets/css/admin_pages/Transaction.css';
import Navbar from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([
        {
            transaction_id: "TRX001",
            citizen_id: "079203012345",
            model_car_id: "VINVF8B",
            transaction_date: "2023-10-25",
            payment_date: "2023-10-26",
            warranty_valid_date: "2025-10-26",
            status_of_purchasing: "Đã thanh toán"
        },
        {
            transaction_id: "TRX002",
            citizen_id: "079203012346",
            model_car_id: "VINVF9BL",
            transaction_date: "2023-10-24",
            payment_date: "2023-10-24",
            warranty_valid_date: "2025-10-24",
            status_of_purchasing: "Đã thanh toán"
        },
        {
            transaction_id: "TRX003",
            citizen_id: "079203012347",
            model_car_id: "VINVF7B",
            transaction_date: "2023-10-23",
            payment_date: null,
            warranty_valid_date: null,
            status_of_purchasing: "Chờ thanh toán"
        },
        {
            transaction_id: "TRX004",
            citizen_id: "079203012348",
            model_car_id: "VINVF6G",
            transaction_date: "2023-10-22",
            payment_date: "2023-10-23",
            warranty_valid_date: "2025-10-23",
            status_of_purchasing: "Đã thanh toán"
        },
        {
            transaction_id: "TRX005",
            citizen_id: "079203012349",
            model_car_id: "VINVF5B",
            transaction_date: "2023-10-21",
            payment_date: null,
            warranty_valid_date: null,
            status_of_purchasing: "Đã hủy"
        },
        {
            transaction_id: "TRX006",
            citizen_id: "084512345678",
            model_car_id: "VINVF6A",
            transaction_date: "2023-10-25",
            payment_date: "2023-10-28",
            warranty_valid_date: "2026-10-28",
            status_of_purchasing: "Đã thanh toán"
        },
        {
            transaction_id: "TRX007",
            citizen_id: "091234567890",
            model_car_id: "VINVF8E",
            transaction_date: "2023-11-02",
            payment_date: "2023-11-05",
            warranty_valid_date: "2026-11-05",
            status_of_purchasing: "Đã thanh toán"
        },
        {
            transaction_id: "TRX008",
            citizen_id: "072345678912",
            model_car_id: "VINVF9S",
            transaction_date: "2023-12-01",
            payment_date: null,
            warranty_valid_date: null,
            status_of_purchasing: "Đang chờ thanh toán"
        },
        {
            transaction_id: "TRX009",
            citizen_id: "098765432101",
            model_car_id: "VINVF5C",
            transaction_date: "2024-01-10",
            payment_date: "2024-01-13",
            warranty_valid_date: "2027-01-13",
            status_of_purchasing: "Đã thanh toán"
        },
        {
            transaction_id: "TRX010",
            citizen_id: "080123456789",
            model_car_id: "VINVF7P",
            transaction_date: "2024-02-14",
            payment_date: null,
            warranty_valid_date: null,
            status_of_purchasing: "Đang xử lý"
        },
        {
            transaction_id: "TRX011",
            citizen_id: "083456789012",
            model_car_id: "VINVF6B",
            transaction_date: "2024-03-03",
            payment_date: "2024-03-06",
            warranty_valid_date: "2027-03-06",
            status_of_purchasing: "Đã thanh toán"
        },
        {
            transaction_id: "TRX012",
            citizen_id: "079999999999",
            model_car_id: "VINVF8L",
            transaction_date: "2024-03-25",
            payment_date: null,
            warranty_valid_date: null,
            status_of_purchasing: "Đã hủy"
        },
        {
            transaction_id: "TRX013",
            citizen_id: "085678901234",
            model_car_id: "VINVF9M",
            transaction_date: "2024-04-18",
            payment_date: "2024-04-20",
            warranty_valid_date: "2027-04-20",
            status_of_purchasing: "Đã thanh toán"
        },
        {
            transaction_id: "TRX014",
            citizen_id: "081234567890",
            model_car_id: "VINVF5A",
            transaction_date: "2024-05-22",
            payment_date: null,
            warranty_valid_date: null,
            status_of_purchasing: "Đang chờ thanh toán"
        },
        {
            transaction_id: "TRX015",
            citizen_id: "076543210987",
            model_car_id: "VINVF7T",
            transaction_date: "2024-06-10",
            payment_date: "2024-06-12",
            warranty_valid_date: "2027-06-12",
            status_of_purchasing: "Đã thanh toán"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleDelete = (transactionId) => {
        setTransactions(transactions.filter(t => t.transaction_id !== transactionId));
    };

    const handleEdit = (transactionId) => {
        const transactionToEdit = transactions.find(t => t.transaction_id === transactionId);
        setEditingTransaction(transactionToEdit);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setTransactions(transactions.map(t => 
            t.transaction_id === editingTransaction.transaction_id ? editingTransaction : t
        ));
        setEditingTransaction(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingTransaction(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        document.title = "Quản lý giao dịch | VinFast";
    }, []);

    return(
        <>
            <Navbar/>
            <div className="transaction-page">
                <h1 id="heading"><b>Quản lý thông tin giao dịch</b></h1>

                {/* Add edit form */}
                {editingTransaction && (
                    <div className="edit-form">
                        <h3>Chỉnh sửa thông tin giao dịch</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Mã giao dịch:</label>
                                <input
                                    type="text"
                                    name="transaction_id"
                                    value={editingTransaction.transaction_id}
                                    disabled
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>CCCD:</label>
                                <input
                                    type="text"
                                    name="citizen_id"
                                    value={editingTransaction.citizen_id}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Mã xe:</label>
                                <input
                                    type="text"
                                    name="model_car_id"
                                    value={editingTransaction.model_car_id}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Ngày giao dịch:</label>
                                <input
                                    type="date"
                                    name="transaction_date"
                                    value={editingTransaction.transaction_date}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Ngày thanh toán:</label>
                                <input
                                    type="date"
                                    name="payment_date"
                                    value={editingTransaction.payment_date || ''}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Thời hạn bảo hành:</label>
                                <input
                                    type="date"
                                    name="warranty_valid_date"
                                    value={editingTransaction.warranty_valid_date || ''}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Trạng thái giao dịch:</label>
                                <select
                                    name="status_of_purchasing"
                                    value={editingTransaction.status_of_purchasing}
                                    onChange={handleEditChange}
                                    className="form-control"
                                >
                                    <option value="Chờ thanh toán">Chờ thanh toán</option>
                                    <option value="Đã thanh toán">Đã thanh toán</option>
                                    <option value="Đã hủy">Đã hủy</option>
                                </select>
                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn-save">
                                    Lưu thay đổi
                                </button>
                                <button 
                                    type="button" 
                                    className="btn-cancel"
                                    onClick={() => setEditingTransaction(null)}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                )}

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
                            <th>CCCD</th>
                            <th>Mã xe</th>
                            <th>Ngày giao dịch</th>
                            <th>Ngày thanh toán</th>
                            <th>Thời hạn bảo hành</th>
                            <th>Trạng thái giao dịch</th>
                            <th colSpan="2">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor: "rgb(245, 252, 255)"}}>
                        {transactions
                            .filter(transaction => 
                                transaction.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(transaction => (
                                <tr key={transaction.transaction_id}>
                                    <td>{transaction.transaction_id}</td>
                                    <td>{transaction.citizen_id}</td>
                                    <td>{transaction.model_car_id}</td>
                                    <td>{transaction.transaction_date}</td>
                                    <td>{transaction.payment_date || "---"}</td>
                                    <td>{transaction.warranty_valid_date || "---"}</td>
                                    <td>{transaction.status_of_purchasing}</td>
                                    <td>
                                        <button 
                                            className="delete-transaction"
                                            onClick={() => handleDelete(transaction.transaction_id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="edit-transaction"
                                            onClick={() => handleEdit(transaction.transaction_id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
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

export default TransactionPage;
