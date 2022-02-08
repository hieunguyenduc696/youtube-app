import React from "react";
import { useHistory } from "react-router-dom";

import "./EditIcon.css";
const EditIcon = (props) => {
  const history = useHistory();
  const directToEditPage = async () => {
    if (!props.commentId) {
      history.push(`/videos/${props.videoId}`);
    } else {
      props.onClick(props.commentId);
      // try {
      //   await sendRequest(
      //     `http://localhost:5000/api/videos/comment/${props.videoId}`,
      //     "DELETE",
      //     JSON.stringify({
      //       id: props.commentId,
      //       content: props.content
      //     }),
      //     {
      //       Authorization: "Bearer " + authCtx.token,
      //       "Content-Type": "application/json",
      //     }
      //   );
      //   props.onEdit(props.commentId, props.content);
      // } catch (err) {}
    }
  };
  return (
    <React.Fragment>
      <span className="edit-icon">
        <svg
          onClick={directToEditPage}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" />
        </svg>
        <div className="edit-icon-text" onClick={directToEditPage}>
          {props.text}
        </div>
      </span>
    </React.Fragment>
  );
};

export default EditIcon;
