import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import VideoList from "../components/Videos/VideoList";
import { DrawerContext } from "../../shared/contexts/sidebar-context";
import MainHeader from "../../shared/components/Navigation/MainHeader";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/contexts/auth-context";

import "./VideoDetailPage.css";

const VideoDetailPage = () => {
  const [loadedVideo, setLoadedVideo] = useState();
  const [loadedVideos, setLoadedVideos] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const [loadedAuthor, setLoadedAuthor] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const drawerCtx = useContext(DrawerContext);
  const authCtx = useContext(AuthContext);

  const videoId = useParams().vid;

  const videoDetailPageClasses = drawerCtx.drawerIsOpen
    ? "video-detail-page-mini"
    : "video-detail-page";

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/videos/${videoId}`
        );
        setLoadedVideo(responseData.video);
      } catch (err) {}
    };
    fetchVideo();
  }, [sendRequest, videoId]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/videos"
        );

        setLoadedVideos(responseData.videos);
      } catch (err) {}
    };
    fetchVideos();

    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${authCtx.userId}`
        );

        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    if (!authCtx.isLoggedIn) {
      return;
    }
    fetchUser();

    const fetchAuthor = async () => {
      try {
        let responseData
        if (loadedVideo) {
          responseData = await sendRequest(
            `http://localhost:5000/api/users/${loadedVideo.author}`
          );
        }

        setLoadedAuthor(responseData.user);
      } catch (err) {}
    };
    fetchAuthor();
  }, [sendRequest, authCtx.isLoggedIn, authCtx.userId, loadedVideo]);

  return (
    <div className={videoDetailPageClasses}>
      {!isLoading && <MainHeader user={loadedUser} />}

      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedVideos && loadedVideo && loadedAuthor && (
        <div className="video-detail">
          <div className="video-detail-left">
            <div className="video-detail-left-video">
              <video
                controls
                width={
                  videoDetailPageClasses === "video-detail-page" ? "870" : "600"
                }
                height={
                  videoDetailPageClasses === "video-detail-page" ? "530" : "500"
                }
                src={`http://localhost:5000/${loadedVideo.video}`}
              ></video>
            </div>

            <h2 className="video-detail-title">{loadedVideo.title}</h2>
            <div className="video-detail-views-date">
              <h3 className="video-detail-views">{loadedVideo.views}M views</h3>
              <h3 className="video-detail-date">{loadedVideo.date}</h3>
              <div className="video-detail-like-btn">
                <i className="far fa-thumbs-up"></i>
                {loadedVideo.like}
              </div>
            </div>
            <div className="video-detail-user">
              <Link to={`/channel/${loadedVideo.author}`}>
                <img
                  src={`http://localhost:5000/${loadedVideo.image}`}
                  alt={loadedVideo.title}
                  className="video-detail-user-image"
                />
              </Link>
              <div className="video-detail-author">
                <h1>{loadedAuthor.name}</h1>
                <p>{loadedVideo.description}</p>
              </div>
              <button className="video-detail-subscribe">SUBSCRIBE</button>
            </div>
          </div>
          <div className="video-detail-right">
            <VideoList videos={loadedVideos} small="yes" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetailPage;
