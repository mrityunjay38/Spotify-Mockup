const jwt = require("jsonwebtoken");

function verifyToken(request, response, next) {
  const token = request.cookies.Token;

  if (request.method == "GET" && request.url != '/user/dashboard') {
    next();
  }else if(request.method == 'POST' && (request.url == '/user/login' || request.url == '/user/register')){
    next();
  } else {
    jwt.verify(token, "TopSecret", (err, res) => {
      if (err) {
        response.status(403);
        response.render("login", { status: "You're not authorized..." });
      } else {
        next();
      }
    });
  }
}

module.exports = verifyToken;
