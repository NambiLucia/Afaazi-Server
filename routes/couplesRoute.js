const express = require("express");
//deal with requests
const couplesRoute = express.Router();
const {getCouples,signUp,login}= require("../controllers/couplecontroller");


//couple requests
couplesRoute.get("/",getCouples);
couplesRoute.post("/signup",signUp);
couplesRoute.post("/login",login);


module.exports = {
    couplesRoute
}