const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    prompts:{
        type: Array,
        required: true,
    }   
}, {timestamps: true});

UserSchema.index({ email: 1 }, { unique: true });

const UserCollection = mongoose.model('UserCollection', UserSchema);

module.exports = UserCollection;