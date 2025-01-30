const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
})

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});