import express from 'express';
import multer from 'multer';
import { dislikeSellerById, getSellerDetailsBySellerId, getSellerDetailsForUI, likeSellerById, sellerLogin, sellerLogout, sellerSignUp, updateSellerDetails } from '../controller/SellerController.js';
import verifySeller from '../middleware/SellerMiddleware.js';
import verifyUser from '../middleware/UserMiddleware.js';

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

sellerRouter.get('/getsellerbyid' , verifySeller , getSellerDetailsBySellerId )
sellerRouter.post('/updateseller' , verifySeller , upload.single('image') ,  updateSellerDetails )
sellerRouter.get('/sellerlogout' , verifySeller , sellerLogout )

sellerRouter.post('/likeseller/:sellerId' ,verifyUser , likeSellerById )
sellerRouter.post('/dislikeseller/sellerId' , verifyUser , dislikeSellerById)
sellerRouter.get('/getSellerDetails/:sellerId', verifyUser , getSellerDetailsForUI)


export default sellerRouter;
