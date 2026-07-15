const authorizeRole = require("../auth/authorizeRole");

const bookingValidation = require("../middlewares/bookingValidation");

const authenticateToken = require("../auth/authMiddleware");

const express = require("express");
const router = express.Router();

const {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    updateBookingStatus,
    deleteBooking
} = require("../controllers/bookingController");

router.get(
    "/",
    authenticateToken,
    getBookings
);

router.get("/:id", getBookingById);

router.post("/", authenticateToken, bookingValidation, createBooking);

router.put("/:id", authenticateToken, updateBooking);

router.patch(
    "/:id/status",
    authenticateToken,
    authorizeRole("admin"),
    updateBookingStatus
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("admin"),
    deleteBooking
);

module.exports = router;