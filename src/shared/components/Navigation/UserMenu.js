import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";

import "./UserMenu.css";
import UserIcon from "../../icons/UserIcon";
import SignOutIcon from "../../icons/SignOutIcon";

const UserMenu = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const directToYourChannelPageHandler = () => {
    history.push(`/channel/${authCtx.userId}`);
    props.onToggleUserMenuHandler();
  };

  const logoutHandler = () => {
    authCtx.logout();
    props.onToggleUserMenuHandler();
    if (history.location.pathname.startsWith("/channel")) {
      history.push("/");
    }
  };

  return (
    <ul className="user-menu-list">
      <li className="user-menu-item" onClick={directToYourChannelPageHandler}>
        <UserIcon />
        <span>Your channel</span>
      </li>
      <li className="user-menu-item" onClick={logoutHandler}>
        <SignOutIcon />
        <span>Sign out</span>
      </li>
    </ul>
  );
};

export default UserMenu;
