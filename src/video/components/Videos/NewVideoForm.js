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
      videoId: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory()

  const videoSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/videos",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          videoId: formState.inputs.videoId.value,
          author: authCtx.userId,
        }),
        {'Content-Type': 'application/json'}
      );
      history.push('/')
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
        <Input
          id="videoId"
          element="input"
          type="text"
          label="VideoId"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid videoId."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD VIDEO
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewVideoForm;
