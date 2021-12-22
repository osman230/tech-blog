const seedComments = require('./comment-seeds');
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const sequelize = require('../config/connection');

const seeds = async () => {
    await sequelize.sync({ force: true });
    await seedComments();
    await seedUsers();
    await seedPosts();
    process.exit(0);
};

seeds();