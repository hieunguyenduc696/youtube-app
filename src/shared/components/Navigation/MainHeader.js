import React from "react";

import SearchIcon from "../../icons/SearchIcon";
import VideoIcon from "../../icons/VideoIcon";

import "./MainHeader.css";

const MainHeader = () => {
  return (
    <div className="main-header">
      <div className="main-header-left">
        <div className="main-header-hamburger">
          <span />
          <span />
          <span />
        </div>
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
