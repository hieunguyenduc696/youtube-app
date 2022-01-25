import { useContext } from "react";
import { DrawerContext } from "../../../shared/contexts/sidebar-context";

import Input from "../../../shared/components/FormElements/Input";

import "./NewVideoForm.css";

const NewVideoForm = () => {
  const drawerCtx = useContext(DrawerContext);
  const videoFormClasses = drawerCtx.drawerIsOpen
    ? "new-video-form-mini video-form"
    : "new-video-form video-form";
  return (
    <form className={videoFormClasses}>
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[]}
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewVideoForm;
