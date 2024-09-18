const express = require("express");
//deal with requests
const bookingsRoute = express.Router();
const {getBookings,getBookingsByName,createBooking,updateBookingsById,deleteBookingsById}= require("../controllers/bookingcontroller");
const {validateSchema} = require('../Utils/joi-validator');
const { bookingSchema } = require("../Utils/joi-schemas");


//couple requests
bookingsRoute.get("/",getBookings);
bookingsRoute.get("/:username",getBookingsByName);
bookingsRoute.post("/",validateSchema(bookingSchema),createBooking);
bookingsRoute.put("/:id",validateSchema(bookingSchema),updateBookingsById);
bookingsRoute.delete("/:id",deleteBookingsById);



module.exports = {
    bookingsRoute
}