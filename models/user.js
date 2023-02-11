const { Schema, model} = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    //   name: {
    //   type: String,
    //   required: [true, "Password is required"],
  
    // },
    password: {
      type: String,
      required: [true, "Password is required"],
  
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required:true
    // },
  },

  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function(password){
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}



const joiUserRegisterSchema = Joi.object({
    // name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
//   owner: Joi.object({
//     name: Joi.string(),
//   }),
});

const joiUserLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token:Joi.string(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiUserRegisterSchema,
  joiUserLoginSchema,
};
