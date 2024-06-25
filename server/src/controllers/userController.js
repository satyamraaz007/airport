const User = require('../models/user');
const validateFields = require('../middlewares/validateFields');

const createUser = (req, res) => {
    // Define required fields for createUser endpoint
    const requiredFieldsForCreate = ['vehicle_no', 'price'];

    validateFields(requiredFieldsForCreate)(req, res, () => {
        const data = {
            vehicle_no: req.body.vehicle_no,
            entry_time: new Date(),
            end_time: new Date(),
            price: req.body.price,
            updated_at: new Date()
        };
    
        User.create(data, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send({ id: results.insertId, ...data });
            }
        });
    });
};

const getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
};

const getUserById = (req, res) => {
    User.getById(req.params.id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(results[0]);
        }
    });
};

const updateUser = (req, res) => {
    const data = {
        vehicle_no: req.body.vehicle_no,
        entry_time: new Date(),
        end_time: new Date(),
        price: req.body.price,
        updated_at: new Date()
    };
    User.update(req.params.id, data, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send({ id: req.params.id, ...data });
        }
    });
};

const deleteUser = (req, res) => {
    User.delete(req.params.id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send({ message: 'User deleted successfully' });
        }
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
