import React, { useState, useEffect } from "react";
import style from "../../css/Event/event.module.css";

const EventFinished = () => {
  const [eventVisuals, setEventVisuals] = useState([]);

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

  const filteredEventVisuals = eventVisuals.filter((event) =>
    event.labels.includes("FINISHED")
  );

  return (
    <section className={style.gallery}>
      {filteredEventVisuals.map((event) => (
        <div key={event.id} className={style.eventVisual}>
          <p>{event.visual}</p>
        </div>
      ))}
    </section>
  );
};

export default EventFinished;
