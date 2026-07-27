import { useEffect, useState } from "react";
import "../../assets/css/admin_pages/CarList.css"; // Reuse existing table styles
import Navbar from "../../components/NavbarAdmin";
import Footer from "../../components/FooterAdmin";
import { consultationService } from "../../services/consultationService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ConsultationManage = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRequestType, setFilterRequestType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await consultationService.getConsultations(1, 100, filterStatus ? { status: filterStatus } : {});
      setConsultations(response.consultations || []);
    } catch (error) {
      toast.error(error.message || "Lỗi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Quản lý yêu cầu tư vấn | VinFast";
    fetchConsultations();
  }, [filterStatus]);

  const handleUpdateStatus = async (id, currentStatus, skipConfirm = false) => {
    if (currentStatus === 'contacted') return;
    
    if (!skipConfirm) {
      const result = await Swal.fire({
        title: 'Xác nhận',
        text: 'Đánh dấu khách hàng này là Đã liên hệ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy'
      });
      
      if (!result.isConfirmed) return;
    }
    
    try {
      await consultationService.updateConsultationStatus(id, 'contacted');
      toast.success("Cập nhật trạng thái thành công");
      fetchConsultations();
    } catch (error) {
      toast.error(error.message || "Lỗi cập nhật");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="consultation-status-badge pending">Mới đăng ký</span>;
      case 'contacted': return <span className="consultation-status-badge contacted">Đã liên hệ</span>;
      case 'completed': return <span className="consultation-status-badge completed">Hoàn thành</span>;
      case 'canceled': return <span className="consultation-status-badge canceled">Đã hủy</span>;
      default: return status;
    }
  };

  const getRequestType = (type) => {
    switch (type) {
      case 'test_drive': return 'Lái thử';
      case 'promotion': return 'Nhận ưu đãi';
      default: return 'Khác';
    }
  };

  const filteredConsultations = consultations.filter((lead) => {
    const matchesSearch = lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.phone.includes(searchTerm) || 
                          lead.carModel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRequestType = filterRequestType ? lead.requestType === filterRequestType : true;
    return matchesSearch && matchesRequestType;
  });

  const handleViewDetails = (lead) => {
    Swal.fire({
      title: 'Chi tiết Yêu cầu',
      html: `
        <div style="text-align: left; line-height: 1.8; font-size: 1.05rem;">
          <p><strong>Ngày đăng ký:</strong> ${new Date(lead.createdAt).toLocaleString('vi-VN')}</p>
          <p><strong>Họ tên:</strong> ${lead.fullName}</p>
          <p><strong>Số điện thoại:</strong> ${lead.phone}</p>
          <p><strong>Dòng xe quan tâm:</strong> ${lead.carModel}</p>
          <p><strong>Loại yêu cầu:</strong> ${getRequestType(lead.requestType)}</p>
          <p><strong>Trạng thái:</strong> <span style="font-weight: 500; color: ${lead.status === 'pending' ? '#856404' : '#155724'}">${lead.status === 'pending' ? 'Mới đăng ký' : 'Đã liên hệ'}</span></p>
          ${lead.note ? `<hr/><p><strong>Ghi chú / Ưu đãi:</strong><br/> <span style="color: #0056b3; font-weight: 500;">${lead.note}</span></p>` : ''}
        </div>
      `,
      icon: 'info',
      showCancelButton: lead.status === 'pending',
      confirmButtonText: lead.status === 'pending' ? 'Đã liên hệ' : 'Đóng',
      cancelButtonText: 'Đóng',
      confirmButtonColor: lead.status === 'pending' ? '#28a745' : '#3085d6',
      cancelButtonColor: '#6c757d',
      width: '500px'
    }).then((result) => {
      if (result.isConfirmed && lead.status === 'pending') {
        handleUpdateStatus(lead._id, lead.status, true);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="car-list-page consultation-manage-page">
        <div className="page-header-block">
          <span className="page-overline">CONSULTATION MANAGEMENT</span>
          <h1 className="page-main-title">YÊU CẦU TƯ VẤN</h1>
          <p className="page-subtitle">Quản lý và chăm sóc khách hàng tiềm năng.</p>
        </div>

        <div className="row filter-row-outer" id="add-row-form3">
          <div className="col filter-row-container filter-row-inner">
            <input 
              type="text" 
              id="id-search" 
              placeholder="Tìm kiếm theo Tên, SĐT, hoặc dòng xe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input-search"
            />
            
            <button className="btn btn-outline mobile-filter-btn" onClick={() => setShowMobileFilter(true)}>
              <ion-icon name="filter-outline"></ion-icon>
            </button>

            <div className="desktop-filters">
              <select 
                value={filterRequestType} 
                onChange={(e) => setFilterRequestType(e.target.value)}
                className="filter-select custom-arrow-select"
              >
                <option value="">Tất cả yêu cầu</option>
                <option value="test_drive">Lái thử</option>
                <option value="promotion">Nhận ưu đãi</option>
              </select>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select custom-arrow-select"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Mới đăng ký</option>
                <option value="contacted">Đã liên hệ</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Ngày đăng ký</th>
                <th>Họ Tên</th>
                <th>SĐT</th>
                <th>Trạng thái</th>
                <th>Xem chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center">Đang tải...</td></tr>
              ) : filteredConsultations.length === 0 ? (
                <tr><td colSpan="5" className="text-center">Không có dữ liệu</td></tr>
              ) : (
                filteredConsultations.map(lead => (
                  <tr key={lead._id}>
                    <td>{new Date(lead.createdAt).toLocaleString('vi-VN')}</td>
                    <td>{lead.fullName}</td>
                    <td>{lead.phone}</td>
                    <td>{getStatusBadge(lead.status)}</td>
                    <td className="text-center">
                      <button 
                        className="admin-action-icon-btn"
                        onClick={() => handleViewDetails(lead)}
                        title="Xem chi tiết"
                      >
                        <ion-icon name="eye-outline"></ion-icon>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showMobileFilter && (
        <div className="mobile-bottom-sheet-overlay" onClick={() => setShowMobileFilter(false)}>
          <div className="mobile-bottom-sheet-content" onClick={e => e.stopPropagation()}>
            <div className="bottom-sheet-header">
              <h3>Lọc danh sách</h3>
              <button className="close-btn" onClick={() => setShowMobileFilter(false)}>
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            <div className="bottom-sheet-body">
              <div className="filter-group">
                <label>Loại yêu cầu</label>
                <select 
                  value={filterRequestType} 
                  onChange={(e) => setFilterRequestType(e.target.value)}
                  className="filter-select custom-arrow-select w-100"
                >
                  <option value="">Tất cả yêu cầu</option>
                  <option value="test_drive">Lái thử</option>
                  <option value="promotion">Nhận ưu đãi</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Trạng thái</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select custom-arrow-select w-100"
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="pending">Mới đăng ký</option>
                  <option value="contacted">Đã liên hệ</option>
                </select>
              </div>
              <button className="btn btn-primary w-100 mt-3" onClick={() => setShowMobileFilter(false)}>Áp dụng</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ConsultationManage;
