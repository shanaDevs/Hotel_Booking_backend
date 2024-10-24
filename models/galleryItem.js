import mongoose from "mongoose";

const galleryItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }
) 

const galleryItem =mongoose.model('GalleryItem', galleryItemSchema);

export default galleryItem;