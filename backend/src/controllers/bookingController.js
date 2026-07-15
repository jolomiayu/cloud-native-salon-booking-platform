const {
    getAllBookings,
    getBookingById,
    getBookingOwner,
    createBooking,
    updateBooking,
    updateBookingStatus,
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
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const updateBookingStatusController = async (req, res) => {
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
    updateBookingStatus: updateBookingStatusController,
    deleteBooking: deleteBookingController
};

