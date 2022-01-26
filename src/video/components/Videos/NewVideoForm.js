import { useContext, useCallback, useReducer } from "react";
import { DrawerContext } from "../../../shared/contexts/sidebar-context";

import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";

import "./NewVideoForm.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewVideoForm = () => {
  const drawerCtx = useContext(DrawerContext);
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

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
