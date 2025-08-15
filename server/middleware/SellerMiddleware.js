import jwt from 'jsonwebtoken';
import Seller from '../models/SellerModel.js';

const verifySeller = async (req, res, next) => {
  try {
    const token = req.cookies.sellerToken;
    if (!token) {
      return res.status(200).json({
        success: false,
        message: "Token not found. Authentication failed."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const seller = await Seller.findById(decoded.id);
    if (!seller) {
      return res.status(200).json({
        success: false,
        message: "Seller not found. Authentication failed."
      });
    }

    req.seller = seller;
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Error in seller middleware: ${error.message}`
    });
  }
};

export default verifySeller;
