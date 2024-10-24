import mongoose from "mongoose";

const usersSchema = mongoose.Schema (
    {
        email: {
            type: String,
            required: true,
            uniq: true
        },
        password: {
            type: String,
            required: true,
        },
        Firstname: {
            type: String,
            required: true,
        },
        Lastname: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            default: "Customer",
        },
        whatsapp: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
            required: true,
        },
        emailverified: {
            type: Boolean,
            required: true,
            default: false,
        },
    }
)

const User = mongoose.model('Users', usersSchema);

export default User;