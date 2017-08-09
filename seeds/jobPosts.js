/**
 * Created by chengluli on 08/08/2017.
 */
var faker = require('faker');
var db = require('../models');

var numOfPosts = 10;
var roles = ['employee', 'employer']
while (numOfPosts > 0) {
    numOfPosts -= 1;
    db.JobPost.create({
        payAmount: faker.random.number(),
        role: roles[Math.floor(Math.random() * 2)],
        phone: faker.phone.phoneNumber(),
        description: faker.lorem.sentence(),
        hasCar: numOfPosts % 2 === 0,
        UserId: Math.ceil(Math.random() * 10)
    }).then(post => console.log(`post ${post.id} has been created`))
}
