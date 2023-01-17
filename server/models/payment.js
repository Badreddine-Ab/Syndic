  const mongoose = require("mongoose")

  const paymentSchema = new mongoose.Schema({
      apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment',
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      month: {
        type: String,
        required: true
      },
      year: {
        type: Number,
        required: true
      },
      paid: {
        type: Boolean,
        default: false
      }
    });
    
    const Payment = mongoose.model('Payment', paymentSchema);
    
    module.exports = Payment;
    