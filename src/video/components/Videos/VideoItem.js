import "./VideoItem.css";

const VideoItem = (props) => {
  return (
    <li className="video-item">
      <img
        src={props.image}
        alt={props.title}
        className="video-item__thumbnails"
      />
      <div className="video-item-user-title">
        <img
          src={props.image}
          alt={props.title}
          className="video-item-user-title__avatar"
        />
        <h2 className="video-item-user-title__title">{props.title}</h2>
      </div>
      <div className="video-item-info">
        <span className="video-item-author">{props.author}</span>
        <span className="video-item-views">{props.views}M views</span>
        <span className="video-item-createdAt">{props.createdAt}</span>
      </div>
    </li>
  );
};

export default VideoItem;
