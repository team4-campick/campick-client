export const filterImagesByDate = (images, targetDate, isFinished = true) => {
  const target = new Date(targetDate);
  return images.filter((image) => {
    const imageDate = new Date(image.date);
    return isFinished ? imageDate < target : imageDate >= target;
  });
};

export const toggleBodyOverflow = (isPopupOpen) => {
  document.body.style.overflow = isPopupOpen ? "hidden" : "auto";
  return () => {
    document.body.style.overflow = "auto";
  };
};

export const updateImageStatuses = (images) => {
  const today = new Date();
  return images.map((image) => {
    const imageDate = new Date(image.date);
    return {
      ...image,
      status: imageDate < today ? "finished" : "proceeding",
    };
  });
};
