import React from "react";

import Toolbar, { ToolbarGroup } from "../../../../parts/Toolbar/Toolbar";
import SearchBar from "../../../../parts/SearchBar/SearchBar";

export default function ModeratorsToolbar(props) {
  return (
    <Toolbar>
      <ToolbarGroup></ToolbarGroup>
      <ToolbarGroup>
        <SearchBar type="text" placeholder="find..." />
      </ToolbarGroup>
    </Toolbar>
  );
}