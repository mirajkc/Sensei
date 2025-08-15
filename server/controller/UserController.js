import axios from 'axios'

const GoogleSignIn  = async(req,res)=> {
  try {
    const {code} = req.body
    if(!code){
      return res.status(200).json({
        success : false,
        message : "Google signup error use Email sign up instead "
      })
    }


  } catch (error) {
    
  }
}