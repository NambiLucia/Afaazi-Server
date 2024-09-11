const express = require("express");
//deal with requests
const couplesRoute = express.Router();
const {getCouples,register,login}= require("../controllers/couplecontroller");
const { coupleSchema } = require("../Utils/joi-schemas");
const {validateSchema} = require('../Utils/joi-validator');



//couple requests
couplesRoute.get("/",getCouples);
couplesRoute.post("/register",validateSchema(coupleSchema),register);
couplesRoute.post("/login",login);


module.exports = {
    couplesRoute
}