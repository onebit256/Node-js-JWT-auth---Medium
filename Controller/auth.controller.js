const User = require('../Models/user.model')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

async function signup(req,res,next) {

  const salt = await bycrypt.genSalt(10);
  hashpassword = await bycrypt.hash(req.body.password, salt)

  const emailExist = await User.findOne({email: req.body.email})
  if(emailExist){
     res.status(400).json({"error":'Email already Exist'}) 
  }

  const user =  new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword
  })
  try{
    const userSignup = await user.save()
    const payload = {
      user: {
        id: userSignup.id
      }
    };
    jwt.sign(payload,"anystring",{expiresIn: 10000},function(err, token)
    {
      if(err){
        res.send(err)
      }
      res.status(200).json({
        token,
        userSignup
      })
    })
  } 
  catch(err){
    res.status(400).json({'error':err})
  }
}

module.exports = {
  signup,
}