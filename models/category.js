const mongoose = require('mongoose');
const categoryScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, "Too short"],
        maxlength: [30, "Too long"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true       
    }
},     { timestamps: true }
)

module.exports = mongoose.model('Category', categoryScheme)

