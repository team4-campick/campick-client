import React, { useState, useEffect } from "react";
import Styles from "../css/event.module.css";

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
      <section className={Styles.eventCategory}>
        <div className={Styles.buttonWrap}>
          <button onClick={() => handleLabelChange("PROCEEDING")}>
            PROCEEDING
          </button>
          <button onClick={() => handleLabelChange("FINISHED")}>
            FINISHED
          </button>
        </div>
      </section>
      <section className={Styles.gallery}>
        {filteredEventVisuals.map((event) => (
          <div
            key={event.id}
            className={Styles.eventVisual}
            onClick={() => openPopup(event)}
          >
            <p>{event.visual}</p>
          </div>
        ))}
        {popupVisible && selectedEvent && (
          <div className={Styles.popup} onClick={closePopup}>
            <div
              className={Styles.popupContent}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={Styles.closeBtn} onClick={closePopup}>
                &times;
              </span>
              <div className={Styles.eventVisual}>
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
