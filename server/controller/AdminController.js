import jwt from 'jsonwebtoken'



export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password"
      });
    }

    const adminToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("adminToken", adminToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });


    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server login error: ${error.message}`
    });
  }
};
