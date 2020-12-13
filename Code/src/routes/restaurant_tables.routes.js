const express = require('express')
const router = express.Router()
const restaurant_tableController = require('../controllers/restaurant_tables.controller');

// Retrieve all restaurant_tables
router.get('/', restaurant_tableController.findAll);

// Create a new restaurant_table
router.post('/', restaurant_tableController.create);

// Retrieve a single restaurant_table with id
router.get('/:id', restaurant_tableController.findById);

// Update a restaurant_table with id
router.put('/:id', restaurant_tableController.update);

// Delete a restaurant_table with id
router.delete('/:id', restaurant_tableController.delete);

module.exports = router
