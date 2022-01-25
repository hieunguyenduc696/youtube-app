import { useContext } from "react";

import VideoItem from "./VideoItem";

import { DrawerContext } from "../../../shared/contexts/sidebar-context";

import "./VideoList.css";
const VideoList = (props) => {
  const drawerCtx = useContext(DrawerContext);
  const { videos } = props;
  let videoListClasses = drawerCtx.drawerIsOpen
    ? "video-list-mini"
    : "video-list";
  videoListClasses = props.small ? "video-list-small" : videoListClasses;
  if (!videos || videos.length === 0) {
    return <p>Loading...</p>
  }
  return (
    <ul className={videoListClasses}>
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          id={video.id}
          title={video.title}
          createdAt={video.createdAt}
          author={video.author}
          image={video.image}
          views={video.views}
          small={props.small}
        />
      ))}
    </ul>
  );
};

export default VideoList;
