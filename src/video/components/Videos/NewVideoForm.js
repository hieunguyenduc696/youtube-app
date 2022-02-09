import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { DrawerContext } from "../../../shared/contexts/sidebar-context";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import ErrorModal from "../../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElement/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/contexts/auth-context";
import VideoUpload from "../../../shared/components/FormElements/VideoUpload";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload";

import "./NewVideoForm.css";

const NewVideoForm = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const drawerCtx = useContext(DrawerContext);
  const authCtx = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      video: {
        value: null,
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const videoSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("video", formState.inputs.video.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/videos",
        "POST",
        formData,
        {
          Authorization: "Bearer " + authCtx.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };
  const videoFormClasses = drawerCtx.drawerIsOpen
    ? "new-video-form-mini video-form"
    : "new-video-form video-form";
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className={videoFormClasses} onSubmit={videoSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <VideoUpload
          center
          id="video"
          onInput={inputHandler}
          errorText="Please provide a video."
        />
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="Please provide a thumbnail."
          text="Please pick a thumbnail."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD VIDEO
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewVideoForm;
