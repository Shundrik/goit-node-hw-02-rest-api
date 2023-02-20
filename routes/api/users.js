const express = require("express");

const { ctrlWrapper, auth, upload, validation } = require("../../middleware");
const { users: ctrl } = require("../../controllers");
const { verifyEmailSchema} = require("../../models/user")

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get("/verify/:verificationToken", auth, ctrlWrapper(ctrl.verifyEmail));
router.post("/verify",validation(verifyEmailSchema),ctrlWrapper(ctrl.reSendMailVerification));

module.exports = router;
