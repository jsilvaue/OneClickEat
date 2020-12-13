const routes = {
    booking: require("./bookings.routes"),
    client: require("./clients.routes"),
    restaurant: require("./restaurants.routes"),
    restaurant_table: require("./restaurant_tables.routes"),
}
const express = require('express')
const router = express.Router();

router.use('/bookings', routes.booking);
router.use('/clients', routes.client);
router.use('/restaurants', routes.restaurant);
router.use('/tables', routes.restaurant_table);


module.exports = router;