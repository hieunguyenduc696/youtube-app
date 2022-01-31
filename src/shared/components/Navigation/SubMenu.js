import { useHistory } from "react-router-dom";
import UploadIcon from "../../icons/UploadIcon";

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
        <UploadIcon />
        <span>Upload Video</span>
      </li>
    </ul>
  );
};

export default SubMenu;
