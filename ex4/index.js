const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Restaurant = require('./models/restaurantModel');
const Order = require('./models/orderModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/foodDelivery', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Seed restaurants (you can remove this in production)
app.get('/seed-restaurants', async (req, res) => {
    await Restaurant.deleteMany({});
    
    const restaurants = [
        {
            name: 'Italian Delight',
            menu: [
                { itemName: 'Pizza', price: 10 },
                { itemName: 'Pasta', price: 12 }
            ]
        },
        {
            name: 'Burger Town',
            menu: [
                { itemName: 'Burger', price: 8 },
                { itemName: 'Fries', price: 3 }
            ]
        }
    ];
    
    await Restaurant.insertMany(restaurants);
    res.send('Restaurants seeded!');
});

// Get list of restaurants
app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
});

// Get menu of a specific restaurant
app.get('/menu/:restaurantName', async (req, res) => {
    const restaurant = await Restaurant.findOne({ name: req.params.restaurantName });
    res.json(restaurant ? restaurant.menu : []);
});

// POST route to handle food orders
app.post('/order', async (req, res) => {
    try {
        const { restaurant, foodItem, quantity } = req.body;

        const newOrder = new Order({ restaurant, foodItem, quantity });
        await newOrder.save();
        
        res.status(201).send('Order placed successfully!');
    } catch (err) {
        res.status(500).send('Failed to place order.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
