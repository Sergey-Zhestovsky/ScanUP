const mailMaxSize = 100;
const passwordMaxSize = 100;

module.exports = {
  email: ["required", ["maxLength", mailMaxSize]],
  password: ["required", ["maxLength", passwordMaxSize]]
};