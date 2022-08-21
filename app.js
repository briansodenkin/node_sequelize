const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const _handlebars = require("handlebars");
const path = require("path");
const Sequelize = require("sequelize");
const db = require("./config/database");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => "Error Prompted");

const app = express();

app.engine(
  "handlebars",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
  })
);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false}))

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// Gig routes
app.use("/gigs", require("./routes/gig"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
