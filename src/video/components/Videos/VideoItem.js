import { Link } from "react-router-dom";

import "./VideoItem.css";

const VideoItem = (props) => {
  const videoItemClasses = props.small ? "video-item-small" : "";
  const avatarClasses = props.small
    ? "video-item-user-title__avatar-small"
    : "video-item-user-title__avatar";
  const infoClasses = props.small ? "video-item-info-small" : "video-item-info";
  const usertitleClasses = props.small
    ? "video-item-user-title-small"
    : "video-item-user-title";
  const thumbnails = props.small
    ? "video-item__thumbnails-small"
    : "video-item__thumbnails";
  return (
    <li className="video-item">
      <Link to={`/${props.id}`}>
        <div className={videoItemClasses}>
          <div className="video-item-top">
            <img src={props.image} alt={props.title} className={thumbnails} />
          </div>
          <div className="video-item-bottom">
            <div className={usertitleClasses}>
              <Link to={`/channel/${props.author}`}>
                <img
                  src={props.image}
                  alt={props.title}
                  className={avatarClasses}
                />
              </Link>
              <h2 className="video-item-user-title__title">{props.title}</h2>
            </div>
            <div className={infoClasses}>
              <span className="video-item-author">{props.author}</span>
              <span className="video-item-views">{props.views}M views</span>
              <span className="video-item-createdAt">{props.createdAt}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VideoItem;
