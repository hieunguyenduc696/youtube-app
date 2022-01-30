import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import ExploreIcon from "../../icons/ExploreIcon";
import HomeIcon from "../../icons/HomeIcon";

import "./Sidebar.css";

const Sidebar = () => {
  const [newActiveLink, setNewActiveLink] = useState(null);
  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebar-top">
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <NavLink
                to="/"
                exact
                activeStyle={{borderBottom: 'none'}}
                isActive={(match, location) => {
                  match && setNewActiveLink(1); // <-- set active index
                  return match; // <-- return boolean
                }}
              >
                {newActiveLink === 1 ? <HomeIcon active /> : <HomeIcon />}
                <span>Home</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to="/feeds/explore"
                activeStyle={{borderBottom: 'none'}}
                isActive={(match, location) => {
                  match && setNewActiveLink(2); // <-- set active index
                  return match; // <-- return boolean
                }}
              >
                {newActiveLink === 2 ? <ExploreIcon active /> : <ExploreIcon />}
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
