import React, { useState, useEffect } from "react";
import style from "../../css/Event/event.module.css";
import {
  loadEventVisuals,
  toggleBodyOverflow,
} from "../../components/ContentsEvent/EventUtils";

const EventProceeding = () => {
  const [eventVisuals, setEventVisuals] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    setEventVisuals(loadEventVisuals(6));
  }, []);

  useEffect(() => {
    toggleBodyOverflow(isPopupOpen);
  }, [isPopupOpen]);

  const filteredEventVisuals = eventVisuals.filter((event) =>
    event.labels.includes("PROCEEDING")
  );

  const handleEventClick = (event) => {
    setPopupContent(event);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <section className={style.gallery}>
      <h2 hidden>PROCEEDING</h2>
      {/* 이벤트 목록 */}
      {filteredEventVisuals.map((event) => (
        <div
          key={event.id}
          className={style.eventVisual}
          onClick={() => handleEventClick(event)}
        >
          <p>{event.visual}</p>
        </div>
      ))}

      {isPopupOpen && (
        <div className={style.popup}>
          <div className={style.popupContent}>
            <div className={style.eventVisual}>
              <p>{popupContent.visual}</p>
            </div>
            <span className={style.closeBtn} onClick={closePopup}>
              &times;
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventProceeding;
