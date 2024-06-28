import React from "react";
import style from "../../css/Contents/contentsVideo.module.css";

// 서버에 넣어야할 듯?
const videos = [
  {
    id: 1,
    title: "제주시 호텔",
    description:
      "As opposed to using 'Content here, content here', making it look like...",
    user: "Campick",
    userImage: "path_to_user_image",
    videoSrc: "path_to_video",
  },
  {
    id: 2,
    title: "제주시 호텔",
    description:
      "As opposed to using 'Content here, content here', making it look like...",
    user: "Campick",
    userImage: "path_to_user_image",
    videoSrc: "path_to_video",
  },
  {
    id: 3,
    title: "제주시 호텔",
    description:
      "As opposed to using 'Content here, content here', making it look like...",
    user: "Campick",
    userImage: "path_to_user_image",
    videoSrc: "path_to_video",
  },
  {
    id: 4,
    title: "제주시 호텔",
    description:
      "As opposed to using 'Content here, content here', making it look like...",
    user: "Campick",
    userImage: "path_to_user_image",
    videoSrc: "path_to_video",
  },
  {
    id: 5,
    title: "제주시 호텔",
    description:
      "As opposed to using 'Content here, content here', making it look like...",
    user: "Campick",
    userImage: "path_to_user_image",
    videoSrc: "path_to_video",
  },
  {
    id: 6,
    title: "제주시 호텔",
    description:
      "As opposed to using 'Content here, content here', making it look like...",
    user: "Campick",
    userImage: "path_to_user_image",
    videoSrc: "path_to_video",
  },

  // 다른 영상 데이터들 추가
];

const ContentsVideo = () => {
  return (
    <div className={style.ContentsVideo}>
      {videos.map((video) => (
        <div key={video.id} className={style.videoBox}>
          <video
            className={style.video}
            src={video.videoSrc}
            muted
            autoPlay
            loop
          />
          <div className={style.infoBox}>
            <strong className={style.videoTitle}>{video.title}</strong>
            <p className={style.videoDescription}>{video.description}</p>
            <div className={style.userBox}>
              <img
                src={video.userImage}
                alt={video.user}
                className={style.userImage}
              />
              <span className={style.videoUser}>{video.user}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentsVideo;
