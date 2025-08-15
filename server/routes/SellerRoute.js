import express from 'express';
import multer from 'multer';
import { sellerLogin, sellerSignUp } from '../controller/SellerController.js';
import verifySeller from '../middleware/SellerMiddleware.js';

const sellerRouter = express.Router();
const upload = multer({ dest: 'uploads/' }); 

// sign-up endpoint
sellerRouter.post('/sellersignup', upload.single('image'), sellerSignUp);
sellerRouter.post('/login' , sellerLogin)

sellerRouter.get('/authseller', verifySeller, (req, res) => {
  return res.status(200).json({
    success: true,
    seller: req.seller 
  });
});
export default sellerRouter;
