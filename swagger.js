// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Talenta Submiter API",
      version: "1.0.0",
      description: "API documentation for Talenta Submiter",
    },
    servers: [
      { url: "/api" }, // works on Vercel
    ],
  },
  apis: ["./api/**/*.js"], // document all API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
