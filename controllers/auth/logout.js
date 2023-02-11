const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id,token } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({
    status:"success",
    code:204,
    data:{
        token,
    }
  });
};

module.exports = logout;
