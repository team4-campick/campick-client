import React, { useState } from "react";
const SalePostWrite = () => {
  const [isDropdown, setDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClickContainer = () => {
    setDropdown(!isDropdown);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdown(false);
    }, 200);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDropdown(false);
  };
  return (
    <section>
      <h2 hidden>SalePostWrite</h2>
      <div>
        <ul>
          <li>
            이미지
            <input type="file" />
          </li>
          <li>
            상품명
            <input type="text" placeholder="상품명을 입력해주세요." />
          </li>
          <li>
            카테고리
            <div
              className="container"
              onBlur={handleBlurContainer}
              tabIndex={0}
            >
              <label onClick={handleClickContainer}>
                <button type="button">
                  {selectedCategory || "선택"} {isDropdown ? "⌃" : "⌄"}
                </button>
              </label>
              {isDropdown && (
                <ul>
                  {[
                    "텐트",
                    "침낭/매트/해먹",
                    "스토브/화로대",
                    "랜턴",
                    "조리도구",
                    "기타장비",
                  ].map((category, i) => (
                    <li key={i} onClick={() => handleSelectCategory(category)}>
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li>지역</li>
          <li>상품상태</li>
          <li>
            가격
            <input type="text" placeholder="가격을 입력해 주세요." />
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
