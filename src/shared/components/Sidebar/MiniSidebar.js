import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

import ExploreIcon from "../../icons/ExploreIcon";
import HomeIcon from "../../icons/HomeIcon";

import styles from "./MiniSidebar.module.css";

const Sidebar = () => {
  const [newActiveLink, setNewActiveLink] = useState(null);
  return (
    <Fragment>
      <div className={styles.sidebar}>
        <div className={styles["sidebar-top"]}>
          <ul className={styles["sidebar-list"]}>
            <li className={styles["sidebar-item"]}>
              <NavLink
                to="/"
                exact
                activeStyle={{ borderBottom: "none" }}
                isActive={(match, location) => {
                  match && setNewActiveLink(1); // <-- set active index
                  return match; // <-- return boolean
                }}
              >
                {newActiveLink === 1 ? <HomeIcon active /> : <HomeIcon />}
                <span>Home</span>
              </NavLink>
            </li>
            <li className={styles["sidebar-item"]}>
            <NavLink
                to="/feeds/explore"
                activeStyle={{borderBottom: 'none'}}
                isActive={(match, location) => {
                  match && setNewActiveLink(2); // <-- set active index
                  return match; // <-- return boolean
                }}
              >
                {newActiveLink === 2 ? <ExploreIcon active /> : <ExploreIcon />}
                <span>Explore</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
