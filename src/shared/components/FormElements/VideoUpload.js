import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

import "./VideoUpload.css";

const VideoUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".mkv,.mp4"
        onChange={pickedHandler}
        autoComplete="current-password"
      />
      <div className={`video-upload ${props.center && "center"}`}>
        <div className="video-upload__preview">
          {previewUrl && <video width="100%" height="100%" src={previewUrl} alt="Preview" controls></video>}
          {!previewUrl && <p>Please pick a video.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK VIDEO
        </Button>
      </div>
    </div>
  );
};

export default VideoUpload;
