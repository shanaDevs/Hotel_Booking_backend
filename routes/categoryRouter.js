import express from 'express';
import { createCategory, deleteCategory, getCategory,getCategorybyname, updateCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post('/createCategory', createCategory);

categoryRouter.get('/searchByPrice',(req,res) => {
res.json({
    message :"searchbyprice"
})
})
categoryRouter.delete('/:name',deleteCategory);
categoryRouter.get('/:name',getCategorybyname); 
categoryRouter.get('/',getCategory);
categoryRouter.put('/:name',updateCategory)

export default categoryRouter;
