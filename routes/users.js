const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const login = require('../middleware/login');
const register = require('../middleware/register');
const dashboard = require('../middleware/dashboard');

// login and register

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));


router.get('/dashboard', verifyToken, (req, res) => res.render('dashboard'));
router.post('/dashboard', verifyToken, dashboard, (req, res) => res.json(res.body));


router.post('/login', login, (req, res) => res.redirect(`/user/dashboard`));
router.post('/register', register, (req, res) => res.json(res.body));

module.exports = router;