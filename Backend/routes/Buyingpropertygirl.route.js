import express from 'express';
import { deleteBookinggirl, getAllBookingsgirl, getBookingByIdgirl, saveBookinggirl, updateBookinggirl } from '../controller/Buyingpropertygirl.Controller.js';

const Buyingpropertyroutergirl = express.Router();

// Create a new booking
Buyingpropertyroutergirl.post("/save-booking", saveBookinggirl);

// View all bookings
Buyingpropertyroutergirl.get("/all-bookings", getAllBookingsgirl);

// View a single booking by ID
Buyingpropertyroutergirl.get("/booking/:id", getBookingByIdgirl);

// Update a booking by ID
Buyingpropertyroutergirl.put("/update-booking/:id", updateBookinggirl);

// Delete a booking by ID
Buyingpropertyroutergirl.delete("/delete-booking/:id", deleteBookinggirl);

export default Buyingpropertyroutergirl;