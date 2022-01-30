import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import SearchIcon from "../../icons/SearchIcon";
import VideoIcon from "../../icons/VideoIcon";
import Sidebar from "../Sidebar/Sidebar";
import MiniSidebar from "../Sidebar/MiniSidebar";
import { DrawerContext } from "../../contexts/sidebar-context";
import { AuthContext } from "../../contexts/auth-context";
import SubMenu from "./SubMenu";
import Backdrop from "../UIElement/Backdrop";
import UserMenu from "./UserMenu";

import "./MainHeader.css";
import MenuIcon from "../../icons/MenuIcon";

const MainHeader = () => {
  const drawerCtx = useContext(DrawerContext);
  const authCtx = useContext(AuthContext);
  const [submenuIsOpen, setSubmenuIsOpen] = useState(false);
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const toggleDrawerHandler = () => {
    if (drawerCtx.drawerIsOpen) {
      drawerCtx.closeDrawer();
    } else {
      drawerCtx.openDrawer();
    }
  };

  const toggleSubmenuHandler = () => {
    setUserMenuIsOpen(false)
    setSubmenuIsOpen((prevState) => !prevState);
  };
  const toggleUserMenuHandler = () => {
    setSubmenuIsOpen(false)
    setUserMenuIsOpen((prevState) => !prevState);
  };

  let mainHeaderClasses = drawerCtx.drawerIsOpen
    ? "main-header"
    : "mini-main-header";
  return (
    <div className={mainHeaderClasses}>
      {drawerCtx.drawerIsOpen && <Sidebar />}
      {!drawerCtx.drawerIsOpen && <MiniSidebar />}
      <div className="main-header-left">
        <button className="main-header-hamburger" onClick={toggleDrawerHandler}>
          <MenuIcon />
        </button>
        <Link to="/" className="main-header-logo">
          <img
            src="https://i.pinimg.com/originals/7d/c9/93/7dc993c70d4adba215b87cafdc59d82d.png"
            alt="Youtube-logo"
            className="main-header-logo__image"
          />
          <span className="main-header-logo__text">YouTube</span>
        </Link>
      </div>
      <div className="main-header-mid">
        <div className="main-header-search">
          <input
            type="text"
            id="search"
            placeholder="Search"
            className="main-header-search__input"
          />
          <div className="main-header-search__icon">
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="main-header-right">
        {authCtx.isLoggedIn && (
          <div className="main-header-video">
            <VideoIcon
              onClick={toggleSubmenuHandler}
              solid={submenuIsOpen ? "yes" : ""}
            />
            {submenuIsOpen && (
              <SubMenu onToggleSubmenuHandler={toggleSubmenuHandler} />
            )}
            {submenuIsOpen && <Backdrop onClick={toggleSubmenuHandler} />}
          </div>
        )}
        {authCtx.isLoggedIn && (
          <div className="main-header-avatar">
            <img
              className="main-header-avatar__image"
              src="https://i.pinimg.com/236x/e9/71/69/e971694c70e8f181f94f0be7a4a60529.jpg"
              alt="user-avatar"
              onClick={toggleUserMenuHandler}
            />
            
          </div>)}
          {userMenuIsOpen && (
            <UserMenu onToggleUserMenuHandler={toggleUserMenuHandler} />
          )}
          {userMenuIsOpen && <Backdrop onClick={toggleUserMenuHandler} />}
        
        {!authCtx.isLoggedIn && (
          <Link className="main-header-login" to="/auth">
            <i className="far fa-user"></i>
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
