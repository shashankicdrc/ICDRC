const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 1,
    required: true,
  },
  merchantTransactionId: {
    type: String,
    required: true,
  },
  merchantUserId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["successful", "failed", "pending"],
    default: "pending",
  },
}, { timestamps: true });

let paymentModel;

try {
  // Check if the model already exists
  paymentModel = mongoose.model('payments');
} catch (error) {
  // If the model doesn't exist, define it
  paymentModel = mongoose.model('payments', paymentSchema);
}

module.exports = paymentModel;
