const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    menu: [{
        itemName: String,
        price: Number
    }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
