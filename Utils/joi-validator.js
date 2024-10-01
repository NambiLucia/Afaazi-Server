const validateSchema=(schema)=>{
    return function(req,res,next){
        const {error,value} = schema.validate(req.body)
        if(error) {
            res.status(400).json({error:error.details[0].message})
           // res.json({error:error.details[0].message})
        }
        else{
            next()
        }
    }
}




module.exports={
 validateSchema
   
}