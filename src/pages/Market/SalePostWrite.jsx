import style from '../../css/Market/SalePostWrite.module.css';
import useDropdown from '../../hooks/useDropdown';
import {
  PRODUCT_CATEGORY,
  REGION,
  PRODUCT_CONDITION_OPTIONS,
} from '../../constants/market';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const SalePostWrite = () => {
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);
  const MAX_IMAGES = 5;
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.slice(0, MAX_IMAGES - imagePreviews.length);

    setImageFiles((prev) => [...prev, ...newFiles]);

    const filePreviews = newFiles.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePreviews).then((previews) =>
      setImagePreviews((prev) => [...prev, ...previews])
    );
  };
  const handleImageDelete = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // useDropdown 훅을 통해 드롭다운 컴포넌트 및 선택값을 필요한 값(카테고리, 지역 등)에 따라 분리하여 관리
  const { selectedLabel: category, Dropdown: CategoryDropdown } = useDropdown({
    options: PRODUCT_CATEGORY,
    type: '종류',
  });
  const { selectedLabel: region, Dropdown: RegionDropdown } = useDropdown({
    options: REGION,
    type: '도',
  });
  const { selectedLabel: city, Dropdown: CityDropdown } = useDropdown({
    options: REGION.find((option) => option.label === region)?.cities || [],
    type: '시',
  });

  const [productName, setProductName] = useState('');
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

  const [price, setPrice] = useState('');
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const [desc, setDesc] = useState('여기서부터 추가로 입력하세요');
  const hadleDesc = (event) => {
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
    };

    const formData = new FormData();
    formData.append('newPost', JSON.stringify(newPost));
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('http://localhost:8000/api/sale-posts', {
        method: 'POST',
        body: formData,
      });

      const res = await response.json();
      if (!res.result) {
        return alert(res.message);
      }

      alert('게시물 생성에 성공했습니다.');
      navigate('/market');
    } catch (error) {
      console.log(error);
    }
  };
  console.log(condition);

  return (
    <section className={style.writeCon}>
      <h2 hidden>SalePostWrite</h2>
      <div>
        <ul>
          <li>
            <span>상품이미지</span>
            <input
              type="file"
              id="file"
              className={style.imgInput}
              multiple
              accept="image/*"
              onChange={handleFileChange}
              disabled={imagePreviews.length >= MAX_IMAGES}
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
            <span>상품종류</span>
            <CategoryDropdown />
          </li>
          <li>
            <span>상품명</span>
            <input
              type="text"
              placeholder="상품명을 입력해주세요."
              value={productName}
              onChange={handleProductName}
            />
          </li>
          <li>
            <span>지역</span>
            <div className={style.selectRegion}>
              <RegionDropdown />
              <CityDropdown />
            </div>
          </li>
          <li>
            <span>상품상태</span>

            {PRODUCT_CONDITION_OPTIONS.map((option, idx) => {
              const { value, label } = option;
              return (
                <React.Fragment key={value}>
                  <label>
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
            <span>가격</span>
            <input
              type="text"
              placeholder="가격을 입력해 주세요."
              value={price}
              onChange={handlePrice}
            />
            원
            <div>
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
            설명
            <textarea
              name=""
              id=""
              value={desc}
              onChange={hadleDesc}
            ></textarea>
          </li>
        </ul>
        <button onClick={handleSubmitPost}>등록하기</button>
      </div>
    </section>
  );
};

export default SalePostWrite;
