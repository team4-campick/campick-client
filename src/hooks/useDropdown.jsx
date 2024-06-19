import React, { useState } from "react";

// 드롭다운 컴포넌트와 드롭다운으로 선택된 값을 반환하는 커스텀 훅
// @param options 드롭다운 옵션

const useDropdown = ({ options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  // 드롭다운 열기/닫기 상태 핸들러
  const handleClickContainer = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 드롭다운 옵션 선택 핸들러
  const handleSelectOption = ({ option }) => {
    const { label, value } = option;
    setSelectedValue(value);
    setSelectedLabel(label);
    setIsDropdownOpen(false);
  };

  // 드롭다운 컴포넌트
  const Dropdown = () => {
    return (
      <div className="container" tabIndex={0}>
        <label onClick={handleClickContainer}>
          <button type="button">
            {selectedLabel || "선택"} {isDropdownOpen ? "⌃" : "⌄"}
          </button>
        </label>
        {isDropdownOpen && (
          <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
            {options.map((option) => {
              const { label, value } = option;
              return (
                <li key={value} onClick={() => handleSelectOption({ option })}>
                  {label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  // 선택된 값과 드롭다운 컴포넌트를 반환
  return { selectedValue, Dropdown };
};

export default useDropdown;
