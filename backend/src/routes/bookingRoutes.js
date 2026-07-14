const bookingValidation = require("../middlewares/bookingValidation");

const authenticateToken = require("../auth/authMiddleware");

const express = require("express");
const router = express.Router();

const {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
} = require("../controllers/bookingController");

router.get("/", getBookings);

router.get("/:id", getBookingById);

router.post("/", authenticateToken, bookingValidation, createBooking);

router.put("/:id", authenticateToken, updateBooking);

router.delete("/:id", authenticateToken, deleteBooking);

module.exports = router;