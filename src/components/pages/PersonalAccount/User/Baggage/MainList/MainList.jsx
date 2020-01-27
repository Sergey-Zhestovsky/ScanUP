import React from "react";

import Title, { titleStyle } from "../../../parts/Title/Title";
import BaggageGrid from "./BaggageGrid/BaggageGrid";

export default function MainList(props) {
  return (
    <React.Fragment>
      <Title style={titleStyle.CAPITAL}>Active baggages</Title>
      <BaggageGrid />
    </React.Fragment>
  );
}