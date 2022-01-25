import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import styles from "./MiniSidebar.module.css";

const Sidebar = () => {
  return (
    <Fragment>
      <div className={styles.sidebar}>
        <div className={styles["sidebar-top"]}>
          <ul className={styles["sidebar-list"]}>
            <li className={styles["sidebar-item"]}>
              <NavLink to="/" exact>
                <i className="fas fa-home"></i>
                <span>Home</span>
              </NavLink>
            </li>
            <li className={styles['sidebar-item']}>
              <NavLink to="/feeds/explore">
                <i className="fa fa-compass"></i>
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
