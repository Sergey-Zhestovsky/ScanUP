import { faUsers, faGlobe } from "@fortawesome/free-solid-svg-icons";
import TransportSystems from "../components/pages/PersonalAccount/GlobalAdministrator/TransportSystems/TransportSystems";

export default {
  transportSystems: {
    name: "Transport sys.",
    link: "/transport-systems",
    icon: faGlobe,
    Component: TransportSystems
  },
  users: {
    name: "Moderators",
    link: "/moderators",
    icon: faUsers,
    Component: () => (2)
  }
};