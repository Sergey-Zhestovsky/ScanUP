module.exports = {
  email: ["required", ["maxLength", 100]],
  password: ["required", ["maxLength", 100]],
  transportSystemReceptionId: ["required"]
};
