import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/components/Profile.module.css';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';

const ProfileForm = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      if (avatarFile) {
        data.append('avatar', avatarFile);
      }

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

      <div className={styles.avatarSection}>
        {avatarPreview ? (
          <img src={avatarPreview} alt="Avatar" className={styles.avatarPreview} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        )}
        <label htmlFor="avatar-upload" className={styles.uploadBtn}>
          Đổi ảnh đại diện
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />
      </div>

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
          className={styles.formControl}
          disabled
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
