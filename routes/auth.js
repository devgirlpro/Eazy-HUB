const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get("/signup", (req, res, next) => {
	res.render("signup", {layout: false});
});



router.post('/signup', (req, res, next) => {
	const {username, password, name, lastName, street, email, phone} = req.body
	console.log("req.body =>", req.body)
	// validation
	if (password.length < 4) {
		res.render('signup', {layout: false}, { message: 'Password has to be 4 chars min' })
		return
	}
	// check if username is not empty
	if (username === '') {
		res.render('signup', {layout: false}, { message: 'Username cannot be empty' })
		return
	}	
	
	// validation passed
	// check if that username already exists 
	User.findOne({ username: username })
		.then(userFromDB => {
			// if there is a user
			if (userFromDB !== null) {
				res.render('signup', {layout: false}, { message: 'Your username is already taken' })
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
						res.redirect('/login')
					})
					.catch(err => {
						next(err)
					})
			}
		})
});



router.get("/login", (req, res, next) => {
	res.render("login", {layout: false});
});



router.post('/login', (req, res, next) => {
	const { username, password } = req.body
	// do we have a user with that username in the db
	User.findOne({ username: username })
		.then(userFromDB => {
			if (userFromDB === null) {
				// username is not correct -> show login form again
				res.render('login', { message: 'Invalid credentials' })
				return
			}
			


			// username is correct
			// check the password from the form against the hash in the db
			if (bcrypt.compareSync(password, userFromDB.password)) {
				// the password is correct -> the user can be logged in
				// req.session is an obj that is provided by express-session
				req.session.username = userFromDB

                // console.log(username)
				// res.redirect('/driver-vehicle');	
			}
            if (username === "manager") {
				res.redirect("/manager")
			}else {
				res.redirect("/driver")
			}
			
		
		})
});




router.get("/employee", (req,res,next) => {
	res.render("employee");
})


router.get("/driver", (req, res, next) => {
    console.log("test signup")
	res.render("driver");
});










module.exports = router;