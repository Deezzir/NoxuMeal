const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    img: {
        type: String,
    },
    contains: [{
        type: String,
    }],
    desc: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    serving: {
        type: Number,
        required: true
    },
    calPerS: {
        type: Number,
        required: true
    },
    top: {
        type: Boolean,
        default: false
    }
});

const mealModel = mongoose.model("Meals", mealSchema);

module.exports = mealModel;
