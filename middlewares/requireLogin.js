const keys = require("../config/keys");

module.exports = (req, res, next) => {
  if (req.body.authorId !== keys.adminId) {
    return res.status(401).send({ error: "You must log in" });
  }
  next();
};
