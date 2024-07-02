function convertToKoreanDate(dateString) {
  // Date 객체로 변환
  const date = new Date(dateString);

  // 한국 시간으로 변환
  date.setHours(date.getHours() + 9); // UTC+9 시간대로 변환

  // 날짜 요소 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // "YYYY.MM.DD" 형식으로 포맷팅
  return `${year}.${month}.${day}`;
}
export default convertToKoreanDate;
