const mongoose = require('mongoose')
const sellers = require('../../models/sellerRegistration');


 const sellerSignup = async (req,res,next)=>{
   
try {
         const { name, email, password } = req.body || {};

        if (!name || !email || !password) {

            return res.status(400).json({ message: "entert detials" });
        } 
        
        
            // we await here beacuse its takes time to find user in database
            if(!await sellers.findOne({email}))
            {
                const userdata = await sellers.create(req.body)
                return res.status(200).json({ message: "succes" ,data:userdata});
            }
            else{
                     return res.status(400).json({ message: "email laready register" });
            }
           
        

    } catch (error) {
      next(error)
    }
   


}

const sellerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const seller = await sellers.findOne({ email });

    if (!seller) {
      return res.status(400).json({
        success: false,
        message: "Email not registered",
      });
    }

    const isMatch = await seller.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = seller.getJWTToken();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {sellerSignup,sellerLogin}


