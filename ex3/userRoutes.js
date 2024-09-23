// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();

router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});

router.post('/:id/follow', async (req, res) => {
    const user = await User.findById(req.params.id);
    user.followers.push(req.body.followerId);
    await user.save();
    res.send(user);
});

// routes/userRoutes.js
router.get('/:id/posts', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers');
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        // Check if user has followers
        if (!user.followers || user.followers.length === 0) {
            return res.status(404).send('No followers found for this user');
        }

        // Find posts from followers
        const posts = await Post.find({ author: { $in: user.followers } }).populate('author');
        res.send(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Server error');
    }
});


module.exports = router;
