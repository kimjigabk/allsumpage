const keys = require("../config/keys");

module.exports = (req, res, next) => {
  console.log(req);
  console.log(req.body.authorId);

  if (req.body.authorId !== keys.adminId) {
    return res.status(401).send({ error: "You must log in" });
  }
  next();
};
