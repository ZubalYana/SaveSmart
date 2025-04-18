const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    dateOfBirth: String,
    subscribedToNewsletter: Boolean,
    heardFrom: String,
    purposeOfUsage: String,
    profilePicture: { type: String, default: "/defaultUserPicture.svg" },
    createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema);
module.exports = User;