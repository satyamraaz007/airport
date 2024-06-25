// src/models/user.js

const db = require('../config/database');

const User = {
    create: (data, callback) => {
        const query = 'INSERT INTO user SET ?';
        db.query(query, data, callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM user';
        db.query(query, callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM user WHERE id = ?';
        db.query(query, [id], callback);
    },
    getByVehicleNo: (vehicle_no, callback) => {
        const query = 'SELECT * FROM user WHERE vehicle_no = ?';
        db.query(query, [vehicle_no], callback);
    },
    update: (id, data, callback) => {
        const query = 'UPDATE user SET ? WHERE id = ?';
        db.query(query, [data, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM user WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = User;
