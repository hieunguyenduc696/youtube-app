import { useContext } from "react";
import { DrawerContext } from "../../../shared/contexts/sidebar-context";

import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";

import "./NewVideoForm.css";

const NewVideoForm = () => {
  const drawerCtx = useContext(DrawerContext);
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

  const videoSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  const videoFormClasses = drawerCtx.drawerIsOpen
    ? "new-video-form-mini video-form"
    : "new-video-form video-form";
  return (
    <form className={videoFormClasses} onSubmit={videoSubmitHandler}>
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
  );
};

export default NewVideoForm;
