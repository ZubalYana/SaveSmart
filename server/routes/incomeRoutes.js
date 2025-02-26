const express = require('express');
const router = express.Router();
const Income = require('../models/IncomeSchema');
const authenticateToken = require('../middleware/authMiddleware');

//get all user incomes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.userId });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch incomes', error: error.message });
  }
});

//create a new income
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { amount, currency, method, isRegular, periodicity, dayOfMonth, dayOfWeek, dateReceived } = req.body;

    if (!amount || !currency || !method || (isRegular && !periodicity) || (!isRegular && !dateReceived)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newIncome = new Income({
      userId: req.user.userId,
      amount,
      currency,
      method,
      isRegular,
      periodicity: isRegular ? periodicity : null,
      dayOfMonth: isRegular && periodicity === 'Monthly' ? dayOfMonth : null,
      dayOfWeek: isRegular && periodicity === 'Weekly' ? dayOfWeek : null,
      dateReceived: isRegular ? null : dateReceived,
    });

    await newIncome.save();
    res.status(201).json({ message: 'Income added successfully', income: newIncome });
  } catch (error) {
    res.status(500).json({ message: 'Error adding income', error: error.message });
  }
});

//delete an income
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedIncome = await Income.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting income', error: error.message });
  }
});

module.exports = router;
