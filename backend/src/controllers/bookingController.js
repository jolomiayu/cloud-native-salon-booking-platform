const {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
} = require("../services/bookingService");

const getBookings = async (req, res) => {
    try {
        const bookings = await getAllBookings(req.user);
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getBookingByIdController = async (req, res) => {
    try {
        const booking = await getBookingById(parseInt(req.params.id));

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const createBookingController = async (req, res) => {
    try {
        const booking = await createBooking(req.body, req.user.id);

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

const updateBookingController = async (req, res) => {
    try {
        const booking = await updateBooking(
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const deleteBookingController = async (req, res) => {
    try {
        const booking = await deleteBooking(parseInt(req.params.id));

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json({
            message: "Booking deleted successfully!",
            booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    getBookings,
    getBookingById: getBookingByIdController,
    createBooking: createBookingController,
    updateBooking: updateBookingController,
    deleteBooking: deleteBookingController
};

