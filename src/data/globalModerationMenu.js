import { faConciergeBell, faUsers, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import Baggage from "../components/pages/PersonalAccount/Moderator/Baggage/Baggage";

export default [{
  name: "Receptions",
  link: "/receptions",
  icon: faConciergeBell,
  Component: () => (1)
}, {
  name: "Moderators",
  link: "/moderators",
  icon: faUsers,
  Component: () => (2)
}, {
  name: "Complaints",
  link: "/complaints",
  icon: faCommentAlt,
  Component: () => (3)
}];