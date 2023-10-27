const loginUser = async (req, res) => {
  res.json({mssg: "Login Route"})
}

const signupUser = async (req, res) => {
  res.json({mssg: "Signup Route"})
}

module.exports = {
  loginUser,
  signupUser
}