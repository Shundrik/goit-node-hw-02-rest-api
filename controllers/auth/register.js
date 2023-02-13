const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
// const bcrypt = require("bcryptjs")

const { User } = require("../../models/user");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} in use`);
  }

  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, subscription, avatarURL });
  newUser.setPassword(password);
  newUser.save();
  //   const hasPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
  //   const result = await User.create({ subscription, email, password:hasPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    message: "created",
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
