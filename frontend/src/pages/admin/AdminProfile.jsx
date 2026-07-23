import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { authService } from '../../services/authService';
import NavbarAdmin from '../../components/NavbarAdmin';
import Footer from '../../components/FooterAdmin';
import styles from '../../assets/css/admin_pages/AdminProfile.module.css';

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: ''
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Password form state
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [savingPassword, setSavingPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Tài khoản của tôi | Quản trị viên";
    const fetchUser = async () => {
      try {
        const data = await authService.getCurrentUser();
        setUser(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          role: data.role === 'admin' ? 'Admin' : (data.role === 'employee' ? 'Nhân viên' : data.role)
        });
        setAvatarPreview(data.avatar || null);
      } catch (error) {
        toast.error('Lỗi khi tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    const result = await Swal.fire({
      title: 'Xác nhận lưu thay đổi?',
      text: 'Bạn có chắc chắn muốn cập nhật thông tin cá nhân?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Lưu thay đổi',
      cancelButtonText: 'Hủy'
    });
    
    if (!result.isConfirmed) return;

    setSavingProfile(true);
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
      toast.error(error.message || 'Lỗi khi cập nhật thông tin');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    const result = await Swal.fire({
      title: 'Xác nhận đổi mật khẩu?',
      text: 'Bạn có chắc chắn muốn thay đổi mật khẩu?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đổi mật khẩu',
      cancelButtonText: 'Hủy'
    });
    
    if (!result.isConfirmed) return;
    
    setSavingPassword(true);
    try {
      await authService.changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });
      toast.success('Đổi mật khẩu thành công!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.message || 'Lỗi khi đổi mật khẩu');
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <NavbarAdmin />
        <div className={`admin_profile_page ${styles.loadingContainer}`}>
          <div className={styles.loadingText}>Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <NavbarAdmin />
      <div className="admin_profile_page">
        <div className={`page-header-block ${styles.profileHeaderBlock}`}>
          <span className="page-overline">ADMIN PROFILE</span>
          <h1 className="page-main-title">HỒ SƠ QUẢN TRỊ VIÊN</h1>
          <p className="page-subtitle">Quản lý thông tin cá nhân và thiết lập bảo mật tài khoản.</p>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileContent}>
            {/* Cột Trái - Giống trang Profile User */}
            <div className={styles.leftColumn}>
              <div className={styles.sidebarUserInfo}>
                {user?.avatar ? (
                  <img src={user.avatar} className={styles.sidebarAvatar} alt="Avatar" />
                ) : (
                  <div className={styles.sidebarAvatarPlaceholder}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <h3 className={styles.sidebarName}>{user?.name}</h3>
                <p className={styles.sidebarRole}>{user?.role === 'admin' ? 'ADMINISTRATOR' : 'NHÂN VIÊN'}</p>
              </div>
              
              <div className={styles.sidebarMenu}>
                <div className={`${styles.menuItem} ${activeTab === 'profile' ? styles.active : ''}`} onClick={() => setActiveTab('profile')}>
                   <ion-icon name="person-outline"></ion-icon> HỒ SƠ CÁ NHÂN
                </div>
                
                <div className={`${styles.menuItem} ${activeTab === 'password' ? styles.active : ''}`} onClick={() => setActiveTab('password')}>
                   <ion-icon name="lock-closed-outline"></ion-icon> CÀI ĐẶT BẢO MẬT
                </div>
              </div>
            </div>
            
            {/* Cột Phải */}
            <div className={styles.rightColumn}>
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSubmit} className={styles.profileForm}>
                  <h2 className={styles.contentTitle}>HỒ SƠ CÁ NHÂN</h2>
                  <p className={styles.contentSubtitle}>Các thông tin cá nhân của bạn phục vụ công việc.</p>

                  <div className={styles.avatarSection}>
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className={styles.avatarPreview} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                    <label htmlFor="admin-avatar-upload" className={styles.uploadBtn}>
                      Đổi ảnh đại diện
                    </label>
                    <input
                      id="admin-avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className={styles.hiddenInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Họ và Tên</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
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
                    <label>Chức vụ</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      className={styles.formControl}
                      disabled
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className={styles.formControl}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      className={styles.formControl}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={savingProfile}>
                    {savingProfile ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </form>
              )}
              
              {activeTab === 'password' && (
                <div>
                  <h2 className={styles.contentTitle}>CÀI ĐẶT BẢO MẬT</h2>
                  <p className={styles.contentSubtitle}>Bảo vệ tài khoản của bạn bằng một mật khẩu mạnh.</p>
                  
                  <form onSubmit={handlePasswordSubmit}>
                    <div className={styles.formGroup}>
                      <label>Mật khẩu cũ</label>
                      <input
                        type="password"
                        name="oldPassword"
                        value={passwordData.oldPassword}
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
                        value={passwordData.newPassword}
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
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={styles.formControl}
                        required
                      />
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={savingPassword}>
                      {savingPassword ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminProfile;
