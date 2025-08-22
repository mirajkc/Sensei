import jwt from 'jsonwebtoken';

const verifyAdmin = (req, res, next) => {
  try {
   
    const token = req.cookies?.adminToken;

    if (!token) {
      return res.status(200).json({
        success: false,
        message: "Token not found"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `User not authenticated: ${error.message}`
    });
  }
};

export default verifyAdmin;
