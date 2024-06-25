// src/routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const validateFields = require('../middleware/validateFields');

const requiredFieldsForOrder = ['vehicle_no'];

router.post('/create-order', validateFields(requiredFieldsForOrder), paymentController.createOrder);
router.post('/verify-payment', paymentController.verifyPayment);
router.get('/vehicles', paymentController.getAllVehicles);

module.exports = router;
