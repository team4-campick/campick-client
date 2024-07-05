import React from "react";
import style from "../../css/Contents/contentsVideo.module.css";

const importAll = (r) => r.keys().map(r);
const videos = importAll(
  require.context(
    "../../../public/images/ContentsVideo",
    false,
    /\.(mp4|webm)$/
  )
);

const ContentsVideo = () => {
  return (
    <div className={style.ContentsVideo}>
      {videos.map((videoSrc, index) => (
        <div key={index} className={style.videoBox}>
          <video className={style.video} src={videoSrc} muted autoPlay loop />
          <div className={style.infoBox}>
            {/* <strong className={style.videoTitle}>
              제주시 호텔 {index + 1}
            </strong> */}
            <p className={style.videoDescription}>
              As opposed to using 'Content here, content here', making it look
              like...
            </p>
            <div className={style.userBox}>
              <img
                src="/path_to_user_image"
                alt="Campick"
                className={style.userImage}
              />
              <span className={style.videoUser}>Campick</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentsVideo;
