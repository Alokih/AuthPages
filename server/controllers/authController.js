const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ mssg: "Both Email & password are required" });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ mssg: "No User Exists" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ mssg: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "2d",
    });

    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ mssg: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ mssg: "Email is Invalid" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ mssg: "Password is not strong enough" });
    }

    const user = await authModel.findOne({ email });

    if (user) {
      return res.status(400).json({ mssg: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authModel.create({ name, email, password: hashedPassword });
    return res.json({ mssg: "User Registered Succesfully ", newUser });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
