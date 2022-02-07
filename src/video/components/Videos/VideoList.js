import { useContext } from "react";

import VideoItem from "./VideoItem";
import LoadingSpinner from "../../../shared/components/UIElement/LoadingSpinner";
import { DrawerContext } from "../../../shared/contexts/sidebar-context";

import "./VideoList.css";
const VideoList = (props) => {
  const drawerCtx = useContext(DrawerContext);
  const { videos } = props;
  let videoListClasses = drawerCtx.drawerIsOpen
    ? "video-list-mini"
    : "video-list";
  videoListClasses = props.small ? "video-list-small" : videoListClasses;

  videoListClasses = props.channel ? "video-list-channel" : videoListClasses;
  if (!videos) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  const onClickUploadBtnHandler = () => {
    props.directToUploadVideoPage()
  };
  if (videos.length === 0) {
    return (
      <div
        className="center no-video-found"
        onClick={onClickUploadBtnHandler}
      >
        {props.text}
      </div>
    );
  }
  return (
    <ul className={videoListClasses}>
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          id={video.id}
          title={video.title}
          createdAt={video.date}
          author={video.author}
          image={video.image}
          views={video.views}
          small={props.small}
          videoId={video.videoId}
        />
      ))}
    </ul>
  );
};

export default VideoList;
