import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Videos from "./video/pages/Videos";
import NewVideo from "./video/pages/NewVideo";
import MainHeader from "./shared/components/Navigation/MainHeader";
import { DrawerContext } from "./shared/contexts/sidebar-context";

function App() {
  const [drawerIsOpen, setDrawerIsOpen] = useState();
  const openDrawer = useCallback(() => {
    setDrawerIsOpen(true);
  });
  const closeDrawer = useCallback(() => {
    setDrawerIsOpen(false);
  });
  return (
    <DrawerContext.Provider
      value={{
        drawerIsOpen: drawerIsOpen,
        openDrawer: openDrawer,
        closeDrawer: closeDrawer,
      }}
    >
      <Router>
        <MainHeader />
        <Switch>
          <Route path="/" exact>
            <Videos />
          </Route>
          <Route path="/videos/new" exact>
            <NewVideo />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </DrawerContext.Provider>
  );
}

export default App;
