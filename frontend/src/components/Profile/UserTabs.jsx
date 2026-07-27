import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/components/Profile.module.css';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import { depositService } from '../../services/depositService';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';

const UserTabs = ({ activeTab, user, setUser }) => {
  // Change Password State
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (activeTab === 'history' && user) {
      fetchDeposits();
    }
  }, [activeTab, user]);

  const fetchDeposits = async () => {
    setLoadingHistory(true);
    try {
      const data = await depositService.getDepositsByCustomer(user.customerId);
      setDeposits(data);
    } catch (error) {
      toast.error('Lỗi khi tải lịch sử mua/đặt xe');
    } finally {
      setLoadingHistory(false);
    }
  };

  const formatVnd = (value) => {
    const amount = Number(value || 0);
    return `${new Intl.NumberFormat("vi-VN").format(amount)} VNĐ`;
  };

  const handleUnfollow = async (carId) => {
    try {
      const response = await authService.toggleCarInterest(carId);
      if (setUser) {
         setUser(prev => ({ ...prev, carsInterested: response.carsInterested }));
      }
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || "Lỗi khi bỏ theo dõi");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Mật khẩu mới không khớp!');
      return;
    }
    
    const result = await Swal.fire({
      title: 'Xác nhận đổi mật khẩu?',
      text: 'Bạn có chắc chắn muốn thay đổi mật khẩu?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đổi mật khẩu',
      cancelButtonText: 'Hủy',
      background: '#1c1f26',
      color: '#fff',
      customClass: {
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn'
      }
    });
    
    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      await authService.changePassword(passwords.oldPassword, passwords.newPassword);
      toast.success('Đổi mật khẩu thành công!');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.message || 'Lỗi khi đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className={styles.contentTitle}>
         {activeTab === 'history' && 'Lịch sử mua/đặt xe'}
         {activeTab === 'following' && 'Xe đang theo dõi'}
         {activeTab === 'orders' && 'Trạng thái đơn hàng'}
         {activeTab === 'password' && 'Cài đặt bảo mật'}
      </h2>
      <p className={styles.contentSubtitle}>
         {activeTab === 'password' ? 'Bảo vệ tài khoản của bạn bằng một mật khẩu mạnh.' : 'Quản lý thông tin chi tiết.'}
      </p>

      <div className={styles.tabContent}>
        {activeTab === 'history' && (
          <div className={styles.historyContainer}>
            {loadingHistory ? (
              <div className={styles.emptyState}>Đang tải dữ liệu...</div>
            ) : deposits.length === 0 ? (
              <div className={styles.emptyState}>Chưa có lịch sử mua/đặt xe nào.</div>
            ) : (
              <div className={styles.depositList}>
                {deposits.map(deposit => (
                  <div key={deposit._id} className={styles.depositCard}>
                    <div className={styles.depositHeader}>
                      <span className={styles.depositId}>Mã GD: {deposit._id}</span>
                      <span className={styles.depositStatus} style={{ 
                        color: (deposit.status === 'confirmed' || deposit.status === 'completed') ? '#28a745' : deposit.status === 'pending' ? '#ffb845' : '#dc3545'
                      }}>
                        {deposit.status === 'pending' ? 'Chờ đặt cọc' : 
                         deposit.status === 'confirmed' ? 'Cọc thành công' : 
                         deposit.status === 'completed' ? 'Hoàn thành' : 
                         deposit.status === 'cancelled' ? 'Đã hủy' : deposit.status}
                      </span>
                    </div>
                    <div className={styles.depositBody}>
                      <h4 className={styles.depositCarName}>
                        {deposit.carId ? deposit.carId.name : 'Xe không xác định'}
                      </h4>
                      <div className={styles.depositAmount}>
                        Cọc: <strong>{formatVnd(deposit.depositAmount)}</strong>
                      </div>
                    </div>
                    <div className={styles.depositFooter}>
                      <span>Ngày đặt: {new Date(deposit.createdAt).toLocaleDateString('vi-VN')} {new Date(deposit.createdAt).toLocaleTimeString('vi-VN')}</span>
                      <span>Tổng tiền xe: {formatVnd(deposit.totalPrice)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'following' && (
          <div className={styles.followingContainer}>
            {!user?.carsInterested || user.carsInterested.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Bạn chưa theo dõi chiếc xe nào.</p>
                <Link to="/products" className={styles.browseCarsBtn}>Khám phá ngay</Link>
              </div>
            ) : (
              <div className={styles.carGrid}>
                {user.carsInterested.map(car => (
                  <div key={car._id} className={styles.miniCarCard}>
                    <div className={styles.miniCarImage}>
                      <img src={car.variants?.[0]?.image || "/images/vf8.png"} alt={car.name} />
                    </div>
                    <div className={styles.miniCarInfo}>
                      <h4>{car.name}</h4>
                      <p className={styles.miniCarPrice}>{formatVnd(car.price)}</p>
                      <div className={styles.miniCarActions}>
                        <Link to={`/landing/${(car.model || "").toLowerCase()}`} className={styles.detailBtn}>Chi tiết</Link>
                        <button onClick={() => handleUnfollow(car._id)} className={styles.unfollowBtn}>Bỏ theo dõi</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className={styles.emptyState}>Không có đơn hàng nào đang xử lý.</div>
        )}

        {activeTab === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
            <div className={styles.formGroup}>
              <label>Mật khẩu cũ</label>
              <input
                type="password"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                className={styles.formControl}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Mật khẩu mới</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className={styles.formControl}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Xác nhận mật khẩu mới</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className={styles.formControl}
                required
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserTabs;
