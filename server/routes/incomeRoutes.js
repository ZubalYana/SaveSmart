const express = require('express');
const router = express.Router();
const Income = require('../models/IncomeSchema');
const authenticateToken = require('../middleware/authMiddleware');

//get all user incomes (sorted by date)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.userId }).sort({ dateReceived: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch incomes', error: error.message });
  }
});

//create a new income
router.post('/', async (req, res) => {
  try {
    const { name, amount, currency, method, isRegular, periodicity, dayOfMonth, dayOfWeek, dateReceived, yearlyDate } = req.body;

    if (!name ||!amount || !currency || !method || (isRegular && !periodicity) || (!isRegular && !dateReceived)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (isRegular) {
      if (periodicity === 'Monthly' && !dayOfMonth) {
        return res.status(400).json({ message: 'Monthly income requires a dayOfMonth' });
      }
      if (periodicity === 'Weekly' && !dayOfWeek) {
        return res.status(400).json({ message: 'Weekly income requires a dayOfWeek' });
      }
      if (periodicity === 'Yearly' && !yearlyDate) {
        return res.status(400).json({ message: 'Yearly income requires a date' });
      }
    }

    let yearlyDay = null;
    let yearlyMonth = null;
    if (isRegular && periodicity === 'Yearly' && yearlyDate) {
      const dateObj = new Date(yearlyDate);
      yearlyDay = dateObj.getDate();
      yearlyMonth = dateObj.getMonth() + 1;
    }

    const newIncome = new Income({
      userId: req.user.userId,
      name,
      amount,
      currency,
      method,
      isRegular,
      periodicity: isRegular ? periodicity : null,
      dayOfMonth: isRegular && periodicity === 'Monthly' ? dayOfMonth : null,
      dayOfWeek: isRegular && periodicity === 'Weekly' ? dayOfWeek : null,
      yearlyDay,
      yearlyMonth,
      dateReceived: isRegular ? null : dateReceived,
    });

    await newIncome.save();
    res.status(201).json({ message: 'Income added successfully', income: newIncome });
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ message: 'Error adding income', error: error.message });
  }
});

//edit an income
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, periodicity, dayOfWeek, dayOfMonth, yearlyDate, amount, currency, method } = req.body;

    if (!name || !periodicity || !amount || !currency || !method) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Income amount must be greater than 0' });
    }

    const validPeriodicities = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
    if (!validPeriodicities.includes(periodicity)) {
      return res.status(400).json({ message: 'Invalid periodicity' });
    }

    if (periodicity === 'Weekly' && !dayOfWeek) {
      return res.status(400).json({ message: 'Day of the week is required for weekly income' });
    }

    if (periodicity === 'Monthly' && (!dayOfMonth || dayOfMonth < 1 || dayOfMonth > 31)) {
      return res.status(400).json({ message: 'Invalid day of the month for monthly income' });
    }

    if (periodicity === 'Yearly' && !yearlyDate) {
      return res.status(400).json({ message: 'Yearly date is required for yearly income' });
    }

    const updatedIncome = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.json({ message: 'Income updated successfully', income: updatedIncome });
  } catch (error) {
    res.status(500).json({ message: 'Error updating income', error: error.message });
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
