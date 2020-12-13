const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookings.controller');

// Retrieve all bookings
router.get('/', bookingController.findAll);

// Create a new booking
router.post('/', bookingController.create);

// Retrieve a single booking with id
router.get('/:id', bookingController.findById);

// Update a booking with id
router.put('/:id', bookingController.update);

// Delete a booking with id
router.delete('/:id', bookingController.delete);

module.exports = router