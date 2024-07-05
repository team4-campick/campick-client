// html 태그로 된 문자열에서 이미지 url을 추출하는 함수
const extractImageUrls = (htmlString) => {
  const regex = /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/g;
  const urls = [];
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    urls.push(match[1]);
  }

  return urls;
};

export default extractImageUrls;
