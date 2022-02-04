import React, { useCallback, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Videos from "./video/pages/Videos";
import NewVideo from "./video/pages/NewVideo";
import VideoDetailPage from "./video/pages/VideoDetailPage";
import UpdateVideo from "./video/pages/UpdateVideo";
import Channel from "./video/pages/Channel";
import About from "./video/pages/About";
import VideoEdit from "./video/pages/VideoEdit";

import { DrawerContext } from "./shared/contexts/sidebar-context";
import { AuthContext } from "./shared/contexts/auth-context";
import Auth from "./user/pages/Auth";

function App() {
  const [drawerIsOpen, setDrawerIsOpen] = useState();
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const openDrawer = useCallback(() => {
    setDrawerIsOpen(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setDrawerIsOpen(false);
  }, []);
  const login = useCallback((uid, token) => {
    setToken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    );
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData')
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token)
    }
  }, [login])

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
        <Router>{routes}</Router>
      </DrawerContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
