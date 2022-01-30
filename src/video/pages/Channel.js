import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

import MainHeader from "../../shared/components/Navigation/MainHeader";
import { DrawerContext } from "../../shared/contexts/sidebar-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import VideoList from "../components/Videos/VideoList";

import "./Channel.css";

const Channel = () => {
  const drawerCtx = useContext(DrawerContext);
  const userId = useParams().uid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const [loadedVideos, setLoadedVideos] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );

        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();

    const fetchVideos = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/videos"
        );
        setLoadedVideos(responseData.videos);
      } catch (err) {}
    };
    fetchVideos();
  }, [userId, sendRequest]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  const channelClasses = drawerCtx.drawerIsOpen ? "channel-mini" : "channel";
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <MainHeader />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUser && loadedVideos && (
        <div className={channelClasses}>
          <div className="channel-top">
            <div className="channel-top-user">
              <div className="channel-top-user-info">
                <img
                  className="channel-top-user__image"
                  src="https://i.pinimg.com/236x/e9/71/69/e971694c70e8f181f94f0be7a4a60529.jpg"
                  alt={loadedUser.name}
                />
                <div className="channel-top-user__name">
                  <span>{loadedUser.name}</span>
                </div>
              </div>
              <div className="channel-top-user__actions">
                <Link to="/">MANAGE VIDEOS</Link>
              </div>
            </div>

            <ul className="channel-top-nav">
              <li>
                <NavLink to={`/channel/${userId}`} exact>
                  VIDEOS
                </NavLink>
              </li>
              <li>
                <NavLink to={`/channel/${userId}/about`} exact>ABOUT</NavLink>
              </li>
            </ul>
          </div>
          <div className="channel-bottom">
            <span>Uploads</span>
            <VideoList videos={loadedVideos} channel="yes" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Channel;
