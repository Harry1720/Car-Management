import styles from '../../assets/css/user_pages/Home.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect } from "react";
const Home = () => {
    useEffect(() => {
        document.title = "Trang chủ | VinFast";
    }, []);
  return (  
    <div className={styles.home_page}>
    <Navbar activePage="home" />
    {/* tương đương với <React.Fragment> */}
      <ul className={styles.pages}>
        <li className={`${styles.card} ${styles["card-large"]}`}>            
          <video className = {styles.videoHome} muted autoPlay loop playsInline>
            <source src="/videos/vfwildci.mp4" type="video/mp4"/> 
          </video>
          <div className={`${styles["page-info"]} ${styles["model-x"]}`}> 
            <h1 className = {styles.heading1_home}>VF Wild</h1>
            <h4 className = {styles.heading4_home}>Giá chỉ từ $49999</h4>
          </div>
          <div className={styles["page-footer"]}>
            <div className={styles.buttons}>
              <a style={{textDecoration: 'none', color: 'inherit'}} href="/deposit?model=vfwild"><button>
                Mua ngay
              </button></a>
            </div>
          </div>
        </li>

        <li className={styles.card}>
          <video className = {styles.videoHome} muted autoPlay loop>
            <source src="/videos/vf9ci.mp4" type="video/mp4"/> 
          </video>
          <div className={`${styles["page-info"]} ${styles["model-x"]}`}>
            <h1 className = {styles.heading1_home}>VF 9</h1>
            <h4 className = {styles.heading4_home}>Giá chỉ từ $79999</h4>
          </div>
          <div className={styles["page-footer"]}>
            <div className={styles.buttons}>
              <a style={{textDecoration: 'none', color: 'inherit'}} href="/deposit?model=vf9"><button>
                Mua ngay
              </button></a>
            </div>
          </div>
        </li>

        <li className={styles.card}>
          <video className = {styles.videoHome} muted autoPlay loop>
            <source src="/videos/vf8ci.mp4" type="video/mp4"/> 
          </video>
          <div className={`${styles["page-info"]} ${styles["model-x"]}`}>
            <h1 className = {styles.heading1_home}>VF 8</h1>
            <h4 className = {styles.heading4_home}>Giá chỉ từ $39999</h4>
          </div>
          <div className={styles["page-footer"]}>
            <div className={styles.buttons}>
                <a style={{textDecoration: 'none', color: 'inherit'}} href="/deposit?model=vf8"><button>Mua ngay</button></a>
            </div>
          </div>
        </li>

        <li className={styles.card}>
          <video className = {styles.videoHome} muted autoPlay loop>
            <source src="/videos/vf7ci.mp4" type="video/mp4"/> 
          </video>
          <div className={`${styles["page-info"]} ${styles["model-x"]}`}>
            <h1 className = {styles.heading1_home}>VF 7</h1>
            <h4 className = {styles.heading4_home}>Giá chỉ từ $29999</h4>
          </div>
          <div className={styles["page-footer"]}>
            <div className={styles.buttons}>  
                <a style={{textDecoration: 'none', color: 'inherit'}} href="/deposit?model=vf7"><button>Mua ngay</button></a>
            </div>
          </div>
        </li>

        <li className={styles.card}>
          <video className = {styles.videoHome} muted loop autoPlay>
            <source src="/videos/vinfastouttro.mp4" type="video/mp4"/> 
          </video>
          <div className={styles["page-info"]}>
            <h1 className = {styles.heading1_home}>Tìm hiểu thêm</h1>
            <h4 className = {styles.heading4_home}>Khám phá các dòng xe</h4>
          </div>
          <div className={styles["page-footer"]}>
            <div className={`${styles.buttons} ${styles["demo-drive"]}`}>
                <a style={{textDecoration: 'none', color: 'inherit'}} href="/products"><button>Mua ngay</button></a>
            </div>
          </div>
        </li>
      </ul>

    <Footer/>
    </div>
    // </React.Fragment>
    //Trong React, một component phải trả về một phần tử JSX duy nhất. Nếu bạn muốn trả về nhiều thẻ <div>, <h1 className = {styles.heading1_home}>,... thì bạn phải bọc chúng trong một phần tử cha.
  );
};

export default Home;