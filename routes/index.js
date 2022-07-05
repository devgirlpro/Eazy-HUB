const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


/* GET employee page */
router.get("/employee", (req, res, next) => {
  res.render("employee");
});


/* GET profile page */
router.get("/profile", (req, res, next) => {
  res.render("profile");
});


/* GET drivertovehicle page */
router.get("/driver-vehicle", (req, res, next) => {
  res.render("driverVehicle");
});





module.exports = router;
