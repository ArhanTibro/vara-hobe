// routes/listRouter.js
import express from 'express';
import { upload, validateListing } from '../middlewares/addListMiddleware.js';
import { addListing, getAllListings, getListingById, updateListing, deleteListing } from '../controllers/addListController.js';
import { authenticateUser } from '../middlewares/userMiddleware.js';

const listRouter = express.Router();

listRouter.post('/', authenticateUser, upload, validateListing, addListing);
listRouter.get('/', getAllListings);
listRouter.get('/:id', getListingById);
listRouter.put('/:id', authenticateUser, upload, validateListing, updateListing);
listRouter.delete('/:id', authenticateUser, deleteListing);

export default listRouter;
