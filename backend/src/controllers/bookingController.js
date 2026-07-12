const {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
} = require("../services/bookingService");


const getBookings = (req, res) => {
    res.json(getAllBookings());
};

const getBookingByIdController = (req, res) => {
    const booking = getBookingById(parseInt(req.params.id));

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    res.json(booking);
};

const createBookingController = (req, res) => {
    const booking = createBooking(req.body);

    res.status(201).json({
        message: "Booking created successfully!",
        booking
    });
};

const updateBookingController = (req, res) => {
    const booking = updateBooking(
        parseInt(req.params.id),
        req.body
    );

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    res.json({
        message: "Booking updated successfully!",
        booking
    });
};

const deleteBookingController = (req, res) => {
    const booking = deleteBooking(parseInt(req.params.id));

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    res.json({
        message: "Booking deleted successfully!",
        booking
    });
};

module.exports = {
    getBookings,
    getBookingById: getBookingByIdController,
    createBooking: createBookingController,
    updateBooking: updateBookingController,
    deleteBooking: deleteBookingController
};

