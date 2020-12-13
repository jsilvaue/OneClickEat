const dbConn = require('../config/db-connection');
var Client = function (_client) {
    this.first_name = _client.first_name;
    this.last_name = _client.last_name;
    this.email = _client.email;
    this.phone = _client.phone;
    this.organization = _client.organization;
    this.designation = _client.designation;
    this.address = _client.salary;
    this.status = _client.status ? _client.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
};
Client.create = function (_client) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("INSERT INTO clients set ?", _client, function (err, res) {
            if (err) {
                console.log("Model Client - Create - Error: ", err);
                $reject(err);
            }
            else {
                console.log(res.insertId);
                $resolve(res.insertId);
            }
        });
    });
};
Client.findById = function (id) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from clients where id = ? ", id, function (err, res) {
            if (err) {
                console.log("Model Client - FindById - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
Client.findAll = function () {
    return new Promise(($resolve, $reject) => {
        dbConn.query("Select * from clients", function (err, res) {
            if (err) {
                console.log("Model Client - FindAll - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};
Client.update = function (id, _client) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("UPDATE clients SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,address=? WHERE id = ?", [_client.first_name, _client.last_name, _client.email, _client.phone, _client.organization, _client.designation, _client.address, id], function (err, res) {
            if (err) {
                console.log("Model Client - Update - Error: ", err);
                $reject(err);
            } else {
                $resolve(res);
            }
        });
    });

};
Client.delete = function (id) {
    return new Promise(($resolve, $reject) => {
        dbConn.query("DELETE FROM clients WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("Model Client - Delete - Error: ", err);
                $reject(err);
            }
            else {
                $resolve(res);
            }
        });
    });

};

module.exports = Client;