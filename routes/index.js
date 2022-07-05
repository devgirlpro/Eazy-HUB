const router = require("express").Router();


const User = require("../models/User");

const Vehicle = require("../models/Vehicle");

// const Damage = require("../models/dammage")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


/* GET employee page */
//access to the user from db
router.get("/employee", (req, res, next) => {
  User.find()
   .then(userData => {
    Vehicle.find()
      .then((vehicleData) => {
        res.render("employee", {userData, vehicleData})
      })
   })
   .catch(error => console.log(error))


  
});





/* GET profile page */
router.get("/driver", (req, res, next) => {
  res.render("driver");
});


/* GET manager page */
// router.get("/manager", (req, res, next) => {
//   User.find()
//     .then(userData => {
//       res.render("manager", {userData})
//         console.log(userData)
//     })
    // .catch(err => console.log(error))

  // res.render("manager");
// });







module.exports = router;
