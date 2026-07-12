const { Pool } = require("pg");

const pool = new Pool({
    user: "salon_user",
    host: "localhost",
    database: "salon_booking",
    password: "SalonPass123!",
    port: 5432
});

module.exports = pool;