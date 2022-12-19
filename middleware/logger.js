module.exports = (req, res, next) => {
  console.log(`METHOD ${req.method} at path ${req.path}`);
  next();
};
