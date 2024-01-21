const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
        },
        role: {
            type: String,
            default: 'customer',
            required: true,
            minlength: 4,
            maxlength: 10,
        },
        country: {
            type: String,
            required: true,
        },
        img: {
            type: Array,
        },
        city: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const userModel = new mongoose.model('User', userSchema);

module.exports = userModel;