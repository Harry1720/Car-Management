import React, { useState, useEffect } from "react";
import "../assets/css/components/slideshow.css";
import PromoConsultForm from "./PromoConsultForm";

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [manualChange, setManualChange] = useState(false);
  const [consultPromo, setConsultPromo] = useState(null);

  const showSlides = () => {
    setSlideIndex((prev) => {
      const nextIndex = prev + 1 > 2 ? 0 : prev + 1;
      return nextIndex;
    });
  };

  useEffect(() => {
    let autoSlideInterval;
    if (!manualChange) {
      autoSlideInterval = setTimeout(showSlides, 3000);
    }
    setManualChange(false);
    return () => clearTimeout(autoSlideInterval);
  }, [slideIndex, manualChange]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal("modal1");
        closeModal("modal2");
        closeModal("modal3");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const plusSlides = (n) => {
    setManualChange(true);
    setSlideIndex((prev) => {
      let newIndex = prev + (n === 0 ? 1 : -1);
      if (newIndex > 2) newIndex = 0;
      if (newIndex < 0) newIndex = 2;
      return newIndex;
    });
  };

  const currentSlide = (n) => {
    setManualChange(true);
    setSlideIndex(n - 1);
  };

  const handleRegisterPromo = (promoData, modalId) => {
    closeModal(modalId);
    setConsultPromo(promoData);
  };

  const openModal = (modalId) => {
    document.getElementById(modalId).style.display = "block";
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId).style.display = "none";
  };

  const handleModalClick = (event) => {
    if (event.target.classList.contains("slideshow-modal")) {
      event.target.style.display = "none";
    }
  };

  return (
    <div className="slideshow-container">
      <div
        className="mySlides"
        style={{ display: slideIndex === 0 ? "block" : "none" }}
      >
        <img
          src="/images/banner/banner_st.png"
          className="slideshow-img-width"
          onClick={() => openModal("modal1")}
          alt="Slide 1"
        />
      </div>
      <div
        className="mySlides"
        style={{ display: slideIndex === 1 ? "block" : "none" }}
      >
        <img
          src="/images/banner/banner_bp.png"
          className="slideshow-img-width"
          onClick={() => openModal("modal2")}
          alt="Slide 2"
        />
      </div>
      <div
        className="mySlides"
        style={{ display: slideIndex === 2 ? "block" : "none" }}
      >
        <img
          src="/images/banner/banner_wedding.png"
          className="slideshow-img-width"
          onClick={() => openModal("modal3")}
          alt="Slide 3"
        />
      </div>

      <a
        className="prev slideshow-nav-btn"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          plusSlides(1);
        }}
      >
        &#10094;
      </a>
      <a
        className="next slideshow-nav-btn"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          plusSlides(0);
        }}
      >
        &#10095;
      </a>

      <div className="slideshow-dots-container">
        <span
          className={`dot ${slideIndex === 0 ? "dot_active" : ""}`}
          onClick={() => currentSlide(1)}
        ></span>
        <span
          className={`dot ${slideIndex === 1 ? "dot_active" : ""}`}
          onClick={() => currentSlide(2)}
        ></span>
        <span
          className={`dot ${slideIndex === 2 ? "dot_active" : ""}`}
          onClick={() => currentSlide(3)}
        ></span>
      </div>

      <div id="modal1" className="slideshow-modal" onClick={handleModalClick}>
        <div className="slideshow-modal__content">
          <span className="slideshow-modal__close" onClick={() => closeModal("modal1")}>
            &times;
          </span>
          <h2 className="slideshow-modal__title">Nhận ngay 01 vé VIP Sky Tour</h2>
          <ul className="slideshow-modal__list">
            <li>
              <span>01 vé VIP</span> xem Sky Tour dành cho khách đặt cọc xe{" "}
              <strong>VinFast VF Wild</strong>.
            </li>
            <li>
              <strong>Áp dụng đến 30/06/2026</strong> hoặc đến khi hết suất.
            </li>
          </ul>
          <button
            className="slideshow-modal__cta"
            type="button"
            onClick={() =>
              handleRegisterPromo(
                {
                  title: "Tư vấn ưu đãi Sky Tour",
                  interestNote: "Quan tâm ưu đãi 01 vé VIP Sky Tour",
                  defaultModel: "VF Wild",
                },
                "modal1",
              )
            }
          >
            ĐĂNG KÝ NHẬN ƯU ĐÃI
          </button>
        </div>
      </div>
      <div id="modal2" className="slideshow-modal" onClick={handleModalClick}>
        <div className="slideshow-modal__content">
          <span className="slideshow-modal__close" onClick={() => closeModal("modal2")}>
            &times;
          </span>
          <h2 className="slideshow-modal__title">Nhận ngay 01 cặp vé concert PINK BORN</h2>
          <ul className="slideshow-modal__list">
            <li>
              <span>01 cặp vé</span> PINK BORN dành cho{" "}
              <strong>20 khách hàng đầu tiên</strong> mua xe.
            </li>
            <li>
              <strong>Ưu tiên khách mua sớm</strong>, áp dụng đến khi hết vé.
            </li>
          </ul>
          <button
            className="slideshow-modal__cta"
            type="button"
            onClick={() =>
              handleRegisterPromo(
                {
                  title: "Tư vấn ưu đãi PINK BORN",
                  interestNote: "Quan tâm ưu đãi concert PINK BORN",
                  defaultModel: "VF 8",
                },
                "modal2",
              )
            }
          >
            TƯ VẤN NGAY
          </button>
        </div>
      </div>
      <div id="modal3" className="slideshow-modal" onClick={handleModalClick}>
        <div className="slideshow-modal__content">
          <span className="slideshow-modal__close" onClick={() => closeModal("modal3")}>
            &times;
          </span>
          <h2 className="slideshow-modal__title">Giảm ngay 10% tiền phí trước bạ</h2>
          <ul className="slideshow-modal__list">
            <li>
              <strong>Tặng ngay 10% lệ phí trước bạ</strong> khi nhận xe tại đại
              lý.
            </li>
            <li>
              <strong>Áp dụng cho các cặp đôi</strong> có Giấy chứng nhận kết
              hôn cấp trong năm 2026.
            </li>
            <li>
              <strong>Chương trình đến hết ngày 31/12/2026</strong>, mỗi gia
              đình tham gia 01 lần.
            </li>
          </ul>
          <button
            className="slideshow-modal__cta"
            type="button"
            onClick={() =>
              handleRegisterPromo(
                {
                  title: "Đăng ký ưu đãi mùa cưới",
                  interestNote: "Quan tâm về đăng ký nhận ưu đãi 10% mùa cưới",
                  defaultModel: "VF 7",
                },
                "modal3",
              )
            }
          >
            ĐĂNG KÝ NHẬN ƯU ĐÃI
          </button>
        </div>
      </div>

      <PromoConsultForm
        open={Boolean(consultPromo)}
        promoTitle={consultPromo?.title || ""}
        interestNote={consultPromo?.interestNote || ""}
        defaultModel={consultPromo?.defaultModel || "VF 8"}
        onClose={() => setConsultPromo(null)}
        onSubmit={() => setConsultPromo(null)}
      />
    </div>
  );
};

export default Slideshow;
