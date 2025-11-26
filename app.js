require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const session = require("express-session");

const usersRouter = require("./routes/users");

const postsRouter = require("./routes/posts");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(
  session({
    secret: "super_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
    },
  })
);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(3000, () => console.log("Server started on port 3000"));
