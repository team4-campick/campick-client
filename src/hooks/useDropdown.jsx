import React, { useState } from "react";
import "./useDropdown.css";
// 드롭다운 컴포넌트와 드롭다운으로 선택된 값을 반환하는 커스텀 훅
// @param options 드롭다운 옵션

const useDropdown = ({ options, type }) => {
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
            <div>{selectedLabel || type} </div>
            <div>{isDropdownOpen ? "\u23f6" : "\u23f7"}</div>
          </button>
        </label>
        {isDropdownOpen && (
          <ul style={{ maxHeight: "100px", overflowY: "auto" }}>
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
  return { selectedLabel, setSelectedLabel, Dropdown };
};

export default useDropdown;
