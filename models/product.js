const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price : {
        type: Number,
        trim:  true,
        required: true,
        maxlength: 32

    },
    category: {
        type: ObjectId,
        ref:  'category',
        required: true,
        maxlength: 32
    },
    quantity:{
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }

},     { timestamps: true }
)

module.exports = mongoose.model("product", ProductSchema)