const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurants.controller');

// Retrieve all restaurants
router.get('/', restaurantController.findAll);

// Search restaurants
router.get('/search/:search/:location', restaurantController.search);

// Create a new restaurant
router.post('/', restaurantController.create);

// Retrieve a single restaurant with id
router.get('/:id', restaurantController.findById);

// Update a restaurant with id
router.put('/:id', restaurantController.update);

// Delete a restaurant with id
router.delete('/:id', restaurantController.delete);

module.exports = router
