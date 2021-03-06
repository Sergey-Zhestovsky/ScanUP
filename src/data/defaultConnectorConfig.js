export default {
  authConnector: {
    pathStructure: {
      root: "/authorization/",
      signup: "signup",
      logout: "logout",
      login: "login",
      getDetails: "user",
      isRegistered: "is-registered"
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
      delete: "delete",
      getStatistics: "get-statistics",
    }
  },
  tsReceptionConnector: {
    pathStructure: {
      root: "/transport-system-reception/",
      add: "add",
      addToTS: "add-to-transport-system",

      getEmpty: "get-empty",
      getAll: "get-all"
    }
  },
  moderatorConnector: {
    pathStructure: {
      root: "/moderator/",
      add: "add",
      getAll: "get-all"
    }
  },
  scannerConnector: {
    pathStructure: {
      root: "/scanner/",
      scan: "scan",
      verifyScan: "verify-scan"
    }
  },
  baggageConnector: {
    pathStructure: {
      root: "/baggage/",
      add: "add",
      get: "get",
      getAll: "get-all",
      getHistory: "get-history",
      updateState: "update-state",
      updateLatterScan: "update-latter-scan"
    }
  },
  baggageStateConnector: {
    pathStructure: {
      root: "/baggage-transportation-state/",
      getList: "get-list"
    }
  },
  complaintConnector: {
    pathStructure: {
      root: "/complaint/",
      add: "add",
      getAll: "get-all"
    }
  },
  pageConnector: {
    pathStructure: {
      root: "/public/pages/",
      about: "about.md",
      policy: "policy.md"
    }
  },
}