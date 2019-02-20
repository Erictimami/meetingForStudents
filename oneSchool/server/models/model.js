// var mongoose = require('mongoose');

// var ReviewSchema = new mongoose.Schema({
//     comment: {type: String, required: [true, 'You must enter a comment'], minlength: [3, 'The comment must have at least 3 characters required']},
//     reviewer: {type: String, required: [true, 'You must enter your name'], minlength: [3, 'Your name must have at least 3 characters required']},
//     rate: {type: Number, default: 5}
// },
// {timestamps: true});

// var MovieSchema = new mongoose.Schema({
//     name: {type: String, required: [true, "You must enter the restaurant's name"], minlength: [3, "The restaurant's name must have at least 3 characters required"]},
//     reviews: [ReviewSchema]},
//     {timestamps: true});

// mongoose.model('review', ReviewSchema);
// mongoose.model('restaurant', MovieSchema);