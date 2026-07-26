import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/components/Profile.module.css';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import Swal from 'sweetalert2';

const ProfileForm = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    citizenId: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        citizenId: user.identityNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await Swal.fire({
      title: 'Xác nhận lưu thay đổi?',
      text: 'Bạn có chắc chắn muốn cập nhật thông tin cá nhân?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Lưu thay đổi',
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
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('identityNumber', formData.citizenId);

      const updatedUser = await authService.updateUser(data);
      setUser(updatedUser);
      toast.success('Cập nhật thông tin thành công!');
    } catch (error) {
      toast.error(error.message || 'Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.profileForm}>
      <h2 className={styles.contentTitle}>HỒ SƠ THÀNH VIÊN</h2>
      <p className={styles.contentSubtitle}>Các thông tin cá nhân của bạn phục vụ liên hệ và giao hàng.</p>


      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Họ và Tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.formControl}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formControl}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.formControl}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Số CCCD</label>
          <input
            type="text"
            name="citizenId"
            value={formData.citizenId}
            onChange={handleChange}
            className={styles.formControl}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Địa chỉ</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={styles.formControl}
        />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
      </button>
    </form>
  );
};

export default ProfileForm;
