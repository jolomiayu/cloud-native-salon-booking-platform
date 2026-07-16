const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },


        info: {
            title: "Cloud Native Salon Booking API",
            version: "1.0.0",
            description: "API documentation for the Cloud Native Salon Booking Platform"
        },
        servers: [
            {
                url: "http://18.201.9.225:3000"
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
