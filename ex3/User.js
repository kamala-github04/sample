// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  // Array of follower IDs
});

module.exports = mongoose.model('User', userSchema);

