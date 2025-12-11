require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = require("./swaggerDef");
const usersRouter = require("./routes/users");
const aiRouter = require("./routes/ai");
const mlRouter = require("./routes/ml");
const postsRouter = require("./routes/posts");
const chatbotRouter = require("./routes/chatbot");
const externalRoutes = require("./routes/external");
const paymentsRouter = require("./routes/payments");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/ai", aiRouter);
app.use("/ml", mlRouter);
app.use("/chatbot", chatbotRouter);
app.use("/analytics", require("./routes/analytics"));
app.use("/api/external", externalRoutes);
app.use("/api/stripe", paymentsRouter);

app.listen(3000, () => console.log("Server started on port 3000"));
