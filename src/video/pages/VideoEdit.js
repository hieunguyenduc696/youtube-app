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
import Modal from "../../shared/components/UIElement/Modal";
import Button from "../../shared/components/FormElements/Button";
const VideoEdit = () => {
  const userId = useParams().uid;
  const drawerCtx = useContext(DrawerContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedVideos, setLoadedVideos] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false)
    console.log("deleting");
  };

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
          <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            footerClass="place-item__modal-actions"
            footer={
              <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
              </React.Fragment>
            }
          >
            <p>
              Do you want to proceed and delete this video? Please note that it
              can't be undone thereafter.
            </p>
          </Modal>
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
                    <DeleteIcon videoId={video.id} onClick={showDeleteWarningHandler} />
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
