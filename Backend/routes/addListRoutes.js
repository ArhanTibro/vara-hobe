import express from 'express';
import { upload, validateListing } from '../middlewares/addListMiddleware.js';
import {
  addListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
  purchaseListing,
  successPayment,
  failPayment,
  cancelPayment,
  getPayments,
  setListingAccess
} from '../controllers/addListController.js';
import { authenticateUser } from '../middlewares/userMiddleware.js';

const listRouter = express.Router();

// Listing routes
listRouter.post('/', authenticateUser, upload, validateListing, addListing);
listRouter.get('/', getAllListings);
listRouter.get('/:id', getListingById);
listRouter.put('/:id', authenticateUser, upload, validateListing, updateListing);
listRouter.delete('/:id', authenticateUser, deleteListing);

// Payment routes
listRouter.post('/:listingId/purchase', authenticateUser, purchaseListing);
listRouter.get('/payment-success/:tranId', successPayment);
listRouter.get('/payment-fail/:tranId', failPayment);
listRouter.get('/payment-cancel/:tranId', cancelPayment);
listRouter.get('/payments', authenticateUser, getPayments);
// 🛡️ Update listing access
listRouter.patch("/:id/access", authenticateUser, setListingAccess);


export default listRouter;
