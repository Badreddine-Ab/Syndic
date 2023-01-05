const Payment = require("../models/payment");
const Apartment = require("../models/appartement");
const apiError = require('../utils/apiError')


// Create a payment
exports.createPayment = async (req, res, next) => {
  try {
    const { apartmentId } = req.params;
    const apartment = await Apartment.findById(apartmentId);
    console.log(apartmentId)
    if (!apartment) {
      return next (new apiError("Apartment not found", 404));
    }

    const payment = new Payment({
      ...req.body,
      apartment: apartmentId,
    });

    await payment.save();
    apartment.paymentHistory.push(payment._id);
    await apartment.save();

    res.status(201).send({ payment });
  } catch (error) {
    next(error);
  }
};

// Get all payments
exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().populate("apartment");
    res.send({ payments });
  } catch (error) {
    next(error);
  }
};

// Get a single payment
exports.getPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId).populate("apartment");
    if (!payment) {
      return next (new apiError("Payment not found", 404));
    }
    res.send({ payment });
  } catch (error) {
    next(error);
  }
};

// Update a payment
exports.updatePayment = async (req, res, next) => {
    try {
      const { paymentId } = req.params;
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        return next(new apiError("Payment not found", 404));
      }
  
      Object.assign(payment, req.body);
      payment.paid = true;
      await payment.save();
  
      res.send({ payment });
    } catch (error) {
      next(error);
    }
  };
  

// Delete a payment
exports.deletePayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    if (!payment) {
        return next(new apiError("Payment not found", 404));
    }
    await payment.remove();
    res.send({ message: "Payment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
