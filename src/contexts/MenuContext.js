import React from "react";

export const MenuContext = React.createContext({
  menu: true,
  setMenu: () => { }
});

export default MenuContext;