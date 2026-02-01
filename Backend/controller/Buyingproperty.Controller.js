

import Booking from "../models/Booking.models.js";


export const saveBooking = async (req, res) => {
  try {
    console.log("📅 New Booking Request:", req.body);

    const {
      clientName, clientMobile, clientLocation, bookingTime,
      propertyId, propertyType, propertyStatus, propertyPrice, propertyLocation
    } = req.body;

    // Validation
    if (!clientName || !clientMobile || !bookingTime) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newBooking = new Booking({
      clientName,
      clientMobile,
      clientLocation,
      bookingTime,
      propertyId,
      propertyType,
      propertyStatus,
      propertyPrice,
      propertyLocation
    });

    await newBooking.save();

    res.status(201).json({ 
      success: true, 
      message: "Appointment booked successfully!", 
      bookingId: newBooking._id 
    });

  } catch (error) {
    console.error("❌ Booking Save Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update a booking
export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Updated successfully", data: updatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};