CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    customer VARCHAR(100) NOT NULL,
    service VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL
);
