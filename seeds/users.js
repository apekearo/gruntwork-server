var faker = require('faker')
var db = require('../models')

var numOfUsers = 10
while (numOfUsers > 0) {
    numOfUsers -= 1;
    db.User.create({
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        // Set to true when numOfUser is even
        // False if numOfUsers is odd
        hasCar: numOfUsers % 2 === 0 ? true : false
    }).then((newUser) => {
        console.log(`${newUser.firstName} has registered!`)
    })
}