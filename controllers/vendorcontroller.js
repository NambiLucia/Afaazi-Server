const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");
const jwt =require('jsonwebtoken');
require('dotenv/config');
const bcrypt= require('bcrypt');


const getVendors = async (req, res) => {
    try {
      let vendors = await prisma.vendor.findMany();
      res.json(vendors);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
  //signup

  const register =async (req,res)=>{
      try{
        const {username,fullname,email,telephone,password}=req.body;
        const hashedPassword = await bcrypt.hash(password,10)

        const newVendor = await prisma.vendor.create({
          data:{
            username,
            fullname,
            email,
            telephone,
            password:hashedPassword

          }

        })

        return res.status(StatusCodes.OK).json({"message":"New vendor created successfully", newVendor })

      }
      catch(error){
        console.log(error)
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Error occured while creating new vendor"})

      }

  }


  //login

const login = async (req,res)=>{
  try{
    const {username,password}=req.body;
    let vendor = await prisma.vendor.findUnique({
      where:{
        username
      }
    });
    if(vendor){
      const matchPassword =await bcrypt.compare(password,vendor.password)
      if(matchPassword){
        //create token
        const vendorToken = await jwt.sign(
          {id:couple.id,username:vendor.username},
          process.env.SECRET_KEY,
          {expiresIn:"1h"}

        )
        //send token back as response
        const date =new Date()
        res.status(StatusCodes.OK).json({message:"Successful vendor login",vendorToken})
        console.log(coupleToken,`Token Generated at:- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

      }
      else{
        return res.status(StatusCodes.UNAUTHORIZED).json({"error":"Wrong password"});
      }

    
    }

    else{
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error":"Vendor not found",vendor});
    }


  }
  catch(error){
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error:error.message });


  }

}


  module.exports = {
    getVendors,
    register,
    login
}