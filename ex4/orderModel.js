const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurant: String,
    foodItem: String,
    quantity: Number,
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
