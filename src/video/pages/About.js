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
  const authCtx = useContext(AuthContext)
  const userId = useParams().uid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

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
      {!isLoading && loadedUser && (
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
