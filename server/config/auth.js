const User = require("../../models/User");

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    const session = req.get("session");
    if (session) {
      const user = User.findOne({ session });
      if (user) {
        return next();
      } else {
        return res.status(403).send("Unauthorized to access resource");
      }
    } else {
      return res.status(403).send("Unauthorized to access resource");
    }
  },
};
