const loginQuery = require('../database/loginQuery');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

async function login(req, resLogin, next){

        const username = req.body.username;
        const password = req.body.password;

        const login = validateLogin({'username': username,'password':password});

        if(login.error === undefined){
            try {
                const result = await loginQuery(username);
                
                // Check username in database
                if(result.length === 0){
                    resLogin.render('login', {status : "Username doesn't exist."});
                    resLogin.status(404);
                }
                else{
                    bcrypt.compare(password,result[0].password, (err, res) => {
                        if(res === true){
                            const userToken = {
                                username : username
                            }
                            const token = jwt.sign({userToken}, 'TopSecret', {expiresIn:'2m'});
                            resLogin.cookie('Token',token);
                            // console.log(resLogin.Token);
                            next(); 
                        }
                        else{
                            resLogin.render('login', {status : 'Invalid password...'});
                            resLogin.status(404);
                        }
                    });
                }
            }
            catch (err) {
                resLogin.render('login', {status : 'Login failed! Check username or password.'});
                resLogin.status(404);
            }
        
        }
        else{
            resLogin.render('login', {status: 'Invalid entered details...'});
        }

}

module.exports = login;