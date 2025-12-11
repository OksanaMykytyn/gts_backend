const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "GTS Forum",
    version: "1.0.0",
    description: "API для управління користувачами, постами та AI-функціями",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {},
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

module.exports = swaggerDefinition;
