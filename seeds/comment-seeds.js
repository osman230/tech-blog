const { Comment }= require('../models');

const commentInfo = [{
    user_id: 1,
    post_id: 1,
    comment_text: "First Post"
},
{
    user_id: 2,
    post_id: 2,
    comment_text:  "Second Post"
}
];

const seedComments = () => Comment.bulkCreate(commentInfo);

module.exports = seedComments;