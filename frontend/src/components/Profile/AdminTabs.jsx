import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/components/Profile.module.css';

const AdminTabs = ({ activeTab }) => {
  return (
    <div>
      <h2 className={styles.contentTitle}>
         {activeTab === 'activity' && 'Nhật ký hoạt động'}
         {activeTab === 'permissions' && 'Phân quyền chi tiết'}
      </h2>
      <p className={styles.contentSubtitle}>
         Theo dõi lịch sử và hệ thống quản trị của bạn.
      </p>

      <div className={styles.tabContent}>
        {activeTab === 'activity' && (
          <div className={styles.emptyState}>Chưa có ghi nhận hoạt động nào gần đây.</div>
        )}
        
        {activeTab === 'permissions' && (
          <div className={styles.emptyState}>Quyền hạn của bạn: Quản trị viên (Toàn quyền).</div>
        )}
      </div>

      {/* <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Khu vực Quản trị</h3>
        <p style={{ color: '#666', marginBottom: '15px' }}>Truy cập vào hệ thống quản trị để quản lý toàn bộ hệ thống.</p>
        <Link to="/admin" className={styles.adminBtn}>
          Quản trị hệ thống
        </Link>
      </div> */}
    </div>
  );
};

export default AdminTabs;
