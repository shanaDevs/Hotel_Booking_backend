import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
        roomId: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        maxGuests: {
            type: Number,
            required: true,
            default: 1,
        },
        available: {
            type: Boolean,
            required: true,
            default: true
        },
        photos: [
            {
                type: String,
                required: true
            }
        ],

        specialDescription : {
        type: String,
        default: "",
        },
        notes:{
            type: String,
            default: "",
        }

    }

)

const Room = mongoose.model("Rooms", roomSchema);

export default Room;