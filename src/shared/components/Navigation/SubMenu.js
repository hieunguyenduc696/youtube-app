import { useHistory } from "react-router-dom";

import "./Submenu.css";

const SubMenu = (props) => {
  const history = useHistory();

  const directToUploadPageHandler = () => {
    history.push("/videos/new");
    props.onToggleSubmenuHandler();
  };
  return (
    <ul className="submenu-list">
      <li className="submenu-item" onClick={directToUploadPageHandler}>
        <i className="fa fa-upload"></i>
        <span>Upload Video</span>
      </li>
    </ul>
  );
};

export default SubMenu;
