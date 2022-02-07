import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/contexts/auth-context";

import "./Comment.css";

const Comment = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const videoId = useParams().vid;
  const [formState, inputHandler] = useForm(
    {
      content: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const commentHandler = () => {
    if (!authCtx.isLoggedIn) {
      history.push("/auth");
    }
  };

  const commentSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/videos/comment/${videoId}`,
        "POST",
        JSON.stringify({
          content: formState.inputs.content.value,
        }),
        {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        }
      );
      props.commentHandler(responseData.items);
    } catch (err) {}
  };

  const user = props.user;
  const comments = props.comments;
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className="comment-container">
          <form onSubmit={commentSubmitHandler}>
            <div className="comment-container-row">
              <div className="comment-container-col">
                {user && (
                  <img
                    src={`http://localhost:5000/${user.image}`}
                    alt={user.name}
                    className="comment-container-col__image"
                  />
                )}
                {!user && <i className="far fa-user-circle"></i>}
              </div>
              <div className="comment-container-col">
                <div
                  className="comment-container-col__info"
                  onClick={commentHandler}
                >
                  <Input
                    id="content"
                    element="input"
                    placeholder="Add a public comment..."
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    label=""
                  />
                </div>
              </div>
            </div>
            <div className="comment-container-row">
              <div className="comment-container__actions">
                <button className="comment-container__actions-cancel">
                  CANCEL
                </button>
                <Button
                  type="submit"
                  disabled={!formState.isValid}
                  style={{ background: "#065FD4", border: "none" }}
                >
                  COMMENT
                </Button>
              </div>
            </div>
          </form>

          {!isLoading &&
            comments &&
            comments.map((comment) => (
              <div
                className="comment-container-row"
                key={comment.id}
                style={{ marginBottom: "30px" }}
              >
                <div className="comment-container-col">
                  <img
                    src={`http://localhost:5000/${comment.image}`}
                    alt="avt"
                    className="comment-container-col__image"
                  />
                </div>
                <div className="comment-container-col">
                  <div className="comment-container-col__info">
                    <div className="comment-container-col__name-time">
                      <h3 className="comment-container-col__name">
                        {comment.name}
                      </h3>
                      <span className="comment-container-col__time">
                        {comment.date}
                      </span>
                    </div>
                    <div className="comment-container-col__content">
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Comment;
