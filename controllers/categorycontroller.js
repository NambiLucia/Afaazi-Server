const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");




const getCategories = async (req, res) => {
  try {
    let categories = await prisma.vendor.findMany();
    res.json(categories);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
//create category

const createCategory = async (req, res) => {
  try {
    const {title,picture} = req.body;
    const category =await prisma.category.findUnique({
        where:{
            title:title,
        }

    }) 
    if(category){
        return res.status(403).json({
            error: "Category already exists"
        })}
    

    const newCategory = await prisma.category.create({
      data: {
        title,
        picture,
        
      },
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "New category created successfully", newCategory });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error occured while creating new vendor" });
  }
};


module.exports = {
getCategories,
createCategory

};
