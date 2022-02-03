import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import ExploreIcon from "../../icons/ExploreIcon";
import HomeIcon from "../../icons/HomeIcon";

import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebar-top">
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <NavLink to="/" exact activeStyle={{ borderBottom: "none" }}>
                {props.path === "/" ? <HomeIcon active /> : <HomeIcon />}
                <span>Home</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to="/feeds/explore"
                activeStyle={{ borderBottom: "none" }}
              >
                {props.path === "/feeds/explore" ? (
                  <ExploreIcon active />
                ) : (
                  <ExploreIcon />
                )}
                <span style={{ marginLeft: "4px" }}>Explore</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
