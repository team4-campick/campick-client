import React, { useState, useEffect } from "react";
import style from "../../css/Event/event.module.css";
import {
  filterImagesByDate,
  updateImageStatuses,
  toggleBodyOverflow,
} from "../../utils/EventUtils";
import { allImages } from "../../utils/imageData";

const EventProceeding = () => {
  const [images, setImages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedImages = updateImageStatuses(allImages);
      const today = new Date();
      const proceedingImages = filterImagesByDate(updatedImages, today, false);
      setImages(proceedingImages);
    };
    fetchImages();
  }, []);

  const handleImageClick = (image) => {
    setPopupContent(image);
    setIsPopupOpen(true);
    toggleBodyOverflow(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
    toggleBodyOverflow(false);
  };

  const handlePopupBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <section className={style.gallery}>
      <h2 hidden>PROCEEDING</h2>
      <div className={style.galleryCon}>
        {images.map((image) => (
          <div
            key={image.name}
            className={style.eventVisual}
            onClick={() => handleImageClick(image)}
          >
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <div className={style.popup} onClick={handlePopupBackgroundClick}>
          <div
            className={style.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.eventVisual}>
              <img src={popupContent.url} alt={popupContent.name} />
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
