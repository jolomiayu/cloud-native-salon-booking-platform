const express = require("express");

const bookingRoutes = require("./src/routes/bookingRoutes");

const authRoutes = require("./src/routes/authRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Cloud Native Salon Booking Platform Backend is Running!");
});

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});