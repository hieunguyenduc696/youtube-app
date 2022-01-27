import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";

import "./UserMenu.css";

const UserMenu = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const directToYourChannelPageHandler = () => {
    history.push("/channel/u1");
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
        <span>YOUR CHANNEL</span>
      </li>
      <li className="user-menu-item" onClick={logoutHandler}>
        <i className="fas fa-sign-out-alt"></i>
        <span>LOGOUT</span>
      </li>
    </ul>
  );
};

export default UserMenu;
