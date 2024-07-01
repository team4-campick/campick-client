import React, { useState, useEffect } from "react";
import style from "../../css/Event/event.module.css";

const EventFinished = () => {
  const [eventVisuals, setEventVisuals] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    const loadEventVisuals = () => {
      const generateEventVisual = (index) => {
        const today = new Date();
        const eventDate = new Date();
        eventDate.setDate(today.getDate() - index);
        const status = eventDate < today ? "FINISHED" : "PROCEEDING";
        return {
          id: index,
          visual: `Visual ${index + 1}`,
          labels: [status],
        };
      };

      const newEventVisuals = Array.from({ length: 6 }, (_, index) =>
        generateEventVisual(index)
      );
      setEventVisuals(newEventVisuals);
    };

    loadEventVisuals();
  }, []);

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupOpen]);

  const filteredEventVisuals = eventVisuals.filter((event) =>
    event.labels.includes("FINISHED")
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

export default EventFinished;
