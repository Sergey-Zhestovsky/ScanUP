import privileges from "./privileges";
import moderationMenu from "./moderationMenu";

export default {
  [privileges.MODERATOR.index]: {
    menu: moderationMenu
  }
};