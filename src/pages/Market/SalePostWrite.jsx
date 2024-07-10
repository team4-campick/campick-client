import style from "../../css/Market/SalePostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import {
  PRODUCT_CATEGORY,
  REGION,
  PRODUCT_CONDITION_OPTIONS,
  SALE_STATUS,
} from "../../constants/market";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { checkMarketPostData } from "../../utils/validation";

const SalePostWrite = () => {
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);
  const MAX_IMAGES = 5;
  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length + imageFiles.length > MAX_IMAGES) {
      return alert("사진은 5장까지만 첨부할 수 있습니다.");
    }

    const newFiles = [...imageFiles, ...files];

    setImageFiles(newFiles);

    const filePreviews = newFiles.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePreviews).then((previews) => setImagePreviews(previews));
  };

  const handleImageDelete = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // useDropdown 훅을 통해 드롭다운 컴포넌트 및 선택값을 필요한 값(카테고리, 지역 등)에 따라 분리하여 관리
  const { selectLabel: saleStatus, Dropdown: StatusDropdown } = useDropdown({
    options: SALE_STATUS,
    type: "판매중",
  });
  const { selectedLabel: category, Dropdown: CategoryDropdown } = useDropdown({
    options: PRODUCT_CATEGORY,
    type: "종류",
  });
  const { selectedLabel: region, Dropdown: RegionDropdown } = useDropdown({
    options: REGION,
    type: "도",
  });
  const { selectedLabel: city, Dropdown: CityDropdown } = useDropdown({
    options: REGION.find((option) => option.label === region)?.cities || [],
    type: "시",
  });

  const [productName, setProductName] = useState("");
  const handleProductName = (event) => {
    setProductName(event.target.value);
  };

  const [condition, setCondition] = useState(
    PRODUCT_CONDITION_OPTIONS[0].label
  );
  const handleCondition = (event) => {
    setCondition(event.target.value);
  };

  const [isNegotiable, setIsNegotiable] = useState(false);
  const handleIsNegotiable = (event) => {
    setIsNegotiable(event.target.checked);
  };

  const [price, setPrice] = useState("");
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const [desc, setDesc] = useState("");
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  const handleSubmitPost = async () => {
    const newPost = {
      category,
      productName,
      region,
      city,
      price,
      desc,
      condition,
      isNegotiable,
      saleStatus,
    };

    const isCompleted = checkMarketPostData(newPost);
    if (!isCompleted || !imageFiles)
      return alert("필수 입력 항목을 확인해주세요.");

    setIsLoading(true);

    const formData = new FormData();
    formData.append("newPost", JSON.stringify(newPost));
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/sale-posts`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const res = await response.json();
      if (!res.result) {
        return alert(res.message);
      }

      alert("게시물 생성에 성공했습니다.");
      navigate(`/sale-post-detail/${res.salePost._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`mw ${style.writeCon}`}>
      <h2 hidden>SalePostWrite</h2>
      <div>
        <ul>
          <li>
            <span>상품 사진</span>
            <input
              type="file"
              id="file"
              className={style.imgInput}
              multiple
              accept="image/*"
              onChange={handleFileChange}
              disabled={imageFiles.length >= MAX_IMAGES}
            />
            <label className={style.uploadBtn} htmlFor="file">
              <div>
                <i className="fa-solid fa-camera"></i>
              </div>
            </label>
            <div className={style.imgPreview}>
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`미리보기 ${index + 1}`}
                  onClick={() => handleImageDelete(index)}
                />
              ))}
            </div>
          </li>
          <li>
            <span>상품 종류</span>
            <CategoryDropdown />
          </li>
          <li>
            <span>상품 이름</span>
            <input
              type="text"
              placeholder="상품 이름을 입력해주세요."
              value={productName}
              onChange={handleProductName}
            />
          </li>
          <li>
            <span>거래 지역</span>
            <div className={style.selectRegion}>
              <RegionDropdown />
              <CityDropdown />
            </div>
          </li>
          <li>
            <span>상품 상태</span>

            {PRODUCT_CONDITION_OPTIONS.map((option, idx) => {
              const { value, label } = option;
              return (
                <React.Fragment key={value}>
                  <label className={style.productCondition}>
                    <input
                      type="radio"
                      id={label}
                      name="condition"
                      value={label}
                      onChange={handleCondition}
                      checked={condition === label}
                    />
                    {label}
                  </label>
                </React.Fragment>
              );
            })}
          </li>
          <li>
            <span>판매 가격</span>
            <div>
              <input
                type="text"
                placeholder="가격을 입력해주세요."
                value={price}
                onChange={handlePrice}
              />
              원
            </div>
            <div className={style.priceNegotiable}>
              <label>
                <input
                  type="checkbox"
                  id="negotiablePrice"
                  name="negotiablePrice"
                  onChange={handleIsNegotiable}
                  checked={isNegotiable}
                />
                가격협의가능
              </label>
            </div>
          </li>
          <li>
            <span>상품 설명</span>
            <textarea
              name=""
              id=""
              value={desc}
              onChange={handleDesc}
              className={style.productDesc}
              rows="15"
              placeholder="사용 기간 및 제조사/브랜드 이름과 함께 상품에 대한 자세한 설명을 작성해주세요. "
            ></textarea>
          </li>
        </ul>

        <div className="submitButtonWrap">
          <div
            onClick={() => {
              navigate(`/market`);
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </div>

          <button
            className="submitButton"
            type="button"
            onClick={handleSubmitPost}
            disabled={isLoading}
          >
            {isLoading ? "등록 중" : "등록하기"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SalePostWrite;
