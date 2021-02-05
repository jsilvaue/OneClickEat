const dbConn = require('../config/db-connection');
var RestaurantTable = function (_table) {
    this.restaurant_id = _table.restaurant_id;
    this.restaurantTable_id = _table.restaurantTable_id;
    this.nickname = _table.nickname;
    this.ref = _table.ref;
    this.max_occupation = _table.max_occupation;
    this.min_occupation = _table.min_occupation;
    this.description = _table.description;
    this.location = _table.location;
    this.status = _table.status ? _table.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
};
RestaurantTable.create = function (_table) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("INSERT INTO RestaurantTable set ?", _table, function (err, res) {
            if (err) {
                console.log("Model RestaurantTable - Create - Error: ", err);
                $reject(err);
            }
            else {
                console.log(res.insertId);
                $resolve(res.insertId);
            }
        });
    });
};
RestaurantTable.findById = function (id) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from RestaurantTable where id = ? ", id, function (err, res) {
            if (err) {
                console.log("Model RestaurantTable - FindById - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
RestaurantTable.getRestaurantTables = function (id) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from RestaurantTable where restaurant_id = ? ", id, function (err, res) {
            if (err) {
                console.log("Model RestaurantTable - FindById - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
RestaurantTable.findAll = function () {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from RestaurantTable", function (err, res) {
            if (err) {
                console.log("Model RestaurantTable - FindAll - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
RestaurantTable.update = function (id, _table) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("UPDATE RestaurantTable SET nickname=?,ref=?,max_occupation=?,min_occupation=?,description=?,location=?,satus=? WHERE id = ?", [_table.nickname, _table.ref, _table.max_occupation, _table.min_occupation, _table.description, _table.location, _table.status, id], function (err, res) {
            if (err) {
                console.log("Model RestaurantTable - Update - Error: ", err);
                $reject(err);
            } else {
                $resolve(res);
            }
        });
    });

};
RestaurantTable.delete = function (id) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("DELETE FROM RestaurantTable WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("Model RestaurantTable - Delete - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};

module.exports = RestaurantTable;