import { faConciergeBell, faUsers, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import Receptions from "../components/pages/PersonalAccount/GlobalModerator/Receptions/Receptions";
import Moderators from "../components/pages/PersonalAccount/GlobalModerator/Moderators/Moderators";

export default [{
  name: "Receptions",
  link: "/receptions",
  icon: faConciergeBell,
  Component: Receptions
}, {
  name: "Moderators",
  link: "/moderators",
  icon: faUsers,
  Component: Moderators
}, {
  name: "Complaints",
  link: "/complaints",
  icon: faCommentAlt,
  Component: () => (3)
}];