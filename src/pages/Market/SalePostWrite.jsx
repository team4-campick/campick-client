import React from "react";
import style from "../../css/Market/SalePostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";

const CATEGORY = [
  { label: "텐트", value: "tent" },
  { label: "침낭/매트/해먹", value: "sleeping-bag-mat-hammock" },
  { label: "스토브/화로대", value: "stove-fireplace" },
  { label: "랜턴", value: "lantern" },
  { label: "조리도구", value: "cooking-gear" },
  { label: "기타장비", value: "other-equipment" },
];

const REGION = [
  { label: "서울", value: "Seoul" },
  { label: "부산", value: "Busan" },
  { label: "인천", value: "Incheon" },
  { label: "대구", value: "Daegu" },
  { label: "대전", value: "Daejeon" },
];

const SalePostWrite = () => {
  // const [isDropdown, setDropdown] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState("");

  const { selectedValue: category, Dropdown: CategoryDropdown } = useDropdown({
    options: CATEGORY,
  });
  const { selectedValue: region, Dropdown: RegionDropdown } = useDropdown({
    options: REGION,
  });

  // const handleClickContainer = () => {
  //   setDropdown(!isDropdown);
  // };

  // const handleSelectCategory = (category) => {
  //   setSelectedCategory(category);
  //   setDropdown(false);
  // };
  return (
    <section className={style.writeCon}>
      <h2 hidden>SalePostWrite</h2>
      <div>
        <ul>
          <li>
            <span>이미지</span>
            <label htmlFor="file">
              <div className="uploadBtn">파일찾기</div>
            </label>
            <input type="file" id="file" multiple accept="image/*" />
          </li>
          <li>
            <span>상품명</span>
            <input type="text" placeholder="상품명을 입력해주세요." />
          </li>
          <li>
            <span>카테고리</span>
            <CategoryDropdown />
          </li>
          <li>
            <span>지역</span>
            <RegionDropdown />
          </li>
          <li>
            <span>상품상태</span>
            <div>
              <input
                type="radio"
                id="new"
                name="condition"
                value="new"
                checked
              />
              <label htmlFor="new">새상품</label>

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
      </div>
    </section>
  );
};

export default SalePostWrite;
