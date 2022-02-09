import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

import MainHeader from "../../shared/components/Navigation/MainHeader";
import { DrawerContext } from "../../shared/contexts/sidebar-context";
import { AuthContext } from "../../shared/contexts/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";

import "./Channel.css";

const About = () => {
  const drawerCtx = useContext(DrawerContext);
  const authCtx = useContext(AuthContext);
  const userId = useParams().uid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const [mainUser, setMainUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
        );

        setLoadedUser(responseData.user);
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
  }, [userId, sendRequest, authCtx.userId, authCtx.isLoggedIn]);

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
      <MainHeader user={mainUser} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUser && (
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
            <span>This is {loadedUser.name} channel</span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default About;
