import { useEffect, useState } from "react";
import "../../assets/css/admin_pages/CarList.css";
import Navbar from "../../components/NavbarAdmin";
import Footer from "../../components/FooterAdmin";
import { carService } from "../../services/carService";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await carService.getAllCars(1, 100);
      let carsArr = Array.isArray(response)
        ? response
        : response && Array.isArray(response.cars)
          ? response.cars
          : [];
      setCars(carsArr);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]);
      setLoading(false);
    }
  };

  const handleAddVariant = (isEditing) => {
    if (isEditing) {
      setEditingCar((prev) => ({
        ...prev,
        variants: [
          ...(prev.variants || []),
          { colorName: "", colorHex: "#000000", stock: 0, images: [] },
        ],
      }));
    } else {
      setNewCar((prev) => ({
        ...prev,
        variants: [
          ...(prev.variants || []),
          { colorName: "", colorHex: "#000000", stock: 0, images: [] },
        ],
      }));
    }
  };

  const handleRemoveVariant = (index, isEditing) => {
    if (isEditing) {
      setEditingCar((prev) => {
        const newV = [...(prev.variants || [])];
        newV.splice(index, 1);
        return { ...prev, variants: newV };
      });
    } else {
      setNewCar((prev) => {
        const newV = [...(prev.variants || [])];
        newV.splice(index, 1);
        return { ...prev, variants: newV };
      });
    }
  };

  const handleVariantChange = (index, field, value, isEditing) => {
    if (isEditing) {
      setEditingCar((prev) => {
        const newV = [...(prev.variants || [])];
        newV[index] = { ...newV[index], [field]: value };
        return { ...prev, variants: newV };
      });
    } else {
      setNewCar((prev) => {
        const newV = [...(prev.variants || [])];
        newV[index] = { ...newV[index], [field]: value };
        return { ...prev, variants: newV };
      });
    }
  };

  // Custom variant image handler (URL input for simplicity now)
  const handleVariantImageChange = (index, value, isEditing) => {
    const images = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    handleVariantChange(index, "images", images, isEditing);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [newCar, setNewCar] = useState({
    model_car_id: "",
    model_car_name: "",
    price: "",
    origin_of_car: "",
    date_of_import: "",
    car_sold: "",
    variants: [],
    lauching_year: "",
    motorPower: "",
    energyConsumption: "",
    range: "",
    images: [],
  });
  const [editingCar, setEditingCar] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleDelete = async (carId) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa xe này?")) return;
    try {
      await carService.deleteCar(carId);
      await fetchCars();
      alert("Xóa xe thành công!");
    } catch (error) {
      console.error("Error deleting car:", error);
      alert(
        "Lỗi khi xóa xe: " + (error.response?.data?.message || error.message),
      );
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Chỉ được chọn tối đa 5 ảnh!");
      return;
    }
    setNewCar((prev) => ({ ...prev, images: files }));
  };

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Chỉ được chọn tối đa 5 ảnh!");
      return;
    }
    setEditingCar((prev) => ({ ...prev, newImages: files }));
  };

  const handleEdit = (carId) => {
    const carToEdit = cars.find((car) => car._id === carId);
    // Map database fields to form fields
    setEditingCar({
      ...carToEdit,
      model_car_name: carToEdit.name,
      model_car_id: carToEdit.model,
      car_number_availability: carToEdit.stock,
      lauching_year: carToEdit.year,
      // Giữ nguyên các field đã có tên giống nhau
      origin_of_car: carToEdit.origin_of_car,
      date_of_import: carToEdit.date_of_import,
      car_sold: carToEdit.car_sold,
      price: carToEdit.price,
      variants: carToEdit.variants || [],
      motorPower: carToEdit.specifications?.motorPower || "",
      range: carToEdit.specifications?.range || "",
      energyConsumption: carToEdit.specifications?.energyConsumption || "",
    });
    setShowAddForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!window.confirm("Bạn có chắc chắn muốn cập nhật thông tin xe này?"))
      return;
    try {
      const carId = editingCar._id;
      const formData = new FormData();
      formData.append("name", editingCar.model_car_name || editingCar.name);
      formData.append("model", editingCar.model_car_id || editingCar.model);
      formData.append(
        "price",
        typeof editingCar.price === "string"
          ? parseFloat(editingCar.price.toString().replace(/\./g, ""))
          : editingCar.price,
      );
      formData.append(
        "year",
        typeof editingCar.lauching_year === "string"
          ? parseInt(editingCar.lauching_year)
          : editingCar.lauching_year,
      );
      let fileIndexCount = 0;
      const processedVariants = (editingCar.variants || []).map((v) => {
        const newV = { ...v };
        if (newV.imageFile) {
          formData.append("images", newV.imageFile);
          newV.fileIndex = fileIndexCount++;
        }
        delete newV.imageFile;
        return newV;
      });
      formData.append("variants", JSON.stringify(processedVariants));
      formData.append("origin_of_car", editingCar.origin_of_car || "");
      formData.append("date_of_import", editingCar.date_of_import || "");

      // Thêm specifications
      if (
        editingCar.motorPower ||
        editingCar.energyConsumption ||
        editingCar.range
      ) {
        formData.append(
          "specifications",
          JSON.stringify({
            motorPower: editingCar.motorPower,
            energyConsumption: editingCar.energyConsumption,
            range: editingCar.range,
          }),
        );
      }

      // Ảnh mới xử lý riêng hoặc upload ngoài, tạm bỏ qua (hoặc dùng URL trong variants)

      await carService.updateCar(carId, formData);
      await fetchCars();
      setEditingCar(null);
      alert("Cập nhật xe thành công!");
    } catch (error) {
      console.error("Error updating car:", error);
      alert(
        "Lỗi khi cập nhật xe: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!window.confirm("Bạn có chắc chắn muốn thêm xe mới này?")) return;

    // Validate all required fields - properly check strings and numbers
    const hasErrors =
      !newCar.model_car_name?.toString().trim() ||
      !newCar.model_car_id?.toString().trim() ||
      !newCar.price?.toString().trim() ||
      !newCar.origin_of_car?.toString().trim() ||
      !newCar.date_of_import?.toString().trim() ||
      !newCar.lauching_year?.toString().trim();

    console.log("=== DEBUG: handleCreate ===");
    console.log("newCar state:", newCar);
    console.log("hasErrors:", hasErrors);

    if (hasErrors) {
      alert(
        "Vui lòng điền đầy đủ tất cả các trường!\n\nBắt buộc:\n- Mã xe\n- Tên xe\n- Giá tiền\n- Nguồn gốc\n- Ngày nhập\n- Năm ra mắt",
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newCar.model_car_name);
      formData.append("model", newCar.model_car_id);
      formData.append(
        "price",
        parseFloat(newCar.price.toString().replace(/\./g, "")) || 0,
      );
      formData.append(
        "year",
        parseInt(newCar.lauching_year) || new Date().getFullYear(),
      );
      let fileIndexCount = 0;
      const processedVariants = (newCar.variants || []).map((v) => {
        const newV = { ...v };
        if (newV.imageFile) {
          formData.append("images", newV.imageFile);
          newV.fileIndex = fileIndexCount++;
        }
        delete newV.imageFile;
        return newV;
      });
      formData.append("variants", JSON.stringify(processedVariants));
      formData.append("origin_of_car", newCar.origin_of_car);
      formData.append("date_of_import", newCar.date_of_import);

      // Thêm specifications
      if (newCar.motorPower || newCar.energyConsumption || newCar.range) {
        formData.append(
          "specifications",
          JSON.stringify({
            motorPower: newCar.motorPower,
            energyConsumption: newCar.energyConsumption,
            range: newCar.range,
          }),
        );
      }

      // Ảnh nằm trong variants (Base64 hoặc URL)

      console.log("FormData being sent to API");

      const response = await carService.createCar(formData);

      console.log("API response:", response);

      await fetchCars();
      setNewCar({
        model_car_id: "",
        model_car_name: "",
        price: "",
        origin_of_car: "",
        date_of_import: "",
        car_sold: "",
        variants: [],
        lauching_year: "",
        motorPower: "",
        energyConsumption: "",
        range: "",
        images: [],
      });
      setShowAddForm(false);
      alert("Thêm xe thành công!");
    } catch (error) {
      console.error("Error creating car:", error);
      console.error("Error response:", error.response?.data);
      alert(
        "Lỗi khi thêm xe: " + (error.response?.data?.message || error.message),
      );
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewCar((prev) => ({
      ...prev,
      [id.replace("new-", "")]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditingCar((prev) => ({
      ...prev,
      [id.replace("edit-", "")]: value,
    }));
  };

  useEffect(() => {
    document.title = "Danh sách xe | VinFast";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowAddForm(false);
        setEditingCar(null);
        setPreviewImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Navbar />
      <div className="car-list-page">
        <div className="page-header-block">
          <span className="page-overline">CAR MANAGEMENT</span>
          <h1 className="page-main-title">DANH SÁCH XE</h1>
          <p className="page-subtitle">
            Quản lý thêm mới, chỉnh sửa thông tin xe và hình ảnh.
          </p>
        </div>

        {/* Search and Add button row */}
        <div className="row" id="add-row-form3">
          <div className="col">
            <input
              type="text"
              id="id-search"
              placeholder="Tìm kiếm theo mã xe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingCar(null); // Close edit form when adding
              }}
            >
              {showAddForm ? (
                <>
                  <ion-icon name="close-outline"></ion-icon> Hủy thêm
                </>
              ) : (
                <>
                  <ion-icon name="add-outline"></ion-icon> Thêm xe mới
                </>
              )}
            </button>
          </div>
        </div>

        {/* Add new car form */}
        {showAddForm && (
          <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
            <div
              className="modal-content wide-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="modal-close-btn"
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
              <h3 className="modal-title">Thêm xe mới</h3>
              <form onSubmit={handleCreate}>
                <div className="modal-form-layout">
                  {/* Cột Trái: Thông tin chung */}
                  <div className="modal-form-col-left">
                    <div className="form-row">
                      <div className="form-col">
                        <label>Mã xe</label>
                        <input
                          type="text"
                          id="new-model_car_id"
                          value={newCar.model_car_id || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-col">
                        <label>Tên xe</label>
                        <input
                          type="text"
                          id="new-model_car_name"
                          value={newCar.model_car_name || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-col">
                        <label>Giá tiền</label>
                        <input
                          type="text"
                          id="new-price"
                          value={newCar.price || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-col">
                        <label>Nguồn gốc</label>
                        <input
                          type="text"
                          id="new-origin_of_car"
                          value={newCar.origin_of_car || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-col">
                        <label>Ngày nhập</label>
                        <input
                          type="date"
                          id="new-date_of_import"
                          value={newCar.date_of_import || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-col">
                        <label>Năm ra mắt</label>
                        <input
                          type="text"
                          id="new-lauching_year"
                          value={newCar.lauching_year || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-col">
                        <label>Công suất động cơ (motorPower)</label>
                        <input
                          type="text"
                          id="new-motorPower"
                          value={newCar.motorPower || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-col">
                        <label>Quãng đường (km)</label>
                        <input
                          type="text"
                          id="new-range"
                          value={newCar.range || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-col">
                        <label>
                          Mức tiêu thụ điện năng (energyConsumption)
                        </label>
                        <input
                          type="text"
                          id="new-energyConsumption"
                          value={newCar.energyConsumption || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cột Phải: Variants */}
                  <div className="modal-form-col-right">
                    <div className="form-row">
                      <div className="form-col full-width">
                        <div className="variant-header">
                          <label className="variant-group-label">
                            Màu sắc và hình ảnh
                          </label>
                          <button
                            type="button"
                            onClick={() => handleAddVariant(false)}
                            className="add-variant-btn"
                          >
                            +
                          </button>
                        </div>
                        {(newCar.variants || []).map((v, i) => (
                          <div key={i} className="variant-item">
                            <div className="variant-row">
                              <div className="variant-col-name">
                                <label className="variant-label">Tên màu</label>
                                <input
                                  type="text"
                                  placeholder="VD: Xanh"
                                  value={v.colorName || ""}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "colorName",
                                      e.target.value,
                                      false,
                                    )
                                  }
                                  required
                                />
                              </div>
                              <div className="variant-col-color">
                                <label className="variant-label">Mã màu</label>
                                <input
                                  type="color"
                                  value={v.colorHex || "#000000"}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "colorHex",
                                      e.target.value,
                                      false,
                                    )
                                  }
                                  className="variant-color-input"
                                  required
                                />
                              </div>
                              <div className="variant-col-number">
                                <label className="variant-label">Nhập</label>
                                <input
                                  type="number"
                                  placeholder="Tồn kho"
                                  value={v.stock || 0}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "stock",
                                      parseInt(e.target.value) || 0,
                                      false,
                                    )
                                  }
                                  required
                                />
                              </div>
                              <div className="variant-col-number">
                                <label className="variant-label">Đã bán</label>
                                <input
                                  type="number"
                                  placeholder="Đã bán"
                                  value={v.sold || 0}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "sold",
                                      parseInt(e.target.value) || 0,
                                      false,
                                    )
                                  }
                                  required
                                />
                              </div>
                              <div className="variant-col-action">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveVariant(i, false)}
                                  className="remove-variant-btn variant-action-btn"
                                  title="Xóa"
                                >
                                  <ion-icon name="trash-outline"></ion-icon>
                                </button>
                              </div>
                            </div>
                            <div className="variant-image-row">
                              <label className="file-upload-label variant-upload-inline">
                                <ion-icon name="image-outline"></ion-icon> Chọn
                                ảnh
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "imageFile",
                                      e.target.files[0],
                                      false,
                                    )
                                  }
                                  className="hidden-file-input"
                                />
                              </label>
                              <span className="file-name-display">
                                {v.imageFile
                                  ? v.imageFile.name
                                  : "Chưa chọn tệp nào"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions form-actions-right">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowAddForm(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn-save">
                    Thêm mới
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit car form */}
        {editingCar && (
          <div className="modal-overlay" onClick={() => setEditingCar(null)}>
            <div
              className="modal-content wide-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setEditingCar(null)}
                className="modal-close-btn"
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
              <h3 className="modal-title">Chỉnh sửa thông tin xe</h3>
              <form onSubmit={handleUpdate}>
                <div className="modal-form-layout">
                  {/* Cột Trái: Thông tin chung */}
                  <div className="modal-form-col-left">
                    <div className="form-row">
                      <div className="form-col">
                        <label>Mã xe</label>
                        <input
                          type="text"
                          name="model_car_id"
                          value={
                            editingCar.model_car_id || editingCar.model || ""
                          }
                          onChange={(e) =>
                            setEditingCar({
                              ...editingCar,
                              model_car_id: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-col">
                        <label>Tên xe</label>
                        <input
                          type="text"
                          name="model_car_name"
                          value={
                            editingCar.model_car_name || editingCar.name || ""
                          }
                          onChange={(e) =>
                            setEditingCar({
                              ...editingCar,
                              model_car_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-col">
                        <label>Giá tiền</label>
                        <input
                          type="text"
                          name="price"
                          value={editingCar.price || ""}
                          onChange={(e) =>
                            setEditingCar({
                              ...editingCar,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-col">
                        <label>Nguồn gốc</label>
                        <input
                          type="text"
                          name="origin_of_car"
                          value={editingCar.origin_of_car || ""}
                          onChange={(e) =>
                            setEditingCar({
                              ...editingCar,
                              origin_of_car: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-col">
                        <label>Ngày nhập</label>
                        <input
                          type="date"
                          name="date_of_import"
                          value={editingCar.date_of_import || ""}
                          onChange={(e) =>
                            setEditingCar({
                              ...editingCar,
                              date_of_import: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-col">
                        <label>Năm ra mắt</label>
                        <input
                          type="text"
                          name="lauching_year"
                          value={editingCar.lauching_year || ""}
                          onChange={(e) =>
                            setEditingCar({
                              ...editingCar,
                              lauching_year: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-col">
                        <label>Công suất động cơ (motorPower)</label>
                        <input
                          type="text"
                          name="motorPower"
                          value={editingCar.motorPower || ""}
                          onChange={(e) =>
                            setEditingCar({
                              ...editingCar,
                              motorPower: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-col">
                        <label>Quãng đường (km)</label>
                        <input
                          type="text"
                          name="range"
                          value={editingCar.range || ""}
                          onChange={(e) =>
                            setEditingCar({
                              ...editingCar,
                              range: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-col">
                        <label>
                          Mức tiêu thụ điện năng (energyConsumption)
                        </label>
                        <input
                          type="text"
                          name="energyConsumption"
                          value={editingCar.energyConsumption || ""}
                          onChange={(e) =>
                            setEditingCar({
                              ...editingCar,
                              energyConsumption: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cột Phải: Variants */}
                  <div className="modal-form-col-right">
                    <div className="form-row">
                      <div className="form-col full-width">
                        <div className="variant-header">
                          <label className="variant-group-label">
                            Màu sắc và hình ảnh
                          </label>
                          <button
                            type="button"
                            onClick={() => handleAddVariant(true)}
                            className="add-variant-btn"
                          >
                            +
                          </button>
                        </div>
                        {(editingCar.variants || []).map((v, i) => (
                          <div key={i} className="variant-item">
                            <div className="variant-row">
                              <div className="variant-col-name">
                                <label className="variant-label">Tên màu</label>
                                <input
                                  type="text"
                                  placeholder="VD: Xanh"
                                  value={v.colorName || ""}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "colorName",
                                      e.target.value,
                                      true,
                                    )
                                  }
                                  required
                                />
                              </div>
                              <div className="variant-col-color">
                                <label className="variant-label">Mã màu</label>
                                <input
                                  type="color"
                                  value={v.colorHex || "#000000"}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "colorHex",
                                      e.target.value,
                                      true,
                                    )
                                  }
                                  className="variant-color-input"
                                  required
                                />
                              </div>
                              <div className="variant-col-number">
                                <label className="variant-label">Nhập</label>
                                <input
                                  type="number"
                                  placeholder="Tồn kho"
                                  value={v.stock !== undefined ? v.stock : 0}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "stock",
                                      parseInt(e.target.value) || 0,
                                      true,
                                    )
                                  }
                                  required
                                />
                              </div>
                              <div className="variant-col-number">
                                <label className="variant-label">Đã bán</label>
                                <input
                                  type="number"
                                  placeholder="Đã bán"
                                  value={v.sold !== undefined ? v.sold : 0}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "sold",
                                      parseInt(e.target.value) || 0,
                                      true,
                                    )
                                  }
                                  required
                                />
                              </div>
                              <div className="variant-col-action">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveVariant(i, true)}
                                  className="remove-variant-btn variant-action-btn"
                                  title="Xóa"
                                >
                                  <ion-icon name="trash-outline"></ion-icon>
                                </button>
                              </div>
                            </div>
                            <div className="variant-image-row">
                              <label className="file-upload-label variant-upload-inline">
                                <ion-icon name="image-outline"></ion-icon> Chọn
                                ảnh
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleVariantChange(
                                      i,
                                      "imageFile",
                                      e.target.files[0],
                                      true,
                                    )
                                  }
                                  className="hidden-file-input"
                                />
                              </label>
                              <span className="file-name-display">
                                {v.imageFile
                                  ? v.imageFile.name
                                  : "Chưa chọn tệp nào"}
                              </span>
                            </div>
                            {v.image && !v.imageFile && (
                              <div className="current-image-display">
                                <span className="current-image-label">
                                  Ảnh hiện tại:
                                </span>
                                <img
                                  src={v.image}
                                  alt="variant"
                                  className="variant-image-item"
                                  onClick={() => setPreviewImage(v.image)}
                                  title="Nhấp để xem lớn"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions form-actions-right">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setEditingCar(null)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn-save">
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="table-wrapper">
          <table className="table table-hover table-sortable table-bordered">
            <thead>
              <tr>
                <th>Mã xe</th>
                <th>Tên xe</th>
                <th>Giá tiền</th>
                <th>Màu sắc (Variants)</th>
                <th>Nguồn gốc</th>
                <th>Ngày nhập</th>
                <th>Tổng xe nhập</th>
                <th>Số đã bán</th>
                <th>Năm ra mắt</th>
                <th>Công suất</th>
                <th>Mức tiêu thụ</th>
                <th>Quãng đường</th>
                <th colSpan="2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="17" className="text-center">
                    Đang tải...
                  </td>
                </tr>
              ) : cars.length === 0 ? (
                <tr>
                  <td colSpan="17" className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                cars
                  .filter((car) =>
                    (car.model_car_id || car.model || "")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  )
                  .map((car) => (
                    <tr key={car._id || car.model_car_id || car.model}>
                      <td>{car.model_car_id || car.model}</td>
                      <td>{car.model_car_name || car.name}</td>
                      <td>{car.price}</td>
                      <td>
                        <div className="action-buttons-wrapper">
                          {(car.variants || []).map((v, i) => (
                            <div
                              key={i}
                              title={`${v.colorName} - Nhập: ${v.stock} / Đã bán: ${v.sold || 0}`}
                              className="variant-color-circle"
                              style={{ backgroundColor: v.colorHex }}
                            ></div>
                          ))}
                        </div>
                      </td>
                      <td>{car.origin_of_car || ""}</td>
                      <td>
                        {car.date_of_import
                          ? new Date(car.date_of_import).toLocaleDateString(
                              "vi-VN",
                            )
                          : ""}
                      </td>
                      <td>
                        {(car.variants || []).reduce(
                          (sum, v) => sum + (v.stock || 0),
                          0,
                        )}
                      </td>
                      <td>
                        {(car.variants || []).reduce(
                          (sum, v) => sum + (v.sold || 0),
                          0,
                        )}
                      </td>
                      <td>{car.lauching_year || car.year}</td>
                      <td>{car.specifications?.motorPower || "N/A"}</td>
                      <td>{car.specifications?.energyConsumption || "N/A"}</td>
                      <td>{car.specifications?.range || "N/A"}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(car._id)}
                          title="Xóa"
                        >
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(car._id)}
                          title="Sửa"
                        >
                          <ion-icon name="create-outline"></ion-icon>
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="modal-overlay toast-container-custom"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="modal-content image-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="preview-close-btn"
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="preview-image-content"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CarList;
