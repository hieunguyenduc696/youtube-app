import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";

import MainHeader from "../../shared/components/Navigation/MainHeader";
import { DrawerContext } from "../../shared/contexts/sidebar-context";
import { AuthContext } from "../../shared/contexts/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import VideoList from "../components/Videos/VideoList";

import "./Channel.css";

const Channel = () => {
  const drawerCtx = useContext(DrawerContext);
  const authCtx = useContext(AuthContext);
  const userId = useParams().uid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const [mainUser, setMainUser] = useState();
  const [loadedVideos, setLoadedVideos] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );

        setLoadedUser(responseData.user);
        console.log(authCtx.userId);
        console.log(userId);
      } catch (err) {}
    };
    fetchUser();

    const fetchMainUser = async () => {
      if (authCtx.isLoggedIn) {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/users/${authCtx.userId}`
          );

          setMainUser(responseData.user);
        } catch (err) {}
      }
    };
    fetchMainUser();

    const fetchVideos = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/videos/user/${userId}`
        );
        setLoadedVideos(responseData.videos);
      } catch (err) {}
    };
    fetchVideos();
  }, [authCtx.userId, userId, sendRequest]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  const directToUploadVideoPageHandler = () => {
    if (authCtx.isLoggedIn && authCtx.userId === userId) {
      history.push("/videos/new");
    }
  };

  let text = "No video found.";

  if (authCtx.isLoggedIn && userId === authCtx.userId) {
    text = "No video found. Upload video?";
  }

  const channelClasses = drawerCtx.drawerIsOpen ? "channel-mini" : "channel";
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUser && <MainHeader user={mainUser} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUser && loadedVideos && (
        <div className={channelClasses}>
          <div className="channel-top">
            <div className="channel-top-user">
              <div className="channel-top-user-info">
                <img
                  className="channel-top-user__image"
                  src={`http://localhost:5000/${loadedUser.image}`}
                  alt={loadedUser.name}
                />
                <div className="channel-top-user__name">
                  <span>{loadedUser.name}</span>
                </div>
              </div>
              <div className="channel-top-user__actions">
                {authCtx.isLoggedIn && authCtx.userId === userId && (
                  <Link to={`/channel/${userId}/videos`}>MANAGE VIDEOS</Link>
                )}
                {!authCtx.isLoggedIn && (
                  <Link
                    to="/auth"
                    style={{ backgroundColor: "#CC0000", border: "none" }}
                  >
                    SUBSCRIBE
                  </Link>
                )}
                {authCtx.isLoggedIn && authCtx.userId !== userId && (
                  <button
                    style={{ backgroundColor: "#CC0000", border: "none" }}
                  >
                    SUBSCRIBE
                  </button>
                )}
              </div>
            </div>

            <ul className="channel-top-nav">
              <li>
                <NavLink to={`/channel/${userId}`} exact>
                  VIDEOS
                </NavLink>
              </li>
              <li>
                <NavLink to={`/channel/${userId}/about`} exact>
                  ABOUT
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="channel-bottom">
            <span>Uploads</span>
            <VideoList
              videos={loadedVideos}
              channel="yes"
              directToUploadVideoPage={directToUploadVideoPageHandler}
              text={text}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Channel;
