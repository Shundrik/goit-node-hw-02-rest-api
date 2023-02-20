const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const path = require("path");
const configPath = path.join(__dirname, "..", "..", ".env");
const dotenv = require("dotenv").config({ path: configPath });
const SECRET_KEY = dotenv.parsed.SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized("Email is wrong or not verify, or password is wrong");
  }
  // const passCompare = bcrypt.compareSync(password.user.password);
  // if (!user || !passCompare) {
  //   throw new Unauthorized("Email or password is wrong");
  // }
  // if(!user){
  // throw new Unauthorized(`Email ${email} not found`)
  // }
  // const passwordCompare = bcrypt.compareSync(password,user.password);
  // if(passwordCompare){
  //     throw new Unauthorized("Password wrong")
  // }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });
  await User.findByIdAndUpdate(user._id,{token});
  
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
