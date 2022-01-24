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
              </NavLink>
            </li>
            <li className={styles['sidebar-item']}>
              <NavLink to="/feeds/explore">
                <i className="fa fa-compass"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
