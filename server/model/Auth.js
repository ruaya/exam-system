const mongoose = require("../db").mongoose;

const authSchema = new mongoose.Schema({
  authAccount: String, // 登录账号
  name: String,
  password: String
});

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
