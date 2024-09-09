const express = require("express");
//deal with requests
const couplesRoute = express.Router();
const {getCouples,register,login}= require("../controllers/couplecontroller");


//couple requests
couplesRoute.get("/",getCouples);
couplesRoute.post("/register",register);
couplesRoute.post("/login",login);


module.exports = {
    couplesRoute
}