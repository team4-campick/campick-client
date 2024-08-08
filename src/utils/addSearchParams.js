// searchParams를 URL에 추가하는 유틸리티 함수
export const addSearchParams = (url, params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
};
