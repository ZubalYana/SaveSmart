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
    const { amount, currency, method, isRegular, periodicity, dayOfMonth, dayOfWeek, dateReceived, yearlyDate } = req.body;

    if (!amount || !currency || !method || (isRegular && !periodicity) || (!isRegular && !dateReceived)) {
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

    // Parse yearly date
    let yearlyDay = null;
    let yearlyMonth = null;
    if (isRegular && periodicity === 'Yearly' && yearlyDate) {
      const dateObj = new Date(yearlyDate);
      yearlyDay = dateObj.getDate();
      yearlyMonth = dateObj.getMonth() + 1; // Months are 0-indexed in JS
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
