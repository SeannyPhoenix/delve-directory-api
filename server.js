// Import Externals
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
require("dotenv").config();

// Configure
const PORT = process.env.PORT || 3731;
const app = express();
const routes = require("./routes");

// Middleware
app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(morgan(`dev`));

app.use(
  session({
    store: new MongoStore({
      url: process.env.MONGO_URI
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("<h1>sessions API</h1>");
});

app.use("/api/v1/sessions", routes.sessions);
app.use("/api/v1/profiles", routes.profiles);
app.use("/api/v1/tables", routes.tables);

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
