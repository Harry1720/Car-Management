import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../assets/css/components/BackToTop.module.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Ẩn ở trang login và các trang admin
  const isHiddenPage = location.pathname === '/login' || location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { //trả về số pixel mà document hiện đang bị cuộn theo chiều dọc.
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll); //Mỗi khi người dùng cuộn chuột, hãy chạy hàm handleScroll

    return () => window.removeEventListener('scroll', handleScroll); //Cleanup Function
    //Khi component chứa đoạn code này bị hủy (unmount - ví dụ người dùng chuyển sang trang khác), hàm return này sẽ chạy để gỡ bỏ sự kiện lắng nghe cuộn. Nếu không có dòng này, sự kiện scroll vẫn sẽ tiếp tục chạy ngầm, gọi vào một state của một component không còn tồn tại, gây ra lỗi Memory Leak (Rò rỉ bộ nhớ) làm nặng trình duyệt.

  }, []);

  const scrollToTop = () => { //Hàm gắn vào sự kiện onClick của cái nút
    window.scrollTo({
      top: 0,               //Yêu cầu trình duyệt cuộn thẳng lên tọa độ 0 (đỉnh trang).
      behavior: 'smooth'    //tạo ra một hiệu ứng cuộn mượt
    });
  };

  if (isHiddenPage) return null;

  return (
    <button
      className={`${styles.backToTop} ${isVisible ? styles.show : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="bx bx-up-arrow-alt"></i>
    </button>
  );
};

export default BackToTop;
