const loginQuery = require("../database/loginQuery");
const registerQuery = require("../database/registerQuery");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT = 10;

function validateLogin(userDetails) {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),

    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,16}$/)
      .required()
  });

  return schema.validate(userDetails);
}

function validateRegister(userDetails) {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "live", "io"] }
      })
      .required(),

    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),

    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,16}$/)
      .required()
  });

  return schema.validate(userDetails);
}

async function login(req, resLogin, next) {
  const username = req.body.username;
  const password = req.body.password;

  const login = validateLogin({ username: username, password: password });

  if (login.error === undefined) {
    try {
      const result = await loginQuery(username);

      // Check username in database
      if (result.length === 0) {
        resLogin.render("login", { status: "Username doesn't exist." });
        resLogin.status(404);
      } else {
        bcrypt.compare(password, result[0].password, (err, res) => {
          if (res === true) {
            const userToken = {
              username: username
            };
            const token = jwt.sign({ userToken }, "TopSecret", {
              expiresIn: "2m"
            });
            resLogin.cookie("Token", token);
            resLogin.status(200);
            next();
          } else {
            resLogin.render("login", { status: "Invalid password..." });
            resLogin.status(404);
          }
        });
      }
    } catch (err) {
      resLogin.render("login", {
        status: "Login failed! Check username or password."
      });
      resLogin.status(404);
    }
  } else {
    resLogin.render("login", { status: "Invalid entered details..." });
  }
}

async function register(req, res) {
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  const register = validateRegister(newUser);

  if (register.error === undefined) {
    try {
      const salt = bcrypt.genSaltSync(SALT);
      const hash = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hash;
      await registerQuery(newUser);
      res.render("register", { status: "Registered successfully." });
      res.status(200);
    } catch (err) {
      res.render("register", {
        status: "Already taken, please try different username."
      });
      res.status(404);
    }
  } else {
    res.render("register", { status: "Invalid entered details..." });
    res.status(400);
  }
}

module.exports = {
  login,
  register
};
