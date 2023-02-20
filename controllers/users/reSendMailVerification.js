const { sendEmail } = require("../../helpers");
const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");

const reSendMailVerification = async (res, req) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound("missing required field email");
  }
  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }
  const mail ={
    to:email,
    subject:"Подтвердите регистрацию на сайте",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/veryfy/${user.verificationToken}"> Нажмите для подстверждения </a>`
  }
  await sendEmail(mail);
  res.json({
    message:"verification success"
  })
};

module.export = reSendMailVerification;
