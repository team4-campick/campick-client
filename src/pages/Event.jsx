import React, { useState, useEffect } from "react";
import style from "../css/event.module.css";

const Event = () => {
  const [eventVisuals, setEventVisuals] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("PROCEEDING");
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const openPopup = (event) => {
    setSelectedEvent(event);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedEvent(null);
  };

  const handleLabelChange = (label) => {
    setSelectedLabel(label);
  };

  const filteredEventVisuals = eventVisuals.filter((event) =>
    event.labels.includes(selectedLabel)
  );

  return (
    <>
      <section className={style.eventCategory}>
        <div className={style.categoryWrap}>
          <span onClick={() => handleLabelChange("PROCEEDING")}>
            PROCEEDING
          </span>
          <span onClick={() => handleLabelChange("FINISHED")}>FINISHED</span>
        </div>
      </section>
      <section className={style.gallery}>
        {filteredEventVisuals.map((event) => (
          <div
            key={event.id}
            className={style.eventVisual}
            onClick={() => openPopup(event)}
          >
            <p>{event.visual}</p>
          </div>
        ))}
        {popupVisible && selectedEvent && (
          <div className={style.popup} onClick={closePopup}>
            <div
              className={style.popupContent}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={style.closeBtn} onClick={closePopup}>
                &times;
              </span>
              <div className={style.eventVisual}>
                <p>{selectedEvent.visual}</p> {/* 선택된 이벤트 시각 표시 */}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Event;
