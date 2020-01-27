import { faSuitcase, faHistory } from "@fortawesome/free-solid-svg-icons";
import Baggage from "../components/pages/PersonalAccount/User/Baggage/Baggage";
import History from "../components/pages/PersonalAccount/User/History/History";

export default [{
  name: "Baggages",
  link: "/baggage",
  icon: faSuitcase,
  Component: Baggage
}, {
  name: "History",
  link: "/history",
  icon: faHistory,
  Component: History
}];