const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    userImg: String,
    since: Date,
    bio: String,
    profileIMG: String
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;