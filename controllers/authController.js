const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

const loginUser = async (req, res) => {
  res.json({ mssg: "Login Route" });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ mssg: "Both Email & password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ mssg: "Email is Invalid" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ mssg: "Password is not strong enough" });
    }

    const user = await authModel.findOne({ email });

    if (user) {
      return res.status(400).json("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authModel.create({ email, password: hashedPassword });
    return res.json({ mssg: "User Registered Succesfully ", newUser });
  } catch (error) {
    return res.status(400).json({ error });
  }
};



module.exports = {
  loginUser,
  signupUser,
};
