import React from "react";
import { Route } from "react-router-dom";

import Baggage from "./Baggage/Baggage";
import RelativeSwitch from "../../../utils/RelativeSwitch/RelativeSwitch";

export default function Moderator(props) {
  return (
    <RelativeSwitch>
      <Route path="/baggage" component={Baggage} />
      <Route path="/history" render={() => (
        2
      )} />
      <Route path="/statistics" render={() => (
        3
      )} />
    </RelativeSwitch>
  );
}