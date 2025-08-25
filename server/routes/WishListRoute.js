import express from 'express';
import verifyUser from '../middleware/UserMiddleware.js';
import { addWishList, getAllWishList, removeWishList } from '../controller/WishListController.js';

const wishlistRouter = express.Router();

//* Add a course to wishlist
wishlistRouter.post('/addwishlist/:courseId', verifyUser, addWishList);

//* Remove a course from wishlist
wishlistRouter.delete('/removewishlist/:courseId', verifyUser, removeWishList);

//* Get all courses in wishlist
wishlistRouter.get('/getallwishList', verifyUser, getAllWishList);

export default wishlistRouter;
