const { clearHash } = require("../services/cache");

module.exports = async (req, res, next) => {
  await next();
  if (req.route.path.includes("songs")) {
    // console.log("지워버림");
    clearHash("allsongs");
  }
};
