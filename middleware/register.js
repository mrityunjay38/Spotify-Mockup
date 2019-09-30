const registerQuery = require('../database/registerQuery');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

function validateRegister(userDetails) {
    const schema = Joi.object({
        email: Joi.string()
                  .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'in', 'live', 'io']}})
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

async function register(req, res){
    const newUser = {
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    }

    const register = validateRegister(newUser);

    if(register.error === undefined){
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newUser.password, salt);
            newUser.password = hash;
            await registerQuery(newUser);
            res.render('register', {status : 'Registered successfully.'});
        }
        catch (err) {
            res.render('register', {status: 'Already taken, please try different username.'});
            res.status(404);
        }
    }
    else{
        res.render('register', {status : 'Invalid entered details...'});
        res.status(400);
    }
}

module.exports = register;