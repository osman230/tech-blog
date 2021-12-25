const { readdirSync } = require('fs');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();


//login

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.render('/');
        return;
    }
    res.render('login');
})

//sign up

router.get('/signup', (req, res) => {
    res.render('signup');
})

// find all 

router.get('/', (req, res) => {
    Post.findAll({
        attribute: [
            'id',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'user_id',
                    'post_id',
                    'comment_text',
                    'created_at'                    
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn});
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//find one

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment, 
                attributes: [
                    'id',
                    'user_id',
                    'post_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(postData => {
        if(!postData) {
            res.status(404).json({ message: 'no post found'});
            return;
        }

        const post = postData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn})

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

