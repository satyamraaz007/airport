// src/controllers/paymentController.js

const Razorpay = require('razorpay');
const { razorpayConfig } = require('../utils/variables');
const User = require('../models/user');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: razorpayConfig.key_id,
    key_secret: razorpayConfig.key_secret
});

const createOrder = async (req, res) => {
    const { vehicle_no } = req.body;

    // Fetch user from database using vehicle_no
    User.getByVehicleNo(vehicle_no, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'Vehicle not found' });
        }

        const user = results[0];
        const amount = user.price * 100; // amount in paise

        // Create Razorpay order
        const options = {
            amount,
            currency: 'INR',
            receipt: `receipt_${user.id}`,
            payment_capture: 1
        };

        razorpay.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send(order);
        });
    });
};

const verifyPayment = (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Verify the payment using Razorpay signature verification
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', razorpayConfig.key_secret);

    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        res.status(200).send({ message: 'Payment verified successfully' });
    } else {
        res.status(400).send({ message: 'Invalid signature' });
    }
};

const getAllVehicles = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
};

module.exports = {
    createOrder,
    verifyPayment,
    getAllVehicles
};
