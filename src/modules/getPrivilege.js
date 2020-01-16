import privileges from "../data/privileges";

export default function getPrivilege(id) {
  for (let name in privileges) {
    if (privileges[name].token == id)
      return privileges[name];
  }

  return null;
}