import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const verifyUser = async (req, res, next) => {
  try {
   
    const token = req.cookies?.userToken;
    if (!token) {
      return res.status(200).json({ 
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(200).json({ 
        success: false,
        message: "User not found. Please log in again."
      });
    }

    
    req.user = user;
    next();
  } catch (error) {
    return res.status(200).json({ 
      success: false,
      message: "Error authenticating user. Please log in again."
    });
  }
};

export default verifyUser;
