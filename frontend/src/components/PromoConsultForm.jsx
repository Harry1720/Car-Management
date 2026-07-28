import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { consultationService } from "../services/consultationService";

const modelOptions = ["VF Wild", "VF 9", "VF 8", "VF 7", "VF 6", "VF 5"];

const createInitialForm = (
  defaultModel,
  interestNote,
  defaultPromotionInterest,
) => ({
  fullName: "",
  phone: "",
  model: defaultModel || "VF 8",
  notes: interestNote || "",
  promotionInterest: defaultPromotionInterest || "",
});

const PromoConsultForm = ({
  open,
  promoTitle,
  interestNote,
  defaultModel,
  defaultPromotionInterest,
  promotionOptions = [],
  showPromotionSelect = false,
  showNotes = true,
  variant = "modal",
  submitLabel = "GỬI ĐĂNG KÝ TƯ VẤN",
  sectionNote,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(
    createInitialForm(defaultModel, interestNote, defaultPromotionInterest),
  );

  useEffect(() => {
    if (open) {
      setFormData(
        createInitialForm(defaultModel, interestNote, defaultPromotionInterest),
      );
    }
  }, [open, defaultModel, interestNote, defaultPromotionInterest]);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const noteParts = [];
      if (formData.promotionInterest) noteParts.push(formData.promotionInterest);
      if (formData.notes) noteParts.push(formData.notes);

      await consultationService.createConsultation({
        fullName: formData.fullName,
        phone: formData.phone,
        carModel: formData.model,
        requestType: 'promotion',
        note: noteParts.join(' - ')
      });

      if (onSubmit) {
        onSubmit(formData);
      }

      toast.success("Thông tin đã được ghi nhận. Đội ngũ tư vấn sẽ liên hệ sớm.");

      if (variant === "modal" && onClose) {
        onClose();
        return;
      }

      setFormData(
        createInitialForm(defaultModel, interestNote, defaultPromotionInterest),
      );
    } catch (error) {
      toast.error(error.message || "Lỗi khi gửi yêu cầu tư vấn");
    }
  };

  const content = (
    <div
      className={
        variant === "section"
          ? "promo-consult-section-card"
          : "promo-consult-modal"
      }
      onClick={(event) => event.stopPropagation()}
    >
      {variant === "modal" && (
        <button
          className="promo-consult-close"
          type="button"
          onClick={onClose}
          aria-label="Đóng form"
        >
          &times;
        </button>
      )}
      <p className="promo-consult-kicker">Đăng ký tư vấn ưu đãi</p>
      <h3>{promoTitle || ""}</h3>
      {sectionNote ? (
        <p className="promo-consult-summary">{sectionNote}</p>
      ) : null}

      <form className="promo-consult-form" onSubmit={handleSubmit}>
        <label>
          <span>Họ và tên</span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
            required
          />
        </label>

        <label>
          <span>Số điện thoại</span>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            required
          />
        </label>

        <label>
          <span>Dòng xe quan tâm</span>
          <select name="model" value={formData.model} onChange={handleChange}>
            {modelOptions.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          {/* {showPromotionSelect ? (
            <small>
              Chọn ưu đãi bạn quan tâm để Sale tư vấn đúng nội dung.
            </small>
          ) : null} */}
        </label>

        {showPromotionSelect ? (
          <label>
            <span>Quý khách quan tâm ưu đãi nào?</span>
            <select
              name="promotionInterest"
              value={formData.promotionInterest}
              onChange={handleChange}
              required
            >
              <option value="">Chọn ưu đãi quan tâm</option>
              {promotionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showNotes ? (
          <label>
            <span>Ghi chú</span>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ví dụ: Khách hàng đang đăng ký nhận ưu đãi 10% mùa cưới"
            />
          </label>
        ) : null}

        <label className="custom-checkbox-wrapper">
          <input type="checkbox" required />
          <span>
            Tôi đồng ý để đội ngũ chăm sóc khách hàng liên hệ tư vấn ưu đãi dựa trên thông tin đã cung cấp.
          </span>
        </label>

        <button className="promo-consult-submit" type="submit">
          {submitLabel}
        </button>
      </form>
    </div>
  );

  if (variant === "section") {
    return <div className="promo-consult-section">{content}</div>;
  }

  return (
    <div
      className="promo-consult-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Form đăng ký tư vấn"
      onClick={onClose}
    >
      {content}
    </div>
  );
};

export default PromoConsultForm;
