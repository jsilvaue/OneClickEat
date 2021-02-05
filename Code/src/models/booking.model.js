const dbConn = require('../config/db-connection');
var Booking = function (_booking) {
    this.client_id = _booking.client_id;
    this.restaurantTable_id = _booking.restaurantTable_id;
    this.reservation_date = _booking.reservation_date;
    this.reservation_time = _booking.reservation_time;
    this.status = _booking.status ? _booking.status : 1;
/*     this.created_at = new Date();
    this.updated_at = new Date(); */
};
Booking.create = function (_booking) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("INSERT INTO Booking set ?", _booking, function (err, res) {
            if (err) {
                console.log("Model Booking - Create - Error: ", err);
                $reject(err);
            }
            else {
                console.log(res.insertId);
                $resolve(res.insertId);
            }
        });
    });
};
Booking.findById = function (id) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from Booking where booking_id = ? ", id, function (err, res) {
            if (err) {
                console.log("Model Booking - FindById - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
Booking.findAll = function () {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from Booking", function (err, res) {
            if (err) {
                console.log("Model Booking - FindAll - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
Booking.update = function (id, _booking) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("UPDATE Booking SET table_id=?,client_id=?,reservation_date=?,reservation_time=?,status=? WHERE booking_id = ?", [_booking.table_id, _booking.client_id, _booking.reservation_date, _booking.reservation_time, _booking.status, id], function (err, res) {
            if (err) {
                console.log("Model Booking - Update - Error: ", err);
                $reject(err);
            } else {
                $resolve(res);
            }
        });
    });

};
Booking.delete = function (id) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("DELETE FROM Booking WHERE booking_id = ?", [id], function (err, res) {
            if (err) {
                console.log("Model Booking - Delete - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};

module.exports = Booking;