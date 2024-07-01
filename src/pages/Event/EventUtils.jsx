export const loadEventVisuals = (length) => {
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

  return Array.from({ length }, (_, index) => generateEventVisual(index));
};

export const toggleBodyOverflow = (isPopupOpen) => {
  document.body.style.overflow = isPopupOpen ? "hidden" : "auto";
  return () => {
    document.body.style.overflow = "auto";
  };
};
