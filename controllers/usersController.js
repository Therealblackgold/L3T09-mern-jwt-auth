// import dependencies
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//------------ Signup -----------//
async function signup(req, res) {
  try {
    // Get  the email and password from req body
    const { name, email, password } = req.body;
    if (name && email && password) {
      // hash password
      const hashedPassword = bcrypt.hashSync(password, 8);
      // create user with req body values
      await User.create({ name, email, password: hashedPassword });
      // respond
      res.status(200).json({
        success: true,
        message: `username ${email} created`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "failed to create user",
    });
  }
}

//------------ Login -----------//
async function login(req, res) {
  try {
    // Get email and password from req body
    const { email, password } = req.body;
    // find the user with requested email
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(401);
    // comparing req password with found user password hash using bcryptjs
    bcrypt.compareSync(password, user.password);
    if (!password) return res.sendStatus(401);
    // create jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
    // set cookies
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    // response
    res.status(200).json({
      success: true,
      message: `${email} logged in`,
    });

    // Error
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Login failed",
    });
  }
}

//-------- Logout -----------//
function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "failed logging",
    });
  }
}

//-------- Check Auth --------//
function checkAuth(req, res) {
  try {
    res.sendStatus(200);
  } catch (error) {
    // res.sendStatus(400);
    res.send("Login to use todo app");
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
