import React, { useState } from "react";

const useDropdown = ({ options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClickContainer = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectValue = (value) => {
    setSelectedValue(value);
    setIsDropdownOpen(false);
  };

  const Dropdown = () => {
    return (
      <div className="container" tabIndex={0}>
        <label onClick={handleClickContainer}>
          <button type="button">
            {selectedValue || "선택"} {isDropdownOpen ? "⌃" : "⌄"}
          </button>
        </label>
        {isDropdownOpen && (
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelectValue(option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return { selectedValue, Dropdown };
};

export default useDropdown;
