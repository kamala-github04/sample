// routes/postRoutes.js
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.post('/', async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.send(post);
});

module.exports = router;