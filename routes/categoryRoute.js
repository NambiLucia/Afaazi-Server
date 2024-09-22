const express = require("express");
//deal with requests
const categoryRoute = express.Router();
const {getCategories,createCategory,updateCategoryById,deleteCategoryById}= require("../controllers/categorycontroller");
const { categorySchema } = require("../Utils/joi-schemas");
const {validateSchema} = require('../Utils/joi-validator');


//couple requests
categoryRoute.get("/",getCategories);
categoryRoute.post("/",validateSchema(categorySchema),
    createCategory);
categoryRoute.put("/:id",validateSchema(categorySchema),
    updateCategoryById);
categoryRoute.delete("/:id",deleteCategoryById);



module.exports = {
    categoryRoute
}