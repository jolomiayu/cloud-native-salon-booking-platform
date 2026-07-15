const pool = require("../config/db");


const getAllBookings = async (user) => {

    let result;

    if (user.role === "admin") {

        result = await pool.query(
            "SELECT * FROM bookings ORDER BY id"
        );

    } else {

        result = await pool.query(
            "SELECT * FROM bookings WHERE user_id = $1 ORDER BY id",
            [user.id]
        );

    }

    return result.rows;
};

const getBookingById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM bookings WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

const getBookingOwner = async (id) => {
    const result = await pool.query(
        "SELECT user_id FROM bookings WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

const createBooking = async (bookingData, userId) => {
    const { customer, service, booking_date, booking_time } = bookingData;

    const result = await pool.query(
        `INSERT INTO bookings (
            customer,
            service,
            booking_date,
            booking_time,
            user_id,
            status
        )
        VALUES ($1, $2, $3, $4, $5, 'pending')
        RETURNING *`,
        [customer, service, booking_date, booking_time, userId]
    );

    return result.rows[0];
};

const updateBooking = async (id, bookingData) => {
    const { customer, service, booking_date, booking_time } = bookingData;

    const result = await pool.query(
        `UPDATE bookings
         SET customer = $1,
             service = $2,
             booking_date = $3,
             booking_time = $4
         WHERE id = $5
         RETURNING *`,
        [customer, service, booking_date, booking_time, id]
    );

    return result.rows[0];
};

const updateBookingStatus = async (id, status) => {

    const result = await pool.query(
        `UPDATE bookings
         SET status = $1
         WHERE id = $2
         RETURNING *`,
        [status, id]
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
    getBookingOwner,
    createBooking,
    updateBooking,
    updateBookingStatus,
    deleteBooking
};