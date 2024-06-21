import React, { useState, useEffect } from "react";
import Styles from "../css/event.module.css";
import throttle from "lodash/throttle";

const Event = () => {
  const [placeholders, setPlaceholders] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const loadPlaceholders = () => {
      const newPlaceholders = Array.from({ length: 6 });
      setPlaceholders((prevPlaceholders) => [
        ...prevPlaceholders,
        ...newPlaceholders,
      ]);
    };

    const handleScroll = throttle(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        loadPlaceholders();
      }
    }, 300);

    loadPlaceholders();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className={Styles.eventCategory}>
        <p>PROCEEDING</p>
        <p>FINISHED</p>
      </div>
      <section className={Styles.gallery}>
        {placeholders.map((_, index) => (
          <div key={index} className={Styles.placeholder} onClick={openPopup}>
            <p>Placeholder {index + 1}</p>
          </div>
        ))}
        {popupVisible && (
          <div id="popup">
            <div id="popup-content">
              <span id="close-btn" onClick={closePopup}>
                &times;
              </span>
              <div className={Styles.placeholder}>
                <p>Popup Placeholder</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Event;
