const dbConn = require('../config/db-connection');
var Restaurant = function (_restaurant) {
    this.title = _restaurant.title;
    this.address = _restaurant.last_name;
    this.coordinates = _restaurant.email;
    this.average_price = _restaurant.average_price;
    this.minimal_reservation_fee = _restaurant.minimal_reservation_fee;
    this.information = _restaurant.information;
    this.schedule = _restaurant.schedule;
    this.kitchen = _restaurant.kitchen;
    this.phone = _restaurant.phone;
    this.img1 = _restaurant.img1;
    this.img2 = _restaurant.img2;
    this.img3 = _restaurant.img3;
    this.status = _restaurant.status ? _restaurant.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
};
Restaurant.create = function (_restaurant) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("INSERT INTO Restaurant set ?", _restaurant, function (err, res) {
            if (err) {
                console.log("Model Restaurant - Create - Error: ", err);
                $reject(err);
            }
            else {
                console.log(res.insertId);
                $resolve(res.insertId);
            }
        });
    });
};
Restaurant.findById = function (id) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from Restaurant where restaurant_id = ? LIMIT 1 ", id, function (err, res) {
            if (err) {
                console.log("Model Restaurant - FindById - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res[0]);
            }
        });
    });

};
Restaurant.findAll = function () {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from Restaurant", function (err, res) {
            if (err) {
                console.log("Model Restaurant - FindAll - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
Restaurant.search = function (_search, _location) {
    return new Promise(($resolve, $reject) => {
        let query = "";
        if (!_location || _location == '-') {
            query = `Select * from Restaurant WHERE title LIKE '%${_search}%'`;
        } else {
            query = `Select * from Restaurant WHERE title LIKE '%${_search}%' AND address LIKE '%${_location}%'`;
        }
        dbConn.query(query, function (err, res) {
            if (err) {
                console.log("Model Restaurant - Search - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
Restaurant.findAll = function () {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from Restaurant", function (err, res) {
            if (err) {
                console.log("Model Restaurant - FindAll - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
Restaurant.update = function (id, _restaurant) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("UPDATE Restaurant SET title=?,address=?,coordinates=?,average_price=?,minimal_reservation_fee=?,information=?,schedule=?,kitchen=?,phone=?,img1=?,img2=?,img3=?,status=? WHERE restaurant_id = ?", [_restaurant.title, _restaurant.address, _restaurant.coordinates, _restaurant.average_price, _restaurant.minimal_reservation_fee, _restaurant.information, _restaurant.schedule, _restaurant.kitchen, _restaurant.phone, _restaurant.img1, _restaurant.img2, _restaurant.img3, _restaurant.status, id], function (err, res) {
            if (err) {
                console.log("Model Restaurant - Update - Error: ", err);
                $reject(err);
            } else {
                $resolve(res);
            }
        });
    });

};
Restaurant.delete = function (id) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("DELETE FROM Restaurant WHERE restaurant_id = ?", [id], function (err, res) {
            if (err) {
                console.log("Model Restaurant - Delete - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};

module.exports = Restaurant;