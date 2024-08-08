import React from "react";
import PropTypes from "prop-types";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({
  size = "default",
  color = "blue",
  backdropColor = "#000000",
  backdropOpacity = 0.2,
}) => {
  const spinnerClass = `${styles.spinner} ${styles[size]} ${styles[color]}`;
  const backdropStyle = {
    backgroundColor: backdropColor,
    opacity: backdropOpacity,
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} style={backdropStyle}></div>
      <div className={styles.spinnerContainer}>
        <div className={spinnerClass}></div>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "default", "large"]),
  color: PropTypes.oneOf(["blue", "red", "green", "yellow", "purple"]),
  backdropColor: PropTypes.string,
  backdropOpacity: PropTypes.number,
};

export default LoadingSpinner;
