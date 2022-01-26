import React, { useCallback, useState } from "react";
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

import { DrawerContext } from "./shared/contexts/sidebar-context";
import { AuthContext } from "./shared/contexts/auth-context";
import Auth from "./user/pages/Auth";

function App() {
  const [drawerIsOpen, setDrawerIsOpen] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const openDrawer = useCallback(() => {
    setDrawerIsOpen(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setDrawerIsOpen(false);
  }, []);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <DrawerContext.Provider
        value={{
          drawerIsOpen: drawerIsOpen,
          openDrawer: openDrawer,
          closeDrawer: closeDrawer,
        }}
      >
        <Router>
          <Switch>
            <Route path="/" exact>
              <Videos />
            </Route>
            <Route path="/videos/new" exact>
              <NewVideo />
            </Route>
            <Route path="/videos/:vid">
              <UpdateVideo />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/:vid">
              <VideoDetailPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </DrawerContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
