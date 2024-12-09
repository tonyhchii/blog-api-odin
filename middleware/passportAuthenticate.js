const passport = require("../auth/passport");

const jwtAuthenticate = passport.authenticate("jwt", { session: false });

module.exports = jwtAuthenticate;
