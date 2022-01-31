import React from "react";
import { useHistory } from "react-router-dom";

import "./EditIcon.css";
const EditIcon = (props) => {
  const history = useHistory();
  const directToEditPage = () => {
    history.push(`/videos/${props.videoId}`);
  };
  return (
    <span className="edit-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" />
      </svg>
      <div className="edit-icon-text" onClick={directToEditPage}>
        Edit title & description
      </div>
    </span>
  );
};

export default EditIcon;