const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./models/UserModel');
const Tip = require('./models/TipSchema');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authMiddleware');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  });

app.use(cors());
app.use(express.json());
app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/tips', async (req, res) => {
    try {
      const tips = await Tip.find();
      res.json(tips);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tips' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
