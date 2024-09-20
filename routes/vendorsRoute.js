const express = require("express");
//deal with requests
const vendorsRoute = express.Router();
const {getVendors,register,login}= require("../controllers/vendorcontroller");
const {validateSchema} = require('../Utils/joi-validator');
const { vendorSchema } = require("../Utils/joi-schemas");


//couple requests
vendorsRoute.get("/",getVendors);
vendorsRoute.post("/register",validateSchema(vendorSchema), register);
vendorsRoute.post("/login",validateSchema(vendorSchema),login);


module.exports = {
    vendorsRoute
}