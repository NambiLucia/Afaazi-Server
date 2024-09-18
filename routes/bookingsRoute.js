const express = require("express");
//deal with requests
const bookingsRoute = express.Router();
const {getBookings,createBooking}= require("../controllers/bookingcontroller");
const {validateSchema} = require('../Utils/joi-validator');
const { bookingSchema } = require("../Utils/joi-schemas");


//couple requests
bookingsRoute.get("/",getBookings);
bookingsRoute.post("/",validateSchema(bookingSchema),createBooking);



module.exports = {
    bookingsRoute
}