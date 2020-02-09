import { faSuitcase, faHistory, faChartBar } from "@fortawesome/free-solid-svg-icons";
import Baggage from "../components/pages/PersonalAccount/Moderator/Baggage/Baggage";
import History from "../components/pages/PersonalAccount/Moderator/History/History";
import Statistics from "../components/pages/PersonalAccount/Moderator/Statistics/Statistics";

export default [{
  name: "Baggage",
  link: "/baggage",
  icon: faSuitcase,
  Component: Baggage
}, {
  name: "History",
  link: "/history",
  icon: faHistory,
  Component: History
}, {
  name: "Statistics",
  link: "/statistics",
  icon: faChartBar,
  Component: Statistics
}];