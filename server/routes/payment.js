const express = require("express");
const router = express.Router();
const { createPayment, getPayments, getPayment, updatePayment, deletePayment } = require("../controllers/payment");
const { authorization } = require("../middlewares/authenticate");

// Create a payment
router.post('/:apartmentId', authorization , createPayment);

// Get all payments
router.get("/", authorization, getPayments);

// Get a single payment
router.get("/:paymentId", authorization, getPayment);

// Update a payment
router.patch('/:paymentId', authorization, updatePayment);


// Delete a payment
router.delete("/:paymentId", authorization, deletePayment);

module.exports = router;
