const { body, validationResult } = require("express-validator");

const bookingValidation = [
    body("customer")
        .notEmpty()
        .withMessage("Customer is required"),

    body("service")
        .notEmpty()
        .withMessage("Service is required"),

    body("booking_date")
        .notEmpty()
        .withMessage("Booking date is required"),

    body("booking_time")
        .notEmpty()
        .withMessage("Booking time is required"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
];

module.exports = bookingValidation;