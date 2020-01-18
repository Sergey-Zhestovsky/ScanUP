export default {
  authConnector: {
    pathStructure: {
      root: "/authorization/",
      signup: "signup",
      logout: "logout",
      login: "login",
      getDetails: "user"
    }
  },
  tsTypesConnector: {
    pathStructure: {
      root: "/transport-system-type/",
      getAll: "get-all"
    }
  },
  tsConnector: {
    pathStructure: {
      root: "/transport-system/",
      getAll: "get-all",
      add: "add",
      delete: "delete"
    }
  },
  tsReceptionConnector: {
    pathStructure: {
      root: "/transport-system-reception/",
      add: "add",
      addToTS: "add-to-transport-system",
      getAll: "get-all"
    }
  }
}