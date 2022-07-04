const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get("/signup", (req, res, next) => {
	res.render("signup");
});



router.post('/signup', (req, res, next) => {
	const { username, password } = req.body
	console.log(username, password)
	// validation
	if (password.length < 4) {
		res.render('signup', { message: 'Password has to be 4 chars min' })
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
				console.log(hash)
				// create the user
				User.create({ username: username, password: hash })
					.then(createdUser => {
						console.log(createdUser)
						res.redirect('/login')
					})
					.catch(err => {
						next(err)
					})
			}
		})
});



router.get("/login", (req, res, next) => {
	res.render("login");
});


router.get("/profile", (req, res, next) => {
    console.log("test signup")
	res.render("profile");
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
				res.redirect('/profile');
			}
		})
});






module.exports = router;