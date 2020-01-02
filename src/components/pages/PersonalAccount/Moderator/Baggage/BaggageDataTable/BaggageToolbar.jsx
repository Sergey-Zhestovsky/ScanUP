import React from "react";

import Toolbar, { ToolbarGroup, ToolbarButton } from "../../../parts/Toolbar/Toolbar";
import RelativeLink from "../../../../../utils/RelativeLink/RelativeLink";
import SearchBar from "../../../parts/SearchBar/SearchBar";

export default function BaggageToolbar(props) {
  return (
    <Toolbar>
      <ToolbarGroup>
        <RelativeLink to="/add"><ToolbarButton>Add</ToolbarButton></RelativeLink>
        <ToolbarButton onClick={props.openSearchBar}>Find one</ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <SearchBar type="text" placeholder="find..." />
      </ToolbarGroup>
    </Toolbar>
  );
}