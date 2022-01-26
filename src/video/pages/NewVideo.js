import { useContext } from "react";
import { DrawerContext } from "../../shared/contexts/sidebar-context";

import NewVideoForm from "../components/Videos/NewVideoForm";
import MainHeader from "../../shared/components/Navigation/MainHeader";

import './NewVideo.css'

const NewVideo = () => {
  const drawerCtx = useContext(DrawerContext)
  const formWrapperClasses = drawerCtx.drawerIsOpen ? 'form-wrapper-mini' : 'form-wrapper'
  return <div className={formWrapperClasses}>
    <MainHeader />
    <NewVideoForm />
  </div>;
};

export default NewVideo;
