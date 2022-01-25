import { useContext, useCallback } from "react";
import { DrawerContext } from "../../../shared/contexts/sidebar-context";

import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../shared/utils/validators";

import "./NewVideoForm.css";

const NewVideoForm = () => {
  const drawerCtx = useContext(DrawerContext);

  const titleInputHandler = useCallback((id, value, isValid) => {}, []);

  const videoFormClasses = drawerCtx.drawerIsOpen
    ? "new-video-form-mini video-form"
    : "new-video-form video-form";
  return (
    <form className={videoFormClasses}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={titleInputHandler}
      />
      <Input
        title="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={titleInputHandler}
      />
    </form>
  );
};

export default NewVideoForm;
