import React from "react";


import VideoList from "./VideoList";

import "./VideoDetail.css";

const VideoDetail = (props) => {
  const video = props.video[0];

  const videos = props.videos;
  if (!video) {
    return <p>Loading...</p>;
  }
  if (!videos || videos.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <div className="video-detail">
      <div className="video-detail-left">
        {video && (
          <iframe
            width="870"
            height="530"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        <h2 className="video-detail-title">{video.title}</h2>
        <div className="video-detail-views-date">
          <h3 className="video-detail-views">{video.views}M views</h3>
          <h3 className="video-detail-date">{video.createdAt}</h3>
          <div className="video-detail-like-btn">
            <i className="far fa-thumbs-up"></i>
            {video.like}
          </div>
        </div>
        <div className="video-detail-user">
          <img
            src={video.image}
            alt={video.title}
            className="video-detail-user-image"
          />
          <div className="video-detail-author">
            <h1>{video.author}</h1>
            <p>{video.description}</p>
          </div>
          <button className="video-detail-subscribe">SUBSCRIBE</button>
        </div>
      </div>
      <div className="video-detail-right">
        <VideoList videos={videos} small="yes" />
      </div>
    </div>
  );
};

export default VideoDetail;
