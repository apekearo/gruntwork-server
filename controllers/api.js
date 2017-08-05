var express = require("express");
var db = require("../models");
var router = express.Router();

// get all users
// get all employees
// get all employers
router.get('/user', function (req, res) {
  var role = req.query.role;
  var phone = req.query.phone;
  db.User.findAll({
    where: {
      role: role || {$ne: null},
      phone: phone || {$ne: null},
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
router.post("/user", function(req, res){
  console.log(req.body);
  db.User.create(req.body)
  .then(function(user){
    res.json(user);
  }).catch(function(err){
    res.json(err);
  })
})

// update a user
router.put("/user/:id", function(req, res){
  var id = req.params.id;
  db.User.update(
  req.body,
  {
    where:{
      id: id
    }
  })
  .then(function(result) {
    // When updating with Sequelize, it will return us an array that only
    // contains one item. This item will only be either 1 or 0. 
    // 1 stands for success
    // 0 means fuck off
    if(result[0]) {
      res.json({message: `Successfully updated user ${id}`});
    }else {
      res.status(403).json({message: `There is no such as user ${id}! You idiot!`});
    }
  })
  .catch((err)=> {
    res.status(500).json(err)
  })
})


// delete a user
router.delete("/user/:id", function(req, res){
  var id = req.params.id;
  db.User.destroy({
    where: {
      id: id
    }
  })
  .then(function(result){
    console.log(result)
    if(result) {
      res.json({message: `Successfully deleted user ${id}`});
    }else {
      res.status(403).json({message: `There is no such as user ${id}! You idiot!`});
    }
  })
  .catch((err)=> {
    res.status(500).json(err)
  })
})



// router.get('/index', function (){
//     res.send('/index.html')
// })
module.exports = router;