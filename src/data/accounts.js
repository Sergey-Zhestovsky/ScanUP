import privileges from "./privileges";
import globalAdministatorMenu from "./globalAdministatorMenu";
import moderationMenu from "./moderationMenu";
import globalModerationMenu from "./globalModerationMenu";

export default {
  [privileges.GLOBAL_ADMINISTRATOR.index]: {
    menu: globalAdministatorMenu
  },
  [privileges.MODERATOR.index]: {
    menu: moderationMenu
  },
  [privileges.GLOBAL_MODERATOR.index]: {
    menu: globalModerationMenu
  }
};