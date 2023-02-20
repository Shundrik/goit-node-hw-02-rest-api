const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require('uuid');

// const bcrypt = require("bcryptjs")
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { subscription, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} in use`);
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = new User({ email, subscription, avatarURL, verificationToken});
  newUser.setPassword(password);
  await newUser.save();
  const mail ={
    to:email,
    subject:"Подтверждение email",
    html:`<a target="_blank" href="http://localhost:3000/api/users/verify${verificationToken}"> Подтвердить email </a>`
  };

  await sendEmail(mail);

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
        verificationToken,
      },
    },
  });
};

module.exports = register;
