module.exports = {
  name: ["required", ["maxLength", 100]],
  email: ["required", ["maxLength", 100]],
  password: ["required", ["maxLength", 100]],
  transportSystemReceptionId: ["required"]
};
