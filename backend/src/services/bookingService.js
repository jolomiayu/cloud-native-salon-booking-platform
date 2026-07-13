const pool = require("../config/db");


const getAllBookings = async () => {
    const result = await pool.query(
        "SELECT * FROM bookings ORDER BY id"
    );

    return result.rows;
};

const getBookingById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM bookings WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

const createBooking = async (bookingData) => {
    const { customer, service, date, time } = bookingData;

    const result = await pool.query(
        `INSERT INTO bookings (customer, service, date, time)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [customer, service, date, time]
    );

    return result.rows[0];
};

const updateBooking = async (id, bookingData) => {
    const { customer, service, date, time } = bookingData;

    const result = await pool.query(
        `UPDATE bookings
         SET customer = $1,
             service = $2,
             booking_date = $3,
             booking_time = $4
         WHERE id = $5
         RETURNING *`,
        [customer, service, date, time, id]
    );

    return result.rows[0];
};

const deleteBooking = async (id) => {
    const result = await pool.query(
        "DELETE FROM bookings WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};