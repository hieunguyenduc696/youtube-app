import React, { useCallback, useState, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import Videos from "./video/pages/Videos";
// import NewVideo from "./video/pages/NewVideo";
// import VideoDetailPage from "./video/pages/VideoDetailPage";
// import UpdateVideo from "./video/pages/UpdateVideo";
// import Channel from "./video/pages/Channel";
// import About from "./video/pages/About";
// import VideoEdit from "./video/pages/VideoEdit";
// import Auth from "./user/pages/Auth";

import { DrawerContext } from "./shared/contexts/sidebar-context";
import { AuthContext } from "./shared/contexts/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElement/LoadingSpinner";

const Videos = React.lazy(() => import('./video/pages/Videos'))
const NewVideo = React.lazy(() => import("./video/pages/NewVideo"));
const UpdateVideo = React.lazy(() => import("./video/pages/UpdateVideo"));
const VideoDetailPage = React.lazy(() =>
  import("./video/pages/VideoDetailPage")
);
const Channel = React.lazy(() => import("./video/pages/Channel"));
const About = React.lazy(() => import("./video/pages/About"));
const VideoEdit = React.lazy(() => import("./video/pages/VideoEdit"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

function App() {
  const [drawerIsOpen, setDrawerIsOpen] = useState();
  const { token, login, logout, userId } = useAuth();
  const openDrawer = useCallback(() => {
    setDrawerIsOpen(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setDrawerIsOpen(false);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Videos />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/videos/new" exact>
          <NewVideo />
        </Route>
        <Route path="/videos/:vid">
          <UpdateVideo />
        </Route>
        <Route path="/channel/:uid" exact>
          <Channel />
        </Route>
        <Route path="/channel/:uid/about" exact>
          <About />
        </Route>
        <Route path="/channel/:uid/videos" exact>
          <VideoEdit />
        </Route>
        <Route path="/:vid">
          <VideoDetailPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Videos />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/channel/:uid" exact>
          <Channel />
        </Route>
        <Route path="/channel/:uid/about" exact>
          <About />
        </Route>
        <Route path="/:vid">
          <VideoDetailPage />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <DrawerContext.Provider
        value={{
          drawerIsOpen: drawerIsOpen,
          openDrawer: openDrawer,
          closeDrawer: closeDrawer,
        }}
      >
        <Router>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </Router>
      </DrawerContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
