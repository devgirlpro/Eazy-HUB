const router = require("express").Router();


const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


/* GET employee page */
router.get("/employee", (req, res, next) => {
  res.render("employee");
});


/* GET profile page */
router.get("/driver", (req, res, next) => {
  res.render("driver");
});


/* GET manager page */
router.get("/manager", (req, res, next) => {
  User.find()
    .then(userData => {
      res.render("manager", {userData})
        // console.log(userData)
    })
    .catch(err => console.log(error))

  // res.render("manager");
});







module.exports = router;
