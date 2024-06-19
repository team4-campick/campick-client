import style from "../../css/Market/SalePostWrite.module.css";
import useDropdown from "../../hooks/useDropdown";
import { PRODUCT_CATEGORY, REGION } from "../../constants/market";

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    // 파일 내용은 reader.result에 저장됩니다.
    console.log(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

const SalePostWrite = () => {
  // useDropdown 훅을 통해 드롭다운 컴포넌트 및 선택값을 필요한 값(카테고리, 지역 등)에 따라 분리하여 관리
  const { selectedValue: category, Dropdown: CategoryDropdown } = useDropdown({
    options: PRODUCT_CATEGORY,
  });
  const { selectedValue: region, Dropdown: RegionDropdown } = useDropdown({
    options: REGION,
  });
  const { selectedValue: cities, Dropdown: CityDropdown } = useDropdown({
    options: REGION.find((option) => option.value === region)?.cities || [],
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
            />
            <label className={style.uploadBtn} htmlFor="file">
              <div>+</div>
            </label>
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
            <div className={style.selectRegion}>
              <span>도</span>
              <RegionDropdown />
              <span>시</span>
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
        <button>등록하기</button>
      </div>
    </section>
  );
};

export default SalePostWrite;
