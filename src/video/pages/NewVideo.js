import React, { useContext, useEffect, useState } from "react";
import { DrawerContext } from "../../shared/contexts/sidebar-context";

import NewVideoForm from "../components/Videos/NewVideoForm";
import MainHeader from "../../shared/components/Navigation/MainHeader";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/contexts/auth-context";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";

import "./NewVideo.css";

const NewVideo = () => {
  const authCtx = useContext(AuthContext);
  const drawerCtx = useContext(DrawerContext);
  const [loadedUser, setLoadedUser] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const formWrapperClasses = drawerCtx.drawerIsOpen
    ? "form-wrapper-mini"
    : "form-wrapper";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${authCtx.userId}`
        );

        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    if (!authCtx.isLoggedIn) {
      return;
    }
    fetchUser();
  }, [sendRequest, authCtx.userId, authCtx.isLoggedIn]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUser && (
        <div className={formWrapperClasses}>
          {!isLoading && loadedUser && <MainHeader user={loadedUser} />}
          <NewVideoForm />
        </div>
      )}
    </React.Fragment>
  );
};

export default NewVideo;
