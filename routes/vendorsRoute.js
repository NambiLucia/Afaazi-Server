const express = require("express");
//deal with requests
const vendorsRoute = express.Router();
const {getVendors,register,login}= require("../controllers/couplecontroller");


//couple requests
vendorsRoute.get("/",getVendors);
vendorsRoute.post("/register",register);
vendorsRoute.post("/login",login);


module.exports = {
    vendorsRoute
}