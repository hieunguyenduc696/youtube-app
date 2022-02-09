import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import VideoList from "../components/Videos/VideoList";
import MainHeader from "../../shared/components/Navigation/MainHeader";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/contexts/auth-context";

const Videos = () => {
  const [loadedVideos, setLoadedVideos] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const [loadedUser, setLoadedUser] = useState();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/videos"
        );
        setLoadedVideos(responseData.videos);
      } catch (err) {}
    };
    fetchVideos();
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
  }, [sendRequest, authCtx.isLoggedIn, authCtx.userId]);

  const history = useHistory();
  const directToUploadVideoPageHandler = () => {
    console.log("ehehehhe");
    if (authCtx.isLoggedIn) {
      history.push("/videos/new");
    } else {
      history.push("/auth");
    }
  };

  return (
    <div>
      {!isLoading && <MainHeader user={loadedUser} />}
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedVideos && (
        <VideoList
          videos={loadedVideos}
          directToUploadVideoPage={directToUploadVideoPageHandler}
        />
      )}
    </div>
  );
};

export default Videos;
