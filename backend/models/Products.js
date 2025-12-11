import mongoose, { Schema } from "mongoose";


const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category :{
        type : String,
        default : "tech"
    },
    description: {
        type: String,
        required: true
    },
    
    brand: {
        type: String,
        default: ""
    },
    location:{
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    sellerId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
}, { timestamps: true }
)


const Products = mongoose.model("Products", ProductsSchema);

export default Products