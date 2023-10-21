const { verify } = require("jsonwebtoken");

class TokenChecker {
  static checkToken(req, res, next) {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, "key123", (err, decode) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid token"
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access denied! unauthorized user"
      });
    }
  }
}

module.exports = TokenChecker;
