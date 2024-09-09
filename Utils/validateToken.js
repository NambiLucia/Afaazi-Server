const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
require('dotenv/config');

const validateToken =(req,res,next)=>{
    //check headers for token
    const authHeader =req.headers.authorizaion
    // validate token using jwt
    if(authHeader){
        let token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,(err,couple)=>{
            if(err) {
                return res.json(err);

            }
            else{
            next();
            }

        }
        )

    }
    else{
        res.status(StatusCodes.NOT_FOUND).json("Authorization header is missing")
    }
}
module.exports = validateToken;