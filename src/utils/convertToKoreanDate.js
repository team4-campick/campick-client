const convertToKoreanDate = (data) => {
  const isCreatedAt =
    new Date(data).getTime() + new Date(data).getTimezoneOffset() * 60 * 1000;

  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  const kr_curr = new Date(isCreatedAt + KR_TIME_DIFF);

  const year = kr_curr.getFullYear(); // 연도를 가져옵니다.
  const month = kr_curr.getMonth() + 1; // 월을 가져오며, 0부터 시작하므로 1을 더합니다.
  const isMonth = month >= 10 ? month : "0" + month; // 월이 10 이상이면 그대로, 10 미만이면 앞에 '0'을 추가하여 두 자리로 표시합니다.
  const day = kr_curr.getDate(); // 일을 가져옵니다.
  const isDay = day >= 10 ? day : "0" + day; // 일이 10 이상이면 그대로, 10 미만이면 앞에 '0'을 추가하여 두 자리로 표시합니다.
  // const hour = kr_curr.getHours(); // 시간을 가져옵니다.
  // const isHour = hour >= 10 ? hour : "0" + hour; // 시간이 10 이상이면 그대로, 10 미만이면 앞에 '0'을 추가하여 두 자리로 표시합니다.
  // const minutes = kr_curr.getMinutes(); // 분을 가져옵니다.
  // const isMinutes = minutes >= 10 ? minutes : "0" + minutes; 분이 10 이상이면 그대로, 10 미만이면 앞에 '0'을 추가하여 두 자리로 표시합니다.

  // 'YYYY.MM.DD. HH:mm' 형식으로 변환한 문자열을 반환합니다.
  return year + "." + isMonth + "." + isDay;
};

export default convertToKoreanDate;
