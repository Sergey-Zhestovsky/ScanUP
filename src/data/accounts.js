import privileges from "./privileges";
import globalAdministatorMenu from "./globalAdministatorMenu";
import moderationMenu from "./moderationMenu";

export default {
  [privileges.GLOBAL_ADMINISTRATOR.index]: {
    menu: globalAdministatorMenu
  },
  [privileges.MODERATOR.index]: {
    menu: moderationMenu
  }
};