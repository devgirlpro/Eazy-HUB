const router = require("express").Router();
const bcrypt = require('bcryptjs')

const User = require("../models/User");

const Vehicle = require("../models/Vehicle");

// const Damage = require("../models/dammage")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
 
router.get("/employee/delete/:userId", (req, res, next) => {
  User.findByIdAndRemove({_id: req.params.userId})
    .then(() => res.redirect("/employee"))
    .catch(error => console.log(error))
  
})

/* GET manager page */
router.get("/manager", (req, res, next) => {
  res.render("manager");
});


/* GET employee/edite page */
router.get("/employee/edit/:userId", (req, res) => {
  const userId = req.params.userId
  User.find()
  //"vehicle" => it's refer to the vehicle in user scema
   .populate("vehicle")
   .then(userData => {
    Vehicle.find({available: true})
      .then((vehicleData) => {
        userData.map(user => {
          if(user._id == userId) {
            user.selected = true
          }else {user.selected = false}
          return user
        })
        console.log(userData)
        res.render("edit", {userData, vehicleData, userId})
      })
   })
   .catch(error => console.log(error)) 
})


/* GET employee page */
//access to the user from db
router.get("/employee", (req, res, next) => {
  
  User.find()
 
   .populate("vehicle")
   .then(userData => {
    // console.log("USERDATA =>", userData)
    // Vehicle.find()
      // .then((vehicleData) => {
        res.render("employee", {userData})
      // })
   })
   .catch(error => console.log(error))  
});



router.post('/employee', (req, res, next) => {
	const {username, password, name, lastName, street, email, phone} = req.body
	// console.log("req.body =>", req.body)
	// validation
	if (password.length < 4) {
		res.render('employee', { message: 'Password has to be 4 chars min' })
		return
	}
	// check if username is not empty
	if (username === '') {
		res.render('signup', { message: 'Username cannot be empty' })
		return
	}	
	// validation passed
	// check if that username already exists 
	User.findOne({ username: username })
		.then(userFromDB => {
			// if there is a user
			if (userFromDB !== null) {
				res.render('signup', { message: 'Your username is already taken' })
				return
			} else {
				// we can use that username
				// we hash the password 
				const salt = bcrypt.genSaltSync()
				const hash = bcrypt.hashSync(password, salt)
				// console.log(hash)
				// create the user
				User.create({username, password: hash, name, lastName, street, email, phone})
					.then(createdUser => {
						// console.log(createdUser)
						res.redirect('/employee')
					})
					.catch(err => {
						next(err)
					})
			}
		})
});




//get employee delete page
// router.post("/employee/:userId/delete", (req, res) => {
//   User.findByIdAndRemove({_id: req.params.userId})
//     .then(() => res.sendStatus(204))
//     .catch(error => console.log(error))
// });
  // "vehicle" => it's refer to the vehicle in user scema
 




//edite a user
router.post("/employee/edit/:userId", (req, res) => {
  const userId = req.params.userId
  // console.log("req.body //edite=>", req.body);
const {username, name, lastName, phone, email, vehicle} = req.body;
let user = {
  username, 
  name, 
  lastName, 
  phone, 
  email
}

// User.find()
// .then(userFromDB => {
//   if(vehicle)
// })
// .catch()


if(vehicle) {
  user.available = false;
  user.vehicle = vehicle;
  Vehicle.findById(vehicle)
  .then(vehicleFromDB => {
   vehicleFromDB.available = false;
   vehicleFromDB.save()
  })
// console.log("VEHICLE ==>>", vehicle)

}else {
  user.available = true;
  user.$unset = {vehicle: 1};
  // user.vehicle = vehicle;
  // Vehicle.findById(vehicle)
  // .then(vehicleFromDB => {
  //  vehicleFromDB.available = true;
  //  vehicleFromDB.save()
}
// )}
  // console.log("req.body.vehicle =>", req.body.vehic)
  User.findByIdAndUpdate(userId, user)
  .then(user => {
    res.redirect("/employee")
  })
  //  .populate("vehicle")
  //  .then(userData => {
  //        Vehicle.find()
  //     .then((vehicleData) => {
  //       res.render("employee", {userData, vehicleData})
  //     })
  //  })
   .catch(error => console.log(error))  
});



/* GET vehicle page */
//access to the vehicles from db
router.get("/vehicle", (req, res, next) => {
    Vehicle.find()
    .then((vehicleData) => {
      // console.log()
      res.render("vehicle", {vehicleData})
    })
    .catch(error => console.log(error))

  // res.render("vehicle");
});






/* GET profile page */
// router.get("/driver", (req, res, next) => {
//   res.render("driver");
// });


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
