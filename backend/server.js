const errorHandler = require("./src/middlewares/errorHandler");

const express = require("express");

const bookingRoutes = require("./src/routes/bookingRoutes");

const authRoutes = require("./src/routes/authRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Cloud Native Salon Booking Platform Backend is Running!");
});

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

app.get("/health", (req, res) => {
    res.status(200).json({
      status: "healthy",
      service: "Cloud Native Salon Booking Platform Backend",
      timestamp: new Date().toISOString()
    });
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});