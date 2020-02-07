import privilegeList from "../data/privileges";

export interface PrivilegeList {
  [name: string]: Privilege
}

export interface Privilege {
  index: symbol;
  token: string;
}

export default function getPrivilege(id: string,
  privileges: PrivilegeList = privilegeList): Privilege | null {
  for (let key in privileges) {
    if (privileges[key].token === id)
      return privileges[key];
  }

  return null;
}