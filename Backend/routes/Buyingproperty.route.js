import express from 'express';
import { 
    saveBooking, 
    getAllBookings, 
    updateBooking, 
    deleteBooking, 
    getBookingById
} from '../controller/Buyingproperty.Controller.js';

const Buyingpropertyrouter = express.Router();

// Create a new booking
Buyingpropertyrouter.post("/save-booking", saveBooking);

// View all bookings
Buyingpropertyrouter.get("/all-bookings", getAllBookings);

// View a single booking by ID
Buyingpropertyrouter.get("/booking/:id", getBookingById);

// Update a booking by ID
Buyingpropertyrouter.put("/update-booking/:id", updateBooking);

// Delete a booking by ID
Buyingpropertyrouter.delete("/delete-booking/:id", deleteBooking);

export default Buyingpropertyrouter;