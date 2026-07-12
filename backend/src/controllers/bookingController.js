const {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
} = require("../services/bookingService");

const getBookings = async (req, res) => {
    try {
        const bookings = await getAllBookings();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
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

const createBookingController = async (req, res) => {
    try {
        const booking = await createBooking(req.body);

        res.status(201).json({
            message: "Booking created successfully!",
            booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
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

