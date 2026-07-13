const bookingValidation = require("../middlewares/bookingValidation");

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
router.post("/", bookingValidation, createBooking);
router.put("/:id",
updateBooking);
router.delete("/:id",
deleteBooking);

module.exports = router;