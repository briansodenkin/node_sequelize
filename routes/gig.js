const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
router.get("/", (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      console.log(gigs);
      res.render("gigs", {
        gigs,
      });
    })
    .catch((err) => console.log(err))
);
router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];
  Gig.create({ title, technologies, description, budget, contact_email })
    .then((gig) => res.redirect("/gigs"))
    .catch((err) => console.log(err));
});

module.exports = router;
