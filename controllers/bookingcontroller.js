const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");



const getBooking = async (req, res) => {
    try {
      let bookings = await prisma.booking.findMany();
      res.json(bookings);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
  //signup

  const createBooking =async (req,res)=>{
      try{
        const {username,fullname,email,telephone,eventdate,checkoutDate,eventType,country,city,estimatedBudget,additionalInfo,vendorId}=req.body;
        

        const newBooking = await prisma.booking.create({
          data:{
            username,fullname,email,telephone,eventdate,checkoutDate,eventType,country,city,estimatedBudget,additionalInfo,vendorId

          }

        })

        return res.status(StatusCodes.OK).json({"message":"Event booked successfully", newBooking})

      }
      catch(error){
        console.log(error)
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Error occured while booking event"})

      }

  }

 /* const updateBookingsById = async (req, res) => {
    try {
      const updatedBooking = await prisma.quote.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
      if (!updatedQuote) {
        return res.status(404).json({ error: "Quote not found" });
      }
      return res.status(StatusCodes.OK).json(updatedQuote);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
  
  const deleteQuotesById = async (req, res) => {
    try {
      const deletedQuote = await prisma.quote.delete({
        where: {
          id: parseInt(req.params.id),//+(req.params.id)
        },
      });
  
  if(deletedQuote){
     return res
        .status(StatusCodes.OK)
        .json({ message: "Quote deleted", deletedQuote });
  
  }
  else{
    return res.status(404).json({ error: "Quote doesnt exist" });
  }
  
  
     
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
*/





  module.exports = {
    getBooking,
    createBooking,
}