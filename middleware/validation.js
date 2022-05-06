module.exports = async (req, res, next, Schema) => {
  try {
    const value = await Schema.validateAsync(req.body);
    console.log("viii", value);
    req.body = value;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
