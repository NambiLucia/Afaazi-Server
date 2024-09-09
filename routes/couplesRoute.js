const express = require("express");
//deal with requests
const couplesRoute = express.Router();
const {getCouples}= require("../controllers/couplecontroller");


//couple requests
couplesRoute.get("/",getCouples);


module.exports = {
    couplesRoute
}