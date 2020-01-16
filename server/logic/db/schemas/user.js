let mongoose = require("mongoose"),
  crypto = require("crypto"),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  passport: {
    type: String,
    unique: true,
    default: null
  },
  privilegeId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  transportSystemReceptionId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  userPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
}, { versionKey: false });

userSchema.virtual("password")
  .set(function (pass) {
    this.salt = crypto.randomBytes(10).toString('hex');
    this.userPassword = this.encryptPassword(pass)
  })
  .get(() => this.userPassword)

userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
}
userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.userPassword;
}

module.exports = userSchema;