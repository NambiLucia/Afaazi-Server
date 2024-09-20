const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");



const getBookings = async (req, res) => {
    try {
      let bookings = await prisma.booking.findMany();
      res.json(bookings);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
  
  const getBookingsByName = async (req, res) => {
    try{
     const name = req.params.username
    const getBooking = await prisma.booking.findUnique({
      where:{
        username: name,
      }
    })
   
   
      return res.status(StatusCodes.OK).json({ message: `Bookings By ${name}`,getBooking})
   
    }
  catch(error){
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({error});
  
  }
  };
  






  //signup

  const createBooking =async (req,res)=>{
      try{
        const coupleId = req.coupleId
        const { username,fullname,email,telephone,eventDate,eventType,country,city,estimatedBudget,additionalInfo,vendorId}=req.body;
        
        const eventDateISO = new Date(eventDate).toISOString();
      
        const newBooking = await prisma.booking.create({
          data:{
           coupleId,username,fullname,email,telephone,eventDate:eventDateISO,eventType,country,city,estimatedBudget,additionalInfo,vendorId

          }


        })


        return res.status(StatusCodes.OK).json({"message":"Event booked successfully", newBooking})

      }
      catch(error){
        console.log(error)
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Error occured while booking event"})

      }

  }

  const updateBookingsById = async (req, res) => {
    try {
      const updatedBooking = await prisma.booking.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
      if (!updatedBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      return res.status(StatusCodes.OK).json({message:`Booking updated`,updatedBooking});
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
  
  const deleteBookingsById = async (req, res) => {
    try {
      const deletedBooking = await prisma.booking.delete({
        where: {
          id: +(req.params.id),
        },
      });
  
  if(deletedBooking){
     return res
        .status(StatusCodes.OK)
        .json({ message: "Booking deleted", deletedBooking });
  
  }
  else{
    return res.status(404).json({ error: "Sorry,Booking doesnt exist" });
  }
  
  
     
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };





  module.exports = {
    getBookings,
    getBookingsByName,
    createBooking,
    updateBookingsById,
    deleteBookingsById
}