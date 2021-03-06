import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { AuthContext } from "../../shared/contexts/auth-context";
import { DrawerContext } from "../../shared/contexts/sidebar-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import "./UpdateVideo.css";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import MainHeader from "../../shared/components/Navigation/MainHeader";

const UpdateVideo = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedVideo, setLoadedVideo] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const drawerCtx = useContext(DrawerContext);
  const authCtx = useContext(AuthContext);
  const updateVideoClasses = drawerCtx.drawerIsOpen
    ? "update-video-mini"
    : "update-video";

  const videoId = useParams().vid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/videos/${videoId}`
        );

        setLoadedVideo(responseData.video);
        setFormData(
          {
            title: {
              value: responseData.video.title,
              isValid: true,
            },
            description: {
              value: responseData.video.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchVideo();

    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${authCtx.userId}`
        );

        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    if (!authCtx.isLoggedIn) {
      return;
    }
    fetchUser();
  }, [sendRequest, videoId, setFormData, authCtx.isLoggedIn, authCtx.userId]);

  if (!loadedVideo && !error) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }
  const videoUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/videos/${videoId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        }
      );
      history.push(`/channel/${authCtx.userId}/videos`);
    } catch (err) {}
  };

  if (isLoading || !loadedUser) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedVideo && !error && !loadedUser) {
    return (
      <div className="center">
        <h2>Could not find video!</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      {!isLoading && loadedUser && <MainHeader user={loadedUser} />}
      <ErrorModal error={error} onClear={clearError} />
      <div className={updateVideoClasses}>
        {!isLoading && loadedVideo && (
          <form
            className="update-video-form"
            onSubmit={videoUpdateSubmitHandler}
          >
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
              value={loadedVideo.title}
              valid={true}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (min 5 characters)."
              onInput={inputHandler}
              value={loadedVideo.description}
              valid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE VIDEO
            </Button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default UpdateVideo;
