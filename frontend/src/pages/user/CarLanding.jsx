import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../assets/css/user_pages/CarLanding.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { carService } from "../../services/carService";
import { toast } from "react-toastify";

const CarLanding = () => {
  const { modelId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
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
    
    if (modelId) {
      fetchCar();
    }
  }, [modelId, navigate]);

  const handleDepositClick = () => {
    navigate(`/deposit?model=${car.model}`);
  };

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (!car) return null;

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
           <button className={styles.cta_button} onClick={handleDepositClick}>ĐẶT CỌC NGAY</button>
         </div>
      </div>

      {/* Bài viết mô tả Rendered HTML */}
      <div className={styles.content_container}>
         <div 
           className={styles.article_content}
           dangerouslySetInnerHTML={{ 
             __html: car.articleContent || "<h2 style='text-align: center'>Nội dung chi tiết đang được cập nhật...</h2>" 
           }}
         />
      </div>

      <Footer />
    </div>
  );
};

export default CarLanding;
