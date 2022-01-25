import React from "react";

import "./VideoDetail.css";
import VideoList from "./VideoList";

const VideoDetail = (props) => {
  const video = props.video
  const videos = props.videos
  if (!video) {
    return <p>Loading...</p>;
  } 
  if (!videos || videos.length === 0) {
    return <p>Loading...</p>
  }
  return (
    <div className="video-detail">
      <div className="video-detail-left">
        {video && <iframe
          width="870"
          height="530"
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>}
      </div>
      <div className="video-detail-right">
        <VideoList videos={videos} small='yes' />
      </div>
    </div>
  );
};

export default VideoDetail;
