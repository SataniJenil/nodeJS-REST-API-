const { infoLogger, errorLogger } = require("../logger");

module.exports = async (req, res, next, Schema) => {
  try {
    infoLogger.info(req.body);
    const value = await Schema.validateAsync(req.body);
    req.body = value;
    next();
  } catch (error) {
    errorLogger.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
