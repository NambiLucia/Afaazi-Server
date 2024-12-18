const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");
const toISODateString = require("../Utils/dateUtils");
const generateSlug = require("../Utils/slugUtils");
const jwt = require("jsonwebtoken");

const getBookings = async (req, res) => {
  try {
    let bookings = await prisma.booking.findMany({
      include: {
        vendor: {
          select: {
            username: true,
          },
        },
      },
    });
    res.json(bookings);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getBookingsByCoupleId = async (req, res) => {
  console.log("Request received for coupleId:", req.params.id);
  try {
    coupleId = parseInt(req.params.id);

    const bookings = await prisma.booking.findMany({
      where: {
        coupleId: coupleId,
      },
      include: {
        couple: {
          select: {
            fullname: true,
          },
        },
        vendor: {
          select: {
            fullname: true,
          },
        },
      },
    });

    if(bookings.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message:`No bookings found for couple ID ${coupleId}`
      })
    }

    return res
      .status(StatusCodes.OK)
      .json({
        message: `Bookings for couple ID ${coupleId} - ${bookings[0]?.couple.fullname}`,
        bookings,
      });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "An error occurred while fetching bookings",
        error: error.message || error,
      });
  }
};

const getBookingsByVendorId = async (req, res) => {
  console.log("Request received for vendorId:", req.params.id);
  try {
    vendorId = parseInt(req.params.id);

    const bookings = await prisma.booking.findMany({
      where: {
        vendorId: vendorId,
      },
      include: {
        couple: {
          select: {
            fullname: true,
          },
        },
        vendor: {
          select: {
            fullname: true,
          },
        },
      },
    });

    if(bookings.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message:`No bookings found for vendor ID ${vendorId}`
      })
    }

    return res
      .status(StatusCodes.OK)
      .json({
        message: `Bookings for vendor ID ${vendorId} - ${bookings[0]?.vendor.fullname}`,
        bookings,
      });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "An error occurred while fetching bookings",
        error: error.message || error,
      });
  }
};













const getBookingsBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const getBooking = await prisma.booking.findUnique({
      where: {
        slug: slug,
      },
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: `Bookings By slug ${slug}`, getBooking });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

//Create booking

const createBooking = async (req, res) => {
  try {
    const coupleId = req.coupleId;
    const {
      username,
      fullname,
      email,
      telephone,
      eventDate,
      eventType,
      country,
      city,
      estimatedBudget,
      additionalInfo,
      vendorId,
    } = req.body;

    const eventDateISO = toISODateString(eventDate);
    if (!eventDateISO) {
      return res.status(400).json({ message: "Invalid event date format." });
    }
    const slug = `${generateSlug(username)} - ${Date.now()}`;

    const newBooking = await prisma.booking.create({
      data: {
        username,
        slug,
        fullname,
        email,
        telephone,
        eventDate: eventDateISO,
        eventType,
        country,
        city,
        estimatedBudget,
        additionalInfo,
        coupleId,
        vendorId,
      },
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Event booked successfully", newBooking });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error occured while booking event" });
  }
};

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
    return res
      .status(StatusCodes.OK)
      .json({ message: `Booking updated`, updatedBooking });
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
        id: +req.params.id,
      },
    });

    if (deletedBooking) {
      return res
        .status(StatusCodes.OK)
        .json({ message: "Booking deleted", deletedBooking });
    } else {
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
  getBookingsByCoupleId,
  getBookingsByVendorId,
  getBookingsBySlug,
  createBooking,
  updateBookingsById,
  deleteBookingsById,
};
