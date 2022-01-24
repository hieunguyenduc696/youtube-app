import React, { useState, useContext } from "react";

import SearchIcon from "../../icons/SearchIcon";
import VideoIcon from "../../icons/VideoIcon";
import Sidebar from "../Sidebar/Sidebar";
import MiniSidebar from "../Sidebar/MiniSidebar";
import { DrawerContext } from "../../contexts/sidebar-context";

import "./MainHeader.css";

const MainHeader = () => {
  const drawerCtx = useContext(DrawerContext);
  const toggleDrawerHandler = () => {
    if (drawerCtx.drawerIsOpen) {
      drawerCtx.closeDrawer();
    } else {
      drawerCtx.openDrawer();
    }
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
          <span />
          <span />
          <span />
        </button>
        <div className="main-header-logo">
          <img
            src="https://i.pinimg.com/originals/7d/c9/93/7dc993c70d4adba215b87cafdc59d82d.png"
            alt="Youtube-logo"
            className="main-header-logo__image"
          />
          <span className="main-header-logo__text">YouTube</span>
        </div>
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
        <div className="main-header-video">
          <VideoIcon />
        </div>
        <div className="main-header-avatar">
          <img
            className="main-header-avatar__image"
            src="https://lh3.googleusercontent.com/a-/AOh14GgsCLB46_vvZ3dbgDBq6QRjsr1bhfznFiCRMeRWsg=s360-p-rw-no"
            alt="user-avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
