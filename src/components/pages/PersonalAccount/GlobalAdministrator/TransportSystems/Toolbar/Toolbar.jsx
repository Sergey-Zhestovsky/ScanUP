import React from "react";

import Toolbar, { ToolbarGroup, ToolbarButton } from "../../../parts/Toolbar/Toolbar";
import SearchBar from "../../../parts/SearchBar/SearchBar";

export default function TransportSystemsToolbar(props) {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton onClick={props.clickHandler.bind(null, "addTSForm")}>Add TS</ToolbarButton>
        <ToolbarButton onClick={props.clickHandler.bind(null, "addReceptionForm")}>Add reception</ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <SearchBar type="text" placeholder="find..." />
      </ToolbarGroup>
    </Toolbar>
  );
}