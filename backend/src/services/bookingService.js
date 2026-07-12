const pool = require("../config/db");

const bookings = [
    {
        id: 1,
        customer: "Jolomi",
        service: "Hair Styling",
        date: "2026-07-12",
        time: "10:00 AM"
    },
    {
        id: 2,
        customer: "Sarah",
        service: "Nail Care",
        date: "2026-07-12",
        time: "2:00 PM"
    }
];

const getAllBookings = async () => {
    const result = await pool.query(
        "SELECT * FROM bookings ORDER BY id"
    );

    return result.rows;
};

const getBookingById = (id) => {
    return bookings.find(booking => booking.id === id);
};

const createBooking = (bookingData) => {
    const newBooking = {
        id: bookings.length + 1,
        ...bookingData
    };

    bookings.push(newBooking);

    return newBooking;
};

const updateBooking = (id, bookingData) => {
    const booking = bookings.find(b => b.id === id);

    if (!booking) {
        return null;
    }

    Object.assign(booking, bookingData);

    return booking;
};

const deleteBooking = (id) => {
    const index = bookings.findIndex(b => b.id === id);

    if (index === -1) {
        return null;
    }

    return bookings.splice(index, 1)[0];
};

module.exports = {
    bookings,
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};