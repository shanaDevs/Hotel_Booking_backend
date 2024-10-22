import GalleryItem from "../modules/galleryItem.js";

export function createGalleryItem(req, res) {
    const user = req.user;

    if (!user) {
        return res.status(403).json({
            message: "Please login to create a new gallery item",
        });
    }
    if (user.type != "Admin") {
        return res.status(403).json({
            message: "Only admins can create gallery items",
        });
    }

    const galleryItemData = req.body;

    if (!galleryItemData) {
        return res.status(400).json({
            message: "Gallery item data is required",
        });
    }

    const newGalleryItem = new GalleryItem(galleryItemData);
    newGalleryItem.save()
        .then(() => {
            res.json({
                message: "New gallery item created successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "New gallery item saving failed",
                error: error.message,
            });
        });
}


export function getGalleryItems(req, res) {
    GalleryItem.find().then(
        (list) => {
            res.json({
                list: list,
            })
        }
    )
}
