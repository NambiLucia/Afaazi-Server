const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");
const jwt =require('jsonwebtoken');
require('dotenv/config');
const bcrypt= require('bcrypt');


const getCouples = async (req, res) => {
    try {
      let couples = await prisma.couple.findMany();
      res.json(couples);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
  //signup

  const signUp =async (req,res)=>{
      try{
        const {username,fullname,email,telephone,password}=req.body;
        const hashedPassword = await bcrypt.hash(password,10)

        const newCouple = await prisma.couple.create({
          data:{
            username,
            fullname,
            email,
            telephone,
            password:hashedPassword

          }

        })

        return res.status(StatusCodes.OK).json({"message":"New couple created successfully", newCouple})

      }
      catch(error){
        console.log(error)
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Error occured while creating new couple"})

      }

  }


  //login

const login = async (req,res)=>{
  try{
    const {username,password}=req.body;
    let couple= await prisma.couple.findUnique({
      where:{
        username
      }
    });
    if(couple){
      const matchPassword =await bcrypt.compare(password,couple.password)
      if(matchPassword){
        //create token
        const coupleToken = await jwt.sign(
          {id:couple.id,username:couple.username},
          process.env.SECRET_KEY,
          {expiresIn:"1h"}

        )
        //send token back as response
        const date =new Date()
        res.status(StatusCodes.OK).json({message:"Successful Couple login",coupleToken})
        console.log(coupleToken,`Token Generated at:- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

      }
      else{
        return res.status(StatusCodes.UNAUTHORIZED).json({"error":"Wrong password"});
      }

    
    }

    else{
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error":"Couple not found",couple});
    }


  }
  catch(error){
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error:error.message });


  }

}


  module.exports = {
    getCouples,
    signUp,
    login
}