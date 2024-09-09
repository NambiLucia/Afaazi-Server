const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");


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

  module.exports = {
    getCouples
}