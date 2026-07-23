import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProfileForm from '../../components/Profile/ProfileForm';
import UserTabs from '../../components/Profile/UserTabs';
import AdminTabs from '../../components/Profile/AdminTabs';
import styles from '../../assets/css/components/Profile.module.css';
import Swal from 'sweetalert2';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!authService.isAuthenticated()) {
          navigate('/login');
          return;
        }
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        toast.error('Không thể lấy thông tin người dùng.');
        if (error.status === 401) {
           navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
     const result = await Swal.fire({
         title: 'Đăng xuất khỏi hệ thống?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Đồng ý',
         cancelButtonText: 'Hủy'
     });
     if (result.isConfirmed) {
         authService.logout();
         navigate('/login');
     }
  };

  if (loading) {
    return (
      <div className={styles.profilePage}>
        <Navbar activePage="profile" />
        <div style={{ padding: '100px', textAlign: 'center', color: 'white' }}>Đang tải...</div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.profilePage}>
      <Navbar activePage="profile" />
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.leftColumn}>
            <div className={styles.sidebarUserInfo}>
              {user.avatar ? (
                <img src={user.avatar} className={styles.sidebarAvatar} alt="Avatar" />
              ) : (
                <div className={styles.sidebarAvatarPlaceholder}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <h3 className={styles.sidebarName}>{user.name}</h3>
              <p className={styles.sidebarRole}>{user.role === 'admin' ? 'ADMINISTRATOR' : 'THÀNH VIÊN'}</p>
            </div>
            
            <div className={styles.sidebarMenu}>
              <div className={`${styles.menuItem} ${activeTab === 'profile' ? styles.active : ''}`} onClick={() => setActiveTab('profile')}>
                 <ion-icon name="person-outline"></ion-icon> HỒ SƠ CÁ NHÂN
              </div>
              
              {user.role === 'admin' ? (
                <>
                  <div className={`${styles.menuItem} ${activeTab === 'activity' ? styles.active : ''}`} onClick={() => setActiveTab('activity')}>
                    <ion-icon name="time-outline"></ion-icon> NHẬT KÝ HOẠT ĐỘNG
                  </div>
                  <div className={`${styles.menuItem} ${activeTab === 'permissions' ? styles.active : ''}`} onClick={() => setActiveTab('permissions')}>
                    <ion-icon name="shield-checkmark-outline"></ion-icon> QUYỀN HẠN
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles.menuItem} ${activeTab === 'history' ? styles.active : ''}`} onClick={() => setActiveTab('history')}>
                    <ion-icon name="cart-outline"></ion-icon> LỊCH SỬ ĐẶT HÀNG
                  </div>
                  <div className={`${styles.menuItem} ${activeTab === 'following' ? styles.active : ''}`} onClick={() => setActiveTab('following')}>
                    <ion-icon name="heart-outline"></ion-icon> XE ĐANG THEO DÕI
                  </div>
                  <div className={`${styles.menuItem} ${activeTab === 'password' ? styles.active : ''}`} onClick={() => setActiveTab('password')}>
                    <ion-icon name="lock-closed-outline"></ion-icon> CÀI ĐẶT BẢO MẬT
                  </div>
                </>
              )}
              
              {user.role === 'admin' && (
                <div className={`${styles.menuItem} ${styles.adminSysItem}`} onClick={() => navigate('/admin')}>
                   <ion-icon name="settings-outline"></ion-icon> QUẢN TRỊ HỆ THỐNG
                </div>
              )}
              
              <div className={`${styles.menuItem} ${styles.logoutItem}`} onClick={handleLogout}>
                 <ion-icon name="log-out-outline"></ion-icon> ĐĂNG XUẤT
              </div>
            </div>
          </div>
          
          <div className={styles.rightColumn}>
            {activeTab === 'profile' && (
              <ProfileForm user={user} setUser={setUser} />
            )}
            
            {user.role === 'admin' && activeTab !== 'profile' && (
              <AdminTabs activeTab={activeTab} />
            )}
            
            {user.role !== 'admin' && activeTab !== 'profile' && (
              <UserTabs activeTab={activeTab} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
