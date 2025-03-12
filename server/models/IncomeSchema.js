const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  method: { type: String, required: true },
  isRegular: { type: Boolean, required: true },
  periodicity: { type: String, enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'], default: null },
  dayOfMonth: { type: Number, default: null },
  dayOfWeek: { type: String, default: null },
  yearlyMonth: { type: Number, min: 1, max: 12, default: null },
  yearlyDay: { type: Number, min: 1, max: 31, default: null },
  dateReceived: { type: Date, required: function () { return !this.isRegular; } },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Income = mongoose.model('Income', IncomeSchema);
module.exports = Income;
