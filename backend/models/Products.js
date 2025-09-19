import mongoose, { Schema } from "mongoose";


const ProductsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    brand: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const Products = mongoose.model("Products", ProductsSchema);

export default Products