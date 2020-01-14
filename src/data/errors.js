export default {
  required: {
    index: Symbol("required"),
    message: "Required field."
  },
  email: {
    index: Symbol("email"),
    message: "Wrong email."
  },
  password: {
    index: Symbol("password"),
    message: ""
  }
}