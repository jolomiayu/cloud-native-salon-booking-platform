const {
    getAllBookings,
    getBookingById,
    getBookingOwner,
    createBooking,
    updateBooking,
    updateBookingStatus,
    deleteBooking
} = require("../services/bookingService");

const getBookings = async (req, res, next) => {
    try {
        const bookings = await getAllBookings(req.user);
        res.json(bookings);
    } catch (error) {
        next(error);
    }
};

const getBookingByIdController = async (req, res, next) => {
    try {
        const booking = await getBookingById(parseInt(req.params.id));

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json(booking);
    } catch (error) {
        next(error);
    }
};

const createBookingController = async (req, res, next) => {
    try {
        const booking = await createBooking(req.body, req.user.id);

        res.status(201).json({
            message: "Booking created successfully!",
            booking
        });
    } catch (error) {
        next(error);
    }
};

const updateBookingController = async (req, res, next) => {
    try {
        const owner = await getBookingOwner(
            parseInt(req.params.id)
        );
        
        if (!owner) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }
        
        if (
            req.user.role !== "admin" &&
            owner.user_id !== req.user.id
        ) {
            return res.status(403).json({
                message: "Access denied."
            });
        }

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
        next(error);
    }
};

const updateBookingStatusController = async (req, res, next) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "confirmed",
            "completed",
            "cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const booking = await updateBookingStatus(
            parseInt(req.params.id),
            status
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json({
            message: "Booking status updated successfully!",
            booking
        });

    } catch (error) {
        next(error);
    }
};

const deleteBookingController = async (req, res, next) => {
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
        next(error);
    }
};

module.exports = {
    getBookings,
    getBookingById: getBookingByIdController,
    createBooking: createBookingController,
    updateBooking: updateBookingController,
    updateBookingStatus: updateBookingStatusController,
    deleteBooking: deleteBookingController
};

