import { useContext } from "react";
import { DrawerContext } from "../../shared/contexts/sidebar-context";

import NewVideoForm from "../components/Videos/NewVideoForm";

import './NewVideo.css'

const NewVideo = () => {
  const drawerCtx = useContext(DrawerContext)
  const formWrapperClasses = drawerCtx.drawerIsOpen ? 'form-wrapper-mini' : 'form-wrapper'
  return <div className={formWrapperClasses}>
    <NewVideoForm />
  </div>;
};

export default NewVideo;
