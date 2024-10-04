const request = require("supertest");
const { describe, test, expect } = require("@jest/globals");
const app = require("../server");
const { PrismaClient } = require("@prisma/client");
const { before } = require("node:test");
const prisma = new PrismaClient();

const booking = {
  username: "username",
  fullname: "fullname",
  email: "email@example.com",
  telephone: "1234567890",
  eventDate: "2024-10-15",
  eventType: "wedding",
  country: "CountryName",
  city: "CityName",
  estimatedBudget: "5000000",
  additionalInfo: "Some info",
  vendorId: 1,
};

const vendor = {
  username: "vendorusername",
  fullname: "vendorfullname",
  email: "vendor@email.com",
  telephone: "0700000000",
  password: "vendor123",
  category: "Make-up",
};

const couple = {
  username: "username",
  password: "password",
};

//const coupleToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

const invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mc2ZheSIsImlhdCI6MTcyODAyODAwNSwiZXhwIjoxNzI4MDMxNjA1fQ.YCx0-tBzd2V_ngZj_iNLhWrAr4XDfzeT2TvrcTjVs";

beforeAll(async () => {
  await prisma.couple.findFirst({
    where: {
      username: couple.username,
      password: couple.password,
    },
  });
});

describe("Booking tests", () => {
  test("Create booking with an invalid token", async () => {
    await request(app)
      .post("/bookings/create-booking")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(booking)
      .expect(403);
  });

  test("Should get all bookings", async () => {
    await request(app).get("/bookings").expect(200);
  });
});

describe("couple and vendor tests", () => {
  test("Should not login non-existent couple", async () => {
    await request(app)
      .post("/couples/login")
      .send({
        username: couple.username,
        password: couple.password,
      })
      .expect(500);
  });

  test("Should not create a new vendor without category", async () => {
    await request(app)
      .post("/vendors/register")
      .send({
        username: vendor.username,
        fullname: vendor.fullname,
        email: vendor.email,
        telephone: vendor.telephone,
        password: vendor.password,
      })
      .expect(400);
  });
});

describe("Category tests", () => {
  test("Should get all categories", async () => {
    await request(app).get("/categories").expect(200);
  });
});
