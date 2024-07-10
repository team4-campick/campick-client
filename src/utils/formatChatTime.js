const formatChatTime = (data) => {
  const now = new Date();
  const krTimeNow = new Date(now.getTime());

  const isCreatedAt =
    new Date(data).getTime() + new Date(data).getTimezoneOffset() * 60 * 1000;
  const krTimeCreated = new Date(isCreatedAt + 9 * 60 * 60 * 1000);

  const diff = krTimeNow - krTimeCreated;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "방금";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
};

export default formatChatTime;
