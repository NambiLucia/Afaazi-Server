const express = require("express");
//deal with requests
const categoryRoute = express.Router();
const {getCategories,createCategory}= require("../controllers/categorycontroller");


//couple requests
categoryRoute.get("/",getCategories);
categoryRoute.post("/",createCategory);



module.exports = {
    vendorsRoute
}