const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const dashboard = require("../middleware/dashboard");
const auth = require("../routes/auth");

// login

router.get("/login", (req, res) => res.render("login"));
router.post("/login", auth.login, (req, res) =>
  res.redirect(`/user/dashboard`)
);

// register

router.get("/register", (req, res) => res.render("register"));
router.post("/register", auth.register, (req, res) => res.json(res.body));

// dashboard

router.get("/dashboard", verifyToken, (req, res) => res.render("dashboard"));
router.post("/dashboard", verifyToken, dashboard, (req, res) =>
  res.json(res.body)
);

module.exports = router;
