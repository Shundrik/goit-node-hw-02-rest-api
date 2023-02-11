const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middleware");
const { auth:ctrl } = require("../../controllers");
const { joiUserRegisterSchema, joiUserLoginSchema }  = require("../../models/user.js")


const router = express.Router();

router.post("/register", validation(joiUserRegisterSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(joiUserLoginSchema), ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));


module.exports = router;