const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./models/UserModel');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  });

app.use(cors());
app.use(express.json());

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, dateOfBirth, subscribed, heardFrom, purposeOfUsage } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: name,
            email,
            password: hashedPassword,
            dateOfBirth,
            subscribedToNewsletter: subscribed,
            heardFrom,
            purposeOfUsage,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });

    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
