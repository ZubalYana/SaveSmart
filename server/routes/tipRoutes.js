const express = require('express');
const router = express.Router();
const Tip = require('../models/TipSchema');

//get all tips
router.get('/', async (req, res) => {
  try {
    const tips = await Tip.find();
    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tips', error: error.message });
  }
});

//create a tip
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newTip = new Tip({ title, content });
    await newTip.save();

    res.status(201).json({ message: 'Tip added successfully', tip: newTip });
  } catch (error) {
    res.status(500).json({ message: 'Error adding tip', error: error.message });
  }
});

//delete a tip
router.delete('/:id', async (req, res) => {
  try {
    const deletedTip = await Tip.findByIdAndDelete(req.params.id);

    if (!deletedTip) {
      return res.status(404).json({ message: 'Tip not found' });
    }

    res.json({ message: 'Tip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tip', error: error.message });
  }
});

module.exports = router;
