import React from "react";
import style from "../../css/Contents/contentsVideo.module.css";
import videoData from "../../../src/utils/VideoData";

const getVideoSrc = (fileName) => {
  return `${process.env.PUBLIC_URL}/images/ContentsVideo/${fileName}.mp4`;
};

const getImageSrc = (fileName) => {
  return `${process.env.PUBLIC_URL}/images/ContentsImage/${fileName}.png`;
};

const ContentsVideo = () => {
  const handleVideoClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className={style.videoCon}>
      <div className={style.ContentsVideo}>
        {videoData.map((video, index) => {
          const videoSrc = getVideoSrc(video.videoFileName);
          const userImageSrc = getImageSrc(video.userImage);
          return (
            <div
              key={index}
              className={style.videoBox}
              onClick={() => handleVideoClick(video.url)}
            >
              <video
                className={style.video}
                src={videoSrc}
                muted
                autoPlay
                loop
              />
              <div className={style.infoBox}>
                <strong className={style.videoTitle}>{video.title}</strong>
                <p className={style.videoDescription}>{video.description}</p>
                <div className={style.userBox}>
                  {userImageSrc && (
                    <img
                      src={userImageSrc}
                      alt={video.user}
                      className={style.userImage}
                    />
                  )}
                  <span className={style.videoUser}>{video.user}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentsVideo;
