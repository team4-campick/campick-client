import style from "../../css/Market/SalePostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import { PRODUCT_CATEGORY, REGION } from "../../constants/market";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SalePostWrite = () => {
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);
  const MAX_IMAGES = 5;

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.slice(0, MAX_IMAGES - imagePreviews.length);

    const filePreviews = files.map((file) => {
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
  const { selectedValue: category, Dropdown: CategoryDropdown } = useDropdown({
    options: PRODUCT_CATEGORY,
    type: "종류",
  });
  const { selectedValue: region, Dropdown: RegionDropdown } = useDropdown({
    options: REGION,
    type: "도",
  });
  const { selectedValue: cities, Dropdown: CityDropdown } = useDropdown({
    options: REGION.find((option) => option.value === region)?.cities || [],
    type: "시",
  });

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
            <input type="text" placeholder="상품명을 입력해주세요." />
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
            <div>
              <input
                type="radio"
                id="new"
                name="condition"
                value="new"
                defaultChecked
              />
              <label htmlFor="new">새상품(미개봉)</label>
              <input type="radio" id="no_use" name="condition" value="no_use" />
              <label htmlFor="no_use">사용감 없음</label>

              <input
                type="radio"
                id="little_use"
                name="condition"
                value="little_use"
              />
              <label htmlFor="little_use">사용감 적음</label>

              <input
                type="radio"
                id="much_use"
                name="condition"
                value="much_use"
              />
              <label htmlFor="much_use">사용감 많음</label>
              <input type="radio" id="broken" name="condition" value="broken" />
              <label htmlFor="broken">고장/파손 상품</label>
            </div>
          </li>
          <li>
            <span>가격</span>
            <input type="text" placeholder="가격을 입력해 주세요." />원
          </li>
          <li>
            설명
            <textarea name="" id=""></textarea>
          </li>
        </ul>
        <button
          onClick={() => {
            navigate("/market");
          }}
        >
          등록하기
        </button>
      </div>
    </section>
  );
};

export default SalePostWrite;
