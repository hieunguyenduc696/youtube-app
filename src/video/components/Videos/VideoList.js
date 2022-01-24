import { useContext } from "react";

import VideoItem from "./VideoItem";

import { DrawerContext } from "../../../shared/contexts/sidebar-context";

import "./VideoList.css";
const VideoList = (props) => {
  const drawerCtx = useContext(DrawerContext);
  const { videos } = props;
  const videoListClasses = drawerCtx.drawerIsOpen
    ? "video-list-mini"
    : "video-list";
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
        />
      ))}
    </ul>
  );
};

export default VideoList;
