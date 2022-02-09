import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Comment from "./Comment";
import VideoList from "../components/Videos/VideoList";
import MainHeader from "../../shared/components/Navigation/MainHeader";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LikedIcon from "../../shared/icons/LikedIcon";
import LikeIcon from "../../shared/icons/LikeIcon";
import { DrawerContext } from "../../shared/contexts/sidebar-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/contexts/auth-context";

import "./VideoDetailPage.css";

const VideoDetailPage = () => {
  const [loadedVideo, setLoadedVideo] = useState();
  const [loadedVideos, setLoadedVideos] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const [loadedAuthor, setLoadedAuthor] = useState();
  const [likedUser, setLikedUser] = useState(false);
  const [comments, setComments] = useState();
  const [subscribeClasses, setSubscribeClasses] = useState(false);
  const [likes, setLikes] = useState(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const drawerCtx = useContext(DrawerContext);
  const authCtx = useContext(AuthContext);

  const videoId = useParams().vid;

  const videoDetailPageClasses = drawerCtx.drawerIsOpen
    ? "video-detail-page-mini"
    : "video-detail-page";

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/videos/${videoId}`
        );
        setLoadedVideo(responseData.video);
        console.log(responseData.video);
        setLikes(responseData.video.likes.length);
        if (
          responseData.video.likes.findIndex(
            (item) => item.user_id === authCtx.userId
          ) >= 0
        ) {
          setLikedUser(true);
        } else {
          setLikedUser(false);
        }
      } catch (err) {}
    };
    fetchVideo();
  }, [sendRequest, videoId, authCtx.userId]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/videos"
        );

        setLoadedVideos(responseData.videos);
      } catch (err) {}
    };
    fetchVideos();
  }, [sendRequest]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${authCtx.userId}`
        );

        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    if (!authCtx.isLoggedIn) {
      return;
    }
    fetchUser();
  }, [sendRequest, authCtx.isLoggedIn, authCtx.userId]);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        let responseData;
        if (loadedVideo) {
          responseData = await sendRequest(
            `http://localhost:5000/api/users/${loadedVideo.author}`
          );
        }

        setLoadedAuthor(responseData.user);
        if (
          responseData.user.subscribes.find(
            (item) => item.user_id === authCtx.userId
          )
        ) {
          setSubscribeClasses(true);
        }
      } catch (err) {}
    };
    fetchAuthor();
  }, [loadedVideo, sendRequest, authCtx.userId]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        let responseData;
        if (loadedVideo) {
          responseData = await sendRequest(
            `http://localhost:5000/api/videos/comment/${videoId}`,
            "GET",
            null,
            { Authorization: "Bearer " + authCtx.userId }
          );
        }

        setComments(responseData.items.comments);
      } catch (err) {}
    };
    fetchComment();
  }, [sendRequest, videoId, loadedVideo, authCtx.userId]);

  const toggleLikeHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/videos/togglelike/${videoId}`,
        "POST",
        null,
        { Authorization: "Bearer " + authCtx.token }
      );
      let liked = likedUser;
      setLikedUser((prev) => !prev);
      if (liked) {
        setLikes((prev) => (prev = prev - 1));
      } else {
        setLikes((prev) => (prev = prev + 1));
      }
    } catch (err) {}
  };

  const onCommentHandler = (comment) => {
    let _comment = comment;
    _comment.editor = 1;
    setComments((prev) => (prev ? [_comment, ...prev] : [comment]));
  };

  const deletedHandler = (deletedcommentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedcommentId)
    );
  };

  const editHandler = (editCommentId, content) => {
    let index = comments.findIndex((item) => item.id === editCommentId);
    let _comments = [...comments];
    _comments[index].content = content;
    setComments(_comments);
  };

  //'video-detail-subscribe'
  const toggleSubscribeHandler = async () => {
    setSubscribeClasses((prev) => !prev);
    try {
      await sendRequest(
        "http://localhost:5000/api/users/subscribe",
        "POST",
        JSON.stringify({
          id: loadedAuthor.id,
        }),
        {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  return (
    <div className={videoDetailPageClasses}>
      {!isLoading && <MainHeader user={loadedUser} />}

      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedVideos && loadedVideo && loadedAuthor && (
        <div className="video-detail">
          <div className="video-detail-left">
            <div className="video-detail-left-video">
              <video
                autoPlay
                controls
                width={
                  videoDetailPageClasses === "video-detail-page" ? "870" : "600"
                }
                height={
                  videoDetailPageClasses === "video-detail-page" ? "530" : "500"
                }
                src={`http://localhost:5000/${loadedVideo.video}`}
              ></video>
            </div>

            <h2 className="video-detail-title">{loadedVideo.title}</h2>
            <div className="video-detail-views-date">
              <h3 className="video-detail-views">
                {loadedVideo.views} {loadedVideo.views !== 1 ? "views" : "view"}
              </h3>
              <h3 className="video-detail-date">{loadedVideo.date}</h3>
              <div className="video-detail-like-btn">
                {likedUser ? (
                  <LikedIcon onClick={toggleLikeHandler} />
                ) : (
                  <LikeIcon onClick={toggleLikeHandler} />
                )}
                <div>{likes}</div>
              </div>
            </div>
            <div className="video-detail-user">
              <Link to={`/channel/${loadedVideo.author}`}>
                <img
                  src={`http://localhost:5000/${loadedVideo.image}`}
                  alt={loadedVideo.title}
                  className="video-detail-user-image"
                />
              </Link>
              <div className="video-detail-author">
                <h1>{loadedAuthor.name}</h1>
                <p>{loadedVideo.description}</p>
              </div>
              {loadedAuthor.id !== authCtx.userId && (
                <button
                  className={
                    subscribeClasses
                      ? "video-detail-subscribed"
                      : "video-detail-subscribe"
                  }
                  onClick={toggleSubscribeHandler}
                >
                  SUBSCRIBE
                </button>
              )}
              {loadedAuthor.id === authCtx.userId && (
                <Link
                  to={`/channel/${authCtx.userId}/videos`}
                  className="video-detail-edit-video"
                >
                  <button>EDIT VIDEO</button>
                </Link>
              )}
            </div>

            {/* Comment */}
            {!isLoading && (
              <Comment
                user={loadedUser}
                comments={comments}
                commentHandler={onCommentHandler}
                onCommentDeleteHandler={deletedHandler}
                onCommentEditHandler={editHandler}
              />
            )}
          </div>
          <div className="video-detail-right">
            <VideoList videos={loadedVideos} small="yes" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetailPage;
