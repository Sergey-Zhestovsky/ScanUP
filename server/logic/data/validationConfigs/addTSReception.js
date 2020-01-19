module.exports = {
  globalAdministrator: {
    name: ["required", ["maxLength", 100]],
    transportSystemId: ["required"]
  },
  globalModerator: {
    name: ["required", ["maxLength", 100]]
  }
};