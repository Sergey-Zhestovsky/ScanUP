module.exports = {
  name: ["required", ["maxLength", 100]],
  email: ["required", "email", ["maxLength", 100]],
  password: ["required", ["maxLength", 100]],
  passport: ["required", ["maxLength", 100]]
};