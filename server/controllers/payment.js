const Apartment = require('../models/Apartment');
const Payment = require('../models/Payment');

// Create a new payment for an apartment
exports.createPayment = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).send();
    }
    const payment = new Payment({ ...req.body, apartment: apartment._id });
    await payment.save();
    apartment.paymentHistory.push(payment._id);
    await apartment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all payments for an apartment
exports.getPayments = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).send();
    }
    const payments = await Payment.find({ apartment: apartment._id });
    res.send(payments);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment) {
      return res.status(404).send();
    }
    res.send(payment);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a payment
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.paymentId, req.body, { new: true });
    if (!payment) {
      return res.status(404).send();
    }
    res.send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.paymentId);
    if (!payment) {
      return res.status(404).send();
    }
    res.send(payment);
  } catch (error) {
    res.status(500).send(error);
  }
};
