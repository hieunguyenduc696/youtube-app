import { createContext } from "react";

export const DrawerContext = createContext({
  drawerIsOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});
