// ScrollTopBtn.js
import React, { useState, useEffect } from "react";
import styles from "./ScrollTopBtn.module.css";

const ScrollTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.scrollToTop}>
      {isVisible && (
        <button onClick={scrollToTop} className={styles.scrollToTopButton}>
          Top
        </button>
      )}
    </div>
  );
};

export default ScrollTopBtn;
