import express from 'express';
import { createGalleryItem, getGalleryItems } from '../controllers/galleryItemControllers.js';
const galleryItemRouter = express.Router();

galleryItemRouter.post('/',createGalleryItem);
galleryItemRouter.get('/',getGalleryItems);


export default galleryItemRouter;
