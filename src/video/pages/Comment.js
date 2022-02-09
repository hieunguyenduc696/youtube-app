import React, { useContext, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import Button from "../../shared/components/FormElements/Button";
import EditIcon from "../../shared/icons/EditIcon";
import DeleteIcon from "../../shared/icons/DeleteIcon";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/contexts/auth-context";

import "./Comment.css";

const Comment = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isEditting, setIsEditting] = useState(false);
  const [isCommentting, setIsCommentting] = useState(false);
  const [loadedComment, setLoadedComment] = useState();
  const [_comment, setComment] = useState();
  const [idx, setIdx] = useState(0);
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const videoId = useParams().vid;

  const user = props.user;
  const comments = props.comments;

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
    setIsCommentting(true);
    setIsEditting(false);
  };

  const commentSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/videos/comment/${videoId}`,
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
      setIsEditting(false);
      console.log(responseData.items);
    } catch (err) {}
  };

  const cancelCommentHandler = () => {
    setIsCommentting(false);
  };

  const editClickHandler = async (commentId) => {
    setIsEditting(true);
    setIdx(commentId);

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/videos/comment/${videoId}/${commentId}`
      );
      setLoadedComment(responseData.items);
      setComment(responseData.items.content);
    } catch (err) {}
  };

  const cancelEditHandler = () => {
    setIsEditting(false);
    setIdx(null);
  };

  const commentDeletedHandler = (deletedcommentId) => {
    props.onCommentDeleteHandler(deletedcommentId);
  };

  const inputCommentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  const saveCommentHandler = async (commentId) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/videos/comment/${videoId}`,
        "PATCH",
        JSON.stringify({
          id: commentId,
          content: _comment,
        }),
        {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        }
      );
      setIsEditting(false);
      setIdx(null);
      props.onCommentEditHandler(commentId, _comment);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className="comment-container">
          <form onSubmit={commentSubmitHandler}>
            <div className="comment-container-row">
              <div
                className="comment-container-col"
                style={{ marginBottom: "0px" }}
              >
                {user && (
                  <Link to={`/channel/${user.id}`}>
                    <img
                      src={`${process.env.REACT_APP_ASSET_URL}/${user.image}`}
                      alt={user.name}
                      className="comment-container-col__image"
                    />
                  </Link>
                )}
                {!user && <i className="far fa-user-circle"></i>}
              </div>
              <div
                className="comment-container-col"
                style={{ marginBottom: "0px" }}
              >
                <div onClick={commentHandler}>
                  <Input
                    id="content"
                    element="input"
                    placeholder="Add a public comment..."
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                  />
                </div>
              </div>
            </div>
            {isCommentting && (
              <div className="comment-container-row" style={{ marginTop: "0" }}>
                <div className="comment-container__actions">
                  <button
                    className="comment-container__actions-cancel"
                    type="button"
                    onClick={cancelCommentHandler}
                  >
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
            )}
          </form>

          {!isLoading &&
            comments &&
            comments.map((comment, index) => (
              <React.Fragment key={comment.id}>
                <div className="comment-container-row">
                  <div className="comment-container-col">
                    <Link to={`/channel/${comment.user_id}`}>
                      <img
                        src={`${process.env.REACT_APP_ASSET_URL}/${comment.image}`}
                        alt="avt"
                        className="comment-container-col__image"
                      />
                    </Link>
                  </div>
                  {isEditting && comment.id === idx && (
                    <div className="comment-container-col">
                      {loadedComment && _comment && (
                        <input
                          className="comment-container-col__input"
                          value={_comment}
                          onChange={inputCommentChangeHandler}
                        />
                      )}
                    </div>
                  )}
                  {(!isEditting || comment.id !== idx) && (
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

                      {comment.editor === 1 && (
                        <div className="comment-container-col__info-edit">
                          <EditIcon
                            text="Edit comment"
                            videoId={videoId}
                            commentId={comment.id}
                            onClick={editClickHandler}
                            isEditting={isEditting}
                          />
                          <DeleteIcon
                            commentId={comment.id}
                            onDelete={commentDeletedHandler}
                            videoId={videoId}
                            text="Delete comment"
                            ident="comment"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {isEditting && comment.id === idx && (
                  <div
                    className="comment-container-row comment-container-row-1"
                    style={{ marginTop: "0" }}
                  >
                    <button
                      className="comment-container__actions-cancel"
                      type="button"
                      onClick={cancelEditHandler}
                    >
                      CANCEL
                    </button>
                    <Button
                      type="submit"
                      style={{ background: "#065FD4", border: "none" }}
                      onClick={saveCommentHandler}
                      commentId={comment.id}
                    >
                      SAVE
                    </Button>
                  </div>
                )}
              </React.Fragment>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Comment;
