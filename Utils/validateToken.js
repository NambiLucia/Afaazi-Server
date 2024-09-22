const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
require('dotenv/config');

const validateToken =(req,res,next)=>{
    //check headers for token
    const authHeader =req.headers.authorization
    // validate token using jwt
    if(authHeader){
        let token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,(err,couple)=>{
            if(err) {
                return res.status(StatusCodes.FORBIDDEN).json({message: 'Failed to authenticate token' });

            }
            else{
                req.coupleId = couple.id;
            next();
            }

        }
        )

    }
    else{
        res.status(StatusCodes.UNAUTHORIZED).json({message:"Authorization header is missing"})
    }
}





module.exports = validateToken;