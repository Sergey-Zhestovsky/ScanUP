import { faSuitcase, faHistory, faChartBar } from "@fortawesome/free-solid-svg-icons";
import Baggage from "../components/pages/PersonalAccount/Moderator/Baggage/Baggage";

export default {
  baggage: {
    name: "Baggage",
    link: "/baggage",
    icon: faSuitcase,
    Component: Baggage
  },
  history: {
    name: "History",
    link: "/history",
    icon: faHistory,
    Component: () => (2)
  },
  statistics: {
    name: "Statistics",
    link: "/statistics",
    icon: faChartBar,
    Component: () => (3)
  }
};