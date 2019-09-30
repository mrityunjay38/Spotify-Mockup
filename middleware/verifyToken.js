const jwt = require('jsonwebtoken');

function verifyToken(reqVerify, resVerify, next){
   
        const token = reqVerify.cookies.Token;
          
        jwt.verify(token, 'TopSecret', (err, res) => {
            if(err){
                resVerify.status(403);
                resVerify.render('login', {status : "You're not authorized..."});
            }
            else{
                next();
            }
        });
}

module.exports = verifyToken;