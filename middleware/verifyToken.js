const jwt = require("jsonwebtoken");

function verifyToken(request, response, next) {
  const token = request.cookies.Token;

  jwt.verify(token, "TopSecret", (err, res) => {
    if (err) {
      response.status(403);
      response.render("login", { status: "You're not authorized..." });
    } else {
      next();
    }
  });
}

module.exports = verifyToken;
