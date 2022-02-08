import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { DrawerContext } from "../../shared/contexts/sidebar-context";
import MainHeader from "../../shared/components/Navigation/MainHeader";
import EditIcon from "../../shared/icons/EditIcon";
import YoutubeIcon from "../../shared/icons/YoutubeIcon";
import DeleteIcon from "../../shared/icons/DeleteIcon";

import "./VideoEdit.css";
const VideoEdit = () => {
  const userId = useParams().uid;
  const drawerCtx = useContext(DrawerContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedVideos, setLoadedVideos] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const [loadedComment, setLoadedComment] = useState(0);

  const videoEditClasses = drawerCtx.drawerIsOpen
    ? "video-edit-mini"
    : "video-edit";
  useEffect(() => {
    const fetchVideos = async () => {
      let responseData;
      try {
        responseData = await sendRequest(
          `http://localhost:5000/api/videos/user/${userId}`
        );
        setLoadedVideos(responseData.videos);
        console.log(responseData.videos);
      } catch (err) {}

      if (responseData) {
        responseData.videos.forEach(async (video) => {
          try {
            const responseData1 = await sendRequest(
              `http://localhost:5000/api/videos/comment/${video.id}`
            );
            setLoadedComment((prev) =>
              prev
                ? [...prev, responseData1.items.comments.length]
                : [responseData1.items.comments.length]
            );
          } catch (err) {}
        });
      }
    };
    fetchVideos();

    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );

        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, userId]);

  const videoDeletedHandler = (deletedVideoId) => {
    setLoadedVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== deletedVideoId)
    );
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  return (
    <React.Fragment>
      {!isLoading && loadedUser && <MainHeader user={loadedUser} />}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && (!loadedVideos || loadedVideos.length === 0) && (
        <div className={`no-video-found-1`}>No video found.</div>
      )}
      {!isLoading && loadedVideos && loadedComment && (
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
            {loadedVideos.map((video, index) => (
              <div className="row" key={video.id}>
                <div className="col video">
                  <img
                    src={`http://localhost:5000/${video.image}`}
                    alt={video.title}
                  />
                  <div className="video-edit-info">
                    <p>{video.title}</p>
                    <span>{video.description}</span>
                  </div>
                  <div className="video-edit-tools">
                    <EditIcon
                      videoId={video.id}
                      text="Edit title & description"
                    />
                    <YoutubeIcon videoId={video.id} />
                    <DeleteIcon
                      videoId={video.id}
                      onDelete={videoDeletedHandler}
                      text="Delete video"
                      ident="video"
                    />
                  </div>
                </div>
                <div className="col date">{video.date}</div>
                <div className="col views">200</div>
                <div className="col comments">{loadedComment[index]}</div>
                <div className="col likes">{video.likes.length}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default VideoEdit;
