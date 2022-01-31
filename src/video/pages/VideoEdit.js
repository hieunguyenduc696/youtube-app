import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { DrawerContext } from "../../shared/contexts/sidebar-context";
import MainHeader from "../../shared/components/Navigation/MainHeader";

import "./VideoEdit.css";
import EditIcon from "../../shared/icons/EditIcon";
import YoutubeIcon from "../../shared/icons/YoutubeIcon";
import DeleteIcon from "../../shared/icons/DeleteIcon";
const VideoEdit = () => {
  const userId = useParams().uid;
  const drawerCtx = useContext(DrawerContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedVideos, setLoadedVideos] = useState();
  const videoEditClasses = drawerCtx.drawerIsOpen
    ? "video-edit-mini"
    : "video-edit";
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/videos/user/${userId}`
        );
        setLoadedVideos(responseData.videos);
      } catch (err) {}
    };
    fetchVideos();
  }, [sendRequest, userId]);
  return (
    <React.Fragment>
      <MainHeader />
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedVideos && (
        <div className={videoEditClasses}>
          <h1>Channel content</h1>
          <div className="container">
            <div className="row">
              <div className="col">Video</div>
              <div className="col">Date</div>
              <div className="col">Views</div>
              <div className="col">Comments</div>
              <div className="col">Likes</div>
            </div>
            {loadedVideos.map((video) => (
              <div className="row" key={video.id}>
                <div className="col video">
                  <img src={video.image} alt={video.title} />
                  <div className="video-edit-info">
                    <p>{video.title}</p>
                    <span>{video.description}</span>
                  </div>
                  <div className="video-edit-tools">
                    <EditIcon videoId={video.id} />
                    <YoutubeIcon videoId={video.id} />
                    <DeleteIcon videoId={video.id} />
                  </div>
                </div>
                <div className="col date">{video.createdAt}</div>
                <div className="col views">200</div>
                <div className="col comments">0</div>
                <div className="col likes">10</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default VideoEdit;
