import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/contexts/auth-context";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import "./Auth.css";

const Auth = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        authCtx.login(responseData.userId, responseData.token);
        history.push("/");
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );

        authCtx.login(responseData.userId, responseData.token);
        history.push("/");
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="auth">
        <div className="auth-content">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Login Required</h2>
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                type="text"
                id="name"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="Please enter a name."
              />
            )}
            {!isLoginMode && (
              <ImageUpload
                center
                id="image"
                onInput={inputHandler}
                errorText="Please pick an image."
                text="Please pick an avatar."
              />
            )}
            <Input
              element="input"
              type="email"
              id="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
              errorText="Please enter a valid email."
            />
            <Input
              element="input"
              type="password"
              id="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              onInput={inputHandler}
              errorText="Please enter a valid password, at least 6 characters."
            />
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          </form>
          <Button onClick={switchModeHandler} inverse>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
