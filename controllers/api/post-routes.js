const router = require('express').Router();
const { Post, User, Comment } = require('../../utils/auth');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
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
                    attribtues: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
        ]
    }).then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [{
            model: User, 
            attributes: ['username']
        },
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
                mode: User, 
                attributes: ['username']
            }
        }]
    }).then (postData => {
        if(!postData) {
            res.status(404).json({ message: 'Error: Please enter valid info'});
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    }).then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_text: req.body.post_text
    },
    {
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if(!postData) {
            res.status(404).json({ message: 'Error: Please enter valid info'});
            return;
        }
        res.json(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if(!postData) {
            res.status(404).json({ message: 'Error: Please enter valid info'});
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;