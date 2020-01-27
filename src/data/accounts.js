import privileges from "./privileges";
import globalAdministatorMenu from "./globalAdministatorMenu";
import moderationMenu from "./moderationMenu";
import globalModerationMenu from "./globalModerationMenu";
import userMenu from "./userMenu";

export default {
  [privileges.GLOBAL_ADMINISTRATOR.index]: {
    menu: globalAdministatorMenu
  },
  [privileges.MODERATOR.index]: {
    menu: moderationMenu
  },
  [privileges.GLOBAL_MODERATOR.index]: {
    menu: globalModerationMenu
  },
  [privileges.AUTHORIZED_USER.index]: {
    menu: userMenu
  }
};