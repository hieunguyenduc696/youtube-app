import React from "react";

import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../shared/utils/validators";

import './UpdateVideoForm.css'

const UpdateVideoForm = (props) => {
  const video = props.video;
  if (!video) {
    return <p>Could not find video.</p>;
  }
  return (
    <form className="update-video-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={video.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 characters)."
        onInput={() => {}}
        value={video.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>UPDATE VIDEO</Button>
    </form>
  );
};

export default UpdateVideoForm;
