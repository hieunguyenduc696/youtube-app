import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import VideoDetail from "../components/Videos/VideoDetail";
import { DrawerContext } from "../../shared/contexts/sidebar-context";
import MainHeader from "../../shared/components/Navigation/MainHeader";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./VideoDetailPage.css";

const VideoDetailPage = () => {
  const [loadedVideo, setLoadedVideo] = useState();
  const [loadedVideos, setLoadedVideos] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const drawerCtx = useContext(DrawerContext);

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
    const fetchVideos = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/videos"
        );

        setLoadedVideos(responseData.videos);
      } catch (err) {}
    };
    fetchVideos();

  }, [sendRequest, videoId]);

  return (
    <div className={videoDetailPageClasses}>
      <MainHeader />
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedVideos && loadedVideo && (
        <VideoDetail video={loadedVideo} videos={loadedVideos} />
      )}
    </div>
  );
};

export default VideoDetailPage;
