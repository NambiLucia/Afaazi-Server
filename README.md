# Afaazi REST API
## Overview
Afaazi Rest API is built with Node.js, Express, Prisma ORM, and PostgresQL. It provides CRUD functionality for Afaazi Events Booking Platform. Afaazi Events is a centralized system designed to manage all aspects of booking wedding service providers. 
* Users can sign up and login either as a couple or vendors.
* Users can also view booked events

## Prerequisites
Before running this Rest API, you need to have the following installed on your machine:

* Node.js
* PostgreSQL
## Installation
1. Clone this repository to your local machine
2. Navigate to the cloned directory
3. Run npm install to install all the necessary dependencies
4. Create a .env file in the root directory of the project and set the following environment variables:
5. DATABASE_URL: URL to your PostgresQL database
6. PORT: Port number for the server to run on
7. Run npx prisma migrate dev : to apply the database schema to your database
8. Run npm start : to start the server

## Endpoints
This Rest API has the following endpoints:

**`/couples`**
* `GET`: Get all registered couples
* `/couples/register`
* `POST`: Register a new couple
* `/couples/login`
* `POST`: Login a registered couple

**`/vendors`**
* `GET`: Get all registered vendors
* `/vendors/register`
* `POST`: Register a new vendor
* `/vendors/login`
* `POST`: Login a registered vendor


**`/categories`**
* `GET`: Get all vendor categories
* `/categories`
* `POST`: Create a new vendor category
* `/categories/:id`
* `PUT`: Update a specific vendor category
* `/categories/:id`
* `DELETE`: Delete a specific vendor category


**`/bookings`**
* `GET`: Get all bookings
* `/bookings/:slug`
* `GET`: Get all bookings by a specific couple
* `bookings/couples/:id`
* `GET`: Get all bookings by a specific couple
* `/bookings/create-booking`
* `POST`: Create a booking
* `/bookings/:id`
* `PUT`: Update a specific booking
* `/bookings/:id`
* `DELETE`: Delete a specific booking


## Render
https://afaazi-server.onrender.com

## Contributing
Feel free to contribute. Create a new branch, make changes, and submit a pull request.


## License
This is part of my final project for the backend bootcamp with Kanzu Code Foundation