const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

// const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload,  } = req.file;
  // const { _id } = req.user;

  try {
    // const resultUpload = path.join(avatarDir, originalname);
    const avatarUniqueName = `${req.user._id}.jpg`
        Jimp.read(tempUpload, (err, image) => {
      if (err) throw err;
      return image
        .resize(250, 250)
        .write( path.join( __dirname, "../../", "public", "avatars",avatarUniqueName  ));
    });
    await fs.rename(tempUpload, avatarUniqueName);
    const avatarURL = path.join("public", "avatars", avatarUniqueName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = updateAvatar;
