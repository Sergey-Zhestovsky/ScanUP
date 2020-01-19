import { faUsers, faGlobe } from "@fortawesome/free-solid-svg-icons";
import TransportSystems from "../components/pages/PersonalAccount/GlobalAdministrator/TransportSystems/TransportSystems";
import Moderators from "../components/pages/PersonalAccount/GlobalAdministrator/Moderators/Moderators";

export default [{
  name: "Transport sys.",
  link: "/transport-systems",
  icon: faGlobe,
  Component: TransportSystems
}, {
  name: "Moderators",
  link: "/moderators",
  icon: faUsers,
  Component: Moderators
}];