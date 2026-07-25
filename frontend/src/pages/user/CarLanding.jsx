import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../assets/css/user_pages/CarLanding.module.css";
import "react-quill-new/dist/quill.snow.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { carService } from "../../services/carService";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";

const CarLanding = () => {
  const { modelId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInterested, setIsInterested] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await carService.getAllCars(1, 100);
        let carsArr = Array.isArray(response)
          ? response
          : response && Array.isArray(response.cars)
            ? response.cars
            : [];
            
        // Tìm xe theo model (id rút gọn vd: vf8) hoặc name (tên đầy đủ)
        const foundCar = carsArr.find(c => 
          c.model.toLowerCase() === modelId.toLowerCase() || 
          c.name.toLowerCase().replace(/\s+/g, '') === modelId.toLowerCase()
        );
        
        if (foundCar) {
          setCar(foundCar);
          document.title = `${foundCar.name} | VinFast`;
          fetchUserInterest(foundCar);
        } else {
          toast.error("Không tìm thấy xe");
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi tải dữ liệu xe");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserInterest = async (foundCar) => {
      try {
        if (authService.isAuthenticated()) {
          const user = await authService.getCurrentUser();
          if (user.role === 'user' && user.carsInterested) {
            const isLiked = user.carsInterested.some(c => c._id === foundCar._id || c === foundCar._id);
            setIsInterested(isLiked);
          }
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin user", error);
      }
    };
    
    if (modelId) {
      fetchCar();
    }
  }, [modelId, navigate]);

  const handleToggleInterest = async () => {
    if (!authService.isAuthenticated()) {
      toast.info("Vui lòng đăng nhập để lưu xe vào danh sách yêu thích");
      navigate("/login");
      return;
    }

    const role = localStorage.getItem('role');
    if (role === 'admin' || role === 'employee') {
      toast.warning('Chỉ khách hàng mới có thể theo dõi xe!');
      return;
    }
    
    try {
      setIsToggling(true);
      // Optimistic update
      setIsInterested(!isInterested);
      
      const response = await authService.toggleCarInterest(car._id);
      setIsInterested(response.isInterested);
      toast.success(response.message);
    } catch (error) {
      // Revert if error
      setIsInterested(!isInterested);
      toast.error(error.message || "Lỗi khi cập nhật danh sách yêu thích");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDepositClick = () => {
    const role = localStorage.getItem('role');
    if (role === 'admin' || role === 'employee') {
      toast.warning('Tài khoản quản trị viên/nhân viên không thể thực hiện đặt cọc!');
      return;
    }
    navigate(`/deposit?model=${car.model}`);
  };

  if (loading) return (
    <div className={styles.landing_page}>
      <Navbar activePage="products" />
      <div className={styles.loadingContainer}>Đang tải...</div>
      <Footer />
    </div>
  );
  
  if (!car) return (
    <div className={styles.landing_page}>
      <Navbar activePage="products" />
      <div className={styles.loadingContainer}>Không tìm thấy dữ liệu xe</div>
      <Footer />
    </div>
  );

  // Lấy ảnh cover
  const getCoverImage = () => {
    if (car.images && car.images.length > 0) return car.images[0];
    if (car.variants && car.variants.length > 0 && car.variants[0].images && car.variants[0].images.length > 0) {
      return car.variants[0].images[0];
    }
    return "/images/hero-banner.png";
  };

  return (
    <div className={styles.landing_page}>
      <Navbar activePage="products" />
      
      {/* Hero section */}
      <div className={styles.hero}>
         <img src={getCoverImage()} alt={car.name} className={styles.hero_bg} />
         <div className={styles.hero_overlay}>
           <h1>{car.name}</h1>
           <p>Mẫu xe tương lai dành cho bạn</p>
           <div className={styles.cta_container}>
             <button className={styles.cta_button} onClick={handleDepositClick}>ĐẶT CỌC NGAY</button>
             <button 
               onClick={handleToggleInterest}
               disabled={isToggling}
               className={styles.heart_btn}
               style={{ color: isInterested ? '#ff4757' : '#ffffff' }}
               title={isInterested ? "Bỏ theo dõi" : "Theo dõi xe này"}
             >
               <i className={isInterested ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
             </button>
           </div>
         </div>
      </div>

      {/* Bài viết mô tả Rendered HTML */}
      <div className={`${styles.content_container} ql-snow`}>
         <div 
           className={`${styles.article_content} ql-editor`}
           dangerouslySetInnerHTML={{ 
             __html: car.articleContent 
               ? car.articleContent.replace(/&nbsp;/g, ' ') 
               : "<h3 style='text-align: center'>Nội dung chi tiết đang được cập nhật...</h3>" 
           }}
         />
      </div>

      <Footer />
    </div>
  );
};

export default CarLanding;
