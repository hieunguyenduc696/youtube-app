import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import ExploreIcon from "../../icons/ExploreIcon";
import HomeIcon from "../../icons/HomeIcon";

import styles from "./MiniSidebar.module.css";

const MiniSidebar = (props) => {
  return (
    <Fragment>
      <div className={styles.sidebar}>
        <div className={styles["sidebar-top"]}>
          <ul className={styles["sidebar-list"]}>
            <li className={styles["sidebar-item"]}>
              <NavLink to="/" exact activeStyle={{ borderBottom: "none" }}>
                {props.path === "/" ? <HomeIcon active /> : <HomeIcon />}
                <span>Home</span>
              </NavLink>
            </li>
            <li className={styles["sidebar-item"]}>
              <NavLink
                to="/feeds/explore"
                activeStyle={{ borderBottom: "none" }}
              >
                {props.path === "/feeds/explore" ? (
                  <ExploreIcon active />
                ) : (
                  <ExploreIcon />
                )}
                <span>Explore</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default MiniSidebar;
