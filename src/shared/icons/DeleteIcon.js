import React, { useState, useContext } from "react";

import Modal from "../../shared/components/UIElement/Modal";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../contexts/auth-context";

import "./DeleteIcon.css";
const DeleteIcon = (props) => {
  const { sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const authCtx = useContext(AuthContext);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    if (!props.commentId) {
      try {
        await sendRequest(
          `http://localhost:5000/api/videos/${props.videoId}`,
          "DELETE",
          null,
          { Authorization: "Bearer " + authCtx.token }
        );
        props.onDelete(props.videoId);
      } catch (err) {}
    }
    // delete comment
    if (props.commentId) {
      try {
        await sendRequest(
          `http://localhost:5000/api/videos/comment/${props.videoId}`,
          "DELETE",
          JSON.stringify({
            id: props.commentId,
          }),
          {
            Authorization: "Bearer " + authCtx.token,
            "Content-Type": "application/json",
          }
        );
        props.onDelete(props.commentId);
      } catch (err) {}
    }
  };

  return (
    <span className="delete-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        onClick={showDeleteWarningHandler}
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm2-2v2h6V4H9z" />
      </svg>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this {props.ident}? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <div className="delete-icon-text" onClick={showDeleteWarningHandler}>
        {props.text}
      </div>
    </span>
  );
};

export default DeleteIcon;
