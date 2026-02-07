import Bookinggirl from "../models/Bookinggirl.models.js";


export const saveBookinggirl = async (req, res) => {
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

    const newBooking = new Bookinggirl({
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
export const getAllBookingsgirl = async (req, res) => {
  try {
    const bookings = await Bookinggirl.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single booking by ID
export const getBookingByIdgirl = async (req, res) => {
  try {
    const booking = await Bookinggirl.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update a booking
export const updateBookinggirl = async (req, res) => {
  try {
    const updatedBooking = await Bookinggirl.findByIdAndUpdate(
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
export const deleteBookinggirl = async (req, res) => {
  try {
    const booking = await Bookinggirl.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};