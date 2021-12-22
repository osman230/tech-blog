const { Post } = require('../models');

const postInfo = [{
    title: 'Really Exciting',
    user_id: 1,
    content: 'I hope this works'
},
{
    title: 'I want to go to sleep',
    user_id: 2,
    content: 'I suck at designing'
}];


const seedPosts = () => Post.bulkCreate(postInfo);