const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    dateOfBirth: String,
    subscribedToNewsletter: Boolean,
    whereDidHear: String,
    purposeOfUsage: String,
    createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema);
module.exports = User;