import { faSuitcase, faHistory, faChartBar } from "@fortawesome/free-solid-svg-icons";
import Baggage from "../components/pages/PersonalAccount/Moderator/Baggage/Baggage";

export default [{
  name: "Baggage",
  link: "/baggage",
  icon: faSuitcase,
  Component: Baggage
}, {
  name: "History",
  link: "/history",
  icon: faHistory,
  Component: () => (2)
}, {
  name: "Statistics",
  link: "/statistics",
  icon: faChartBar,
  Component: () => (3)
}];