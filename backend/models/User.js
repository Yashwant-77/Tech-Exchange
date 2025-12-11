import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    cartItems: {
        type: Array,
        default: []
    }
})

const User = mongoose.model('User', UserSchema);

export default User;
