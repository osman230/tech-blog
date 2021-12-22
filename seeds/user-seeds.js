const { User } = require('../models');

const userInfo = [{
    username: 'Leslie',
    password: '1234'
},
{
    username: 'Vanessa',
    password: '2345'
}];


const seedUsers = () => User.bulkCreate(userInfo);

module.exports = seedUsers;