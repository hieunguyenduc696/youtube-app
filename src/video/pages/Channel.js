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
  const [subscribeNum, setSubscribeNum] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
        );

        setLoadedUser(responseData.user);
        if (
          responseData.user.subscribes.find(
            (item) => item.user_id === authCtx.userId
          )
        ) {
          setSubscribed(true);
        }
        setSubscribeNum(responseData.user.subscribes.length);
      } catch (err) {}
    };
    fetchUser();

    const fetchMainUser = async () => {
      if (authCtx.isLoggedIn) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/${authCtx.userId}`
          );

          setMainUser(responseData.user);
        } catch (err) {}
      }
    };
    fetchMainUser();

    const fetchVideos = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/videos/user/${userId}`
        );
        setLoadedVideos(responseData.videos);
      } catch (err) {}
    };
    fetchVideos();
  }, [authCtx.userId, userId, sendRequest, authCtx.isLoggedIn]);

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

  const toggleSubscribeHandler = async () => {
    setSubscribed((prev) => !prev);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/subscribe",
        "POST",
        JSON.stringify({
          id: userId,
        }),
        {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        }
      );
      if (subscribed) {
        setSubscribeNum((prev) => (prev = prev - 1));
      } else {
        setSubscribeNum((prev) => (prev = prev + 1));
      }
    } catch (err) {}
  };

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
                  src={`${process.env.REACT_APP_ASSET_URL}/${loadedUser.image}`}
                  alt={loadedUser.name}
                />
                <div className="channel-top-user__name">
                  <span>{loadedUser.name}</span>
                  <div className="channel-top-user__subscribes">
                    <span>
                      {subscribeNum}{" "}
                      {loadedUser.subscribes.length > 1
                        ? "subscribes"
                        : "subscribe"}
                    </span>
                  </div>
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
                    type="button"
                    style={{
                      backgroundColor: subscribed ? "#ECECEC" : "#CC0000",
                      border: "none",
                      color: subscribed ? "#606060" : "white",
                      cursor: "pointer",
                    }}
                    onClick={toggleSubscribeHandler}
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
