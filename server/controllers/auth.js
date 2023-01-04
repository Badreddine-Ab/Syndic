const apiError = require('../utils/apiError')
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const Login =  async (req,res,next) => {
    const {email, password} = req.body
    
    if (!(email && password)) {
      return next(new apiError('Data not formatted properly',400));
    }

    const user = await User.findOne({email})

    if(!user){
        return next( new apiError('Invalid email',400))
    }
    const ValidPassword = await bcrypt.compare(password,user.password)
    if(!ValidPassword){
      return next( new apiError('Invalid password',400))
    }
   else if(ValidPassword && user && user.status == 'Pending'){
    return next( new apiError("Pending Account. Please Verify Your Email!",401))
   }else {
   try {
    await bcrypt.compare(password,user.password)

      const token = jwt.sign({ 
          id: user._id,
          email: user.email,
      }, 
      process.env.JWT_SECRET
      )
      // console.log('Got the token:', token)
      return res
      .cookie("access_token", token, {
        
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logged in successfully 😊 👌" })
      
    
   } catch (error) {
    console.log(error)
      return next (new apiError('problem in the login , please check your email and password and try again',500))
   }
  }
  }

  const LogOut =  (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  };

  module.exports = {
    Login,
    LogOut
  }