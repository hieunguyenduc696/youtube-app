import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebar-top">
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <NavLink to="/" exact>
                <i className="fas fa-home"></i>
                <span>Home</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/feeds/explore">
                <i className="fa fa-compass"></i>
                <span style={{'marginLeft': '4px'}}>Explore</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
