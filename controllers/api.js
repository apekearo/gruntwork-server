var express = require("express");
var db = require("../models");
var router = express.Router();
// These three lines should be put outside of the fuction
	// on top of the file
	 const accountSid = 'AC7aa3c87df5d67ff71d034fa21d97f564';
	 const authToken = '';
	 const client = require('twilio')(accountSid, authToken);

// User APIs
// get all users
// get all employees
// get all employers

router.post('textit/posts', function (req, res) {
	

	var phone = req.body.phone;
	var zipCode = req.body.text;

	// Step1: get the first jobPost data with sequelize near the zip code
	db.JobPost.findOne({
		where: {
			locationZip: zipCode
		},
		order: [
			['createdAt', 'DESC']
		]
	}).then(post => {
		var text = `Pay Amount: ${post.payAmount}\n 
		phone number: ${post.phone}` 
		// Step2: send the jobpost back to users 
		client.messages.create({
				body: text, // here is your text message
				to: phone, // replace this with use's phone number
				from: '+12544002317',
			})
			.then((message) => {
				//this particular res.json isn't needed for the file as much
				//as it ends the file, and isn't left hangin
				res.json({
					message: 'Text has been sent'
				})
			});
	})
})

router.post('/textit/:question', function (req, res) {
	const question = req.params.question;
	const value = req.body.text.trim().toLowerCase();
	const phone = req.body.phone;

	console.log(value, phone);
	if (!value) {
		res.status(400).json({
			message: 'you texted the wrong word, get thelettersright.'
		});
		return;
	}

	switch (question) {
		case 'role':
			db.JobPost.create({
					phone,
					role: value
				})
				.then(post => {
					res.json({
						hasDone: post.hasFinishedCreation()
					})
				})
				.catch(err => console.log(err.message));
			break;
		case 'payAmount':
			updatePost(phone, res, question, value);
			break;
		case 'description':
			updatePost(phone, res, question, value);
			break;
		case 'hasCar':
			updatePost(phone, res, question, value);
			break;
		case 'locationZip':
			updatePost(phone, res, question, value);
			break;
		default:
			res.status(401).json({
				message: 'Not valid'
			});
			break;
	}
});

/**
 * updatePost
 * A helper method to update value of a jobPost through user's phone number.
 * @param {number} phone - User's phone number
 * @param {object} res - res object of express router
 * @param {string} key - which key you want to update for a jobPost
 * @param {any} value - what is the new value of that jobPost's key
 * @returns {Promise.<TResult>}
 */
function updatePost(phone, res, key, value) {
	// If you want to always have only ONE record in the database of a jobpost with that phone
	// number, use findOrCreate instead of findOne. findOne will create a new record in the database
	// each time a 'role' question got answered
	return db.JobPost.findOne({
			where: {
				phone
			},
			order: [
				['createdAt', 'DESC']
			]
		})
		.then(post => {
			if (post) {
				post.updateAttributes({
						[key]: value
					})
					.then(updatedPost => {
						res.json({
							message: 'You have successfully updated it!'
						})
					})
					.catch(err => console.log(err.message));
			} else {
				const err = new Error('You should have one post for that number');
				res.status(404).json({
					message: err.message
				});
			}
		})
		.catch(err => console.log(err.message));
}


//!!!Why doesn't the models all require sequalize!!
//first question    ;;; 
//create a post using the users phone number
//put reponse to the post
//and for the other qustions    this stuff updates the listings
//step 1;  find a post by their phone number
// 
//step2; update the post data according to the response  
// understand inlude  
// you can filter an unfinished post out, .filter  for an array
//ex  case name  find the user,  update the name for whatever the user replied.  
// 
// 		router.post('/posts', function (req, res) {
// 	const post = req.body.post;
// 	const userId = req.body.userId;
// 	post.UserId = userId;
// 	db.JobPost.create(post)
// 		.then(post => res.json(post))
// 		.catch(err => res.status(500).json(err))
// });

// user.findOrCreate() user.update   name name   

// jobPost.findorCreate   jobPost.update  role: {]}

//           router.post('/textit/:question/create', function (req, res) {
// 			var value = req.body.text;
// 	var phone = req.body.phone;
// 	  			const userId = req.body.phone;
// 				post.UserId = userId;
// 				var question = req.params.question;

// 		switch (question) {
// 		case 'role':
// 		//use sequalize to create the user  and add the phone from the text it 

//             var ref = db.child('users').child(value).child(phone).push({role: value});
//             contacts[phone].role = value;
// 			contacts[phone].id = ref.key();

// 			//create.user
// 			//
// 			break;
//         case 'name':
//             database.ref().child('users')
//             .child(contacts[phone].role || 'employee').child(phone).child(contacts[phone].id).update({name: value})
//             break;
//         case 'location':
//             database.ref().child('users')
//             .child(contacts[phone].role || 'employee').child(phone).child(contacts[phone].id).update({location: value})
//             break;
//         case 'skills':
//             database.ref().child('users')
//             .child(contacts[phone].role || 'employee').child(phone).child(contacts[phone].id).update({skills: value})
//             break;
//         case 'hourly':
//             database.ref().child('users')
//             .child(contacts[phone].role || 'employee').child(phone).child(contacts[phone].id).update({hourly: value})
//             break;    
// 	}
// 		db.JobPost.create(post)
// 					//i believe this is the spot i would put the filter for a complete form before posting
// 					.then(post => res.json(post))
// 					.catch(err => res.status(500).json(err));

//     // Get name
//     // Send it firebase
//     res.end();
// })})

router.get('/user', function (req, res) {
	var role = req.query.role;
	var phone = req.query.phone;
	db.User.findAll({
			where: {
				role: role || {
					$ne: null
				},
				phone: phone || {
					$ne: null
				},
			}
		})
		.then((users) => {
			res.json(users);
		})
})

// id
router.get('/user/:id', function (req, res) {
	var id = req.params.id;
	db.User.findById(id)
		.then((user) => {
			res.json(user);
		})
})

// create a user
router.post("/user", function (req, res) {
	console.log(req.body);
	db.User.create(req.body)
		.then(function (user) {
			res.json(user);
		}).catch(function (err) {
			res.json(err);
		})
})

// update a user
router.put("/user/:id", function (req, res) {
	var id = req.params.id;
	db.User.update(
			req.body, {
				//why a comma after body?
				//the answer is because  req.body, {}   are arguments inside teh function update
				where: {
					id: id
				}
			})
		.then(function (result) {
			// When updating with Sequelize, it will return us an array that only
			// contains one item. This item will only be either 1 or 0. 
			// 1 stands for success
			// 0 means fuck off
			if (result[0]) {
				res.json({
					message: `Successfully updated user ${id}`
				});
			} else {
				res.status(403).json({
					message: `There is no such as user ${id}! You idiot!`
				});
			}
		})
		.catch((err) => {
			res.status(500).json(err)
		})
})


// delete a user
router.delete("/user/:id", function (req, res) {
	var id = req.params.id;
	db.User.destroy({
			where: {
				id: id
			}
		})
		.then(function (result) {
			console.log(result)
			if (result) {
				res.json({
					message: `Successfully deleted user ${id}`
				});
			} else {
				res.status(403).json({
					message: `There is no such as user ${id}! You idiot!`
				});
			}
		})
		.catch((err) => {
			res.status(500).json(err)
		})
});

// Posts APIs
router.get('/posts', function (req, res) {
	db.JobPost.findAll({
			include: [{
				model: db.User,
				attributes: {
					exclude: ['password']
				}
			}]
		})
		.then((posts) => {
			const filteredPosts = posts.filter(post => post.hasFinishedCreation());
			res.json(filteredPosts);
		})
		.catch(err => res.status(500).json(err))
});

router.post('/posts', function (req, res) {
	const post = req.body.post;
	const userId = req.body.userId;
	post.UserId = userId;
	db.JobPost.create(post)
		.then(post => res.json(post))
		.catch(err => res.status(500).json(err))
});

router.post('/register', function (req, res) {
	const user = req.body.user;
	console.log(req.body);
	db.User.create(user)
		.then(user => {
			delete user.dataValues.password;
			res.json(user)
		})
		.catch(err => res.status(500).json(err))
})

router.post('/login', function (req, res) {
	const email = req.body.email;
	const password = req.body.password;
	db.User.findOne({
			where: {
				email
			}
		})
		.then(user => {
			if (user.password !== password) {
				res.status(401).json({
					message: 'You ain\'t no my master'
				})
			}
			delete user.dataValues.password;
			res.json(user);
		})
		.catch(err => res.status(500).json(err))
})


// router.get('/index', function (){
//     res.send('/index.html')
// })
module.exports = router;
