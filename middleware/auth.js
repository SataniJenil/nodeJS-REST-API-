const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
var secret = process.env.SECRET;

const { infoLogger, errorLogger } = require("../logger");

const auth = async (req, res, next) => {
  try {
    infoLogger.info(req.decoded);
    const token = req.header("Authorization").replace("Bearer", "").trim();
    if (!token) throw new Error("token is not Authorization");

    const decoded = jwt.verify(token, secret);
    if (!decoded) throw new Error("id  is not decoded");

    const user = await User.findOne({
      _id: decoded._id,
    });
    if (!user) throw new Error("user is not found mmmmm");

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    errorLogger.error(error.message);
    res.status(401).send({ success: false, message: error.message });
  }
};

module.exports = auth;
