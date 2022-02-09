import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElement/ErrorModal";

import "./VideoItem.css";

const VideoItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const mountedRef = useRef(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${props.author}`
        );
        if (!mountedRef.current) return null;

        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();

    return () => {
      mountedRef.current = false;
    };
  }, [props.author, sendRequest]);

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
  const top = props.small ? "video-item-top-small" : "video-item-top";
  const bottom = props.small ? "video-item-bottom-small" : "video-item-bottom";
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUser && (
        <li className="video-item">
          <div className={videoItemClasses}>
            <div className={top}>
              <Link to={`/${props.id}`}>
                <img
                  src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
                  alt={props.title}
                  className={thumbnails}
                />
              </Link>
            </div>
            <div className={bottom}>
              <div className={usertitleClasses}>
                <Link to={`/channel/${props.author}`}>
                  <img
                    src={`${process.env.REACT_APP_ASSET_URL}/${loadedUser.image}`}
                    alt={props.title}
                    className={avatarClasses}
                  />
                </Link>
                <Link to={`/${props.id}`}>
                  <h2 className="video-item-user-title__title">
                    {props.title}
                  </h2>
                </Link>
              </div>
              <Link to={`/${props.id}`}>
                <div className={infoClasses}>
                  <span className="video-item-author">{loadedUser.name}</span>
                  <span className="video-item-views">
                    {props.views} {props.views !== 1 ? "views" : "view"}
                  </span>
                  <span className="video-item-createdAt">
                    {props.createdAt}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </li>
      )}
    </React.Fragment>
  );
};

export default VideoItem;
