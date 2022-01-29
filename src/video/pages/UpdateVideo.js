import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

const UpdateVideo = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedVideo, setLoadedVideo] = useState();
  const drawerCtx = useContext(DrawerContext);
  const updateVideoClasses = drawerCtx.drawerIsOpen
    ? "update-video-mini"
    : "update-video";

  const videoId = useParams().vid;

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
          `http://localhost:5000/api/videos/${videoId}`
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
  }, [sendRequest, videoId]);

  if (!loadedVideo && !error) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }
  const videoUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className={updateVideoClasses}>
        <form className="update-video-form" onSubmit={videoUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            value={formState.inputs.title.value}
            valid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min 5 characters)."
            onInput={inputHandler}
            value={formState.inputs.description.value}
            valid={formState.inputs.description.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE VIDEO
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UpdateVideo;
