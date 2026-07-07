const mongoose = require('mongoose')
const users = require('../../models/userRegistration')


 const signup = async (req,res,next)=>{
   
try {
         const { name, email, password } = req.body || {};

        if (!name || !email || !password) {

            return res.status(400).json({ message: "entert detials" });
        } 
        
        
            // we await here beacuse its takes time to find user in database
            if(!await users.findOne({email}))
            {
                const userdata = await users.create(req.body)
                return res.status(200).json({ message: "succes" ,data:userdata});
            }
            else{
                     return res.status(400).json({ message: "email laready register" });
            }
           
        

    } catch (error) {
      next(error)
    }
   


}

 const login = async (req,res,next)=>{
   
try {
         const { email, password } = req.body || {};

        if ( !email || !password) {

            return res.status(400).json({ message: "enter details" });
        } 
        
        
            // we await here beacuse its takes time to find user in database
            if(await users.findOne({email}))
            {
                const userdata = await users.create(req.body)
                const token = await jwt
                return res.status(200).json({ message: "succes" ,data:userdata});
            }
            else{
                     return res.status(400).json({ message: "email not register" });
            }
           
        

    } catch (error) {
      next(error)
    }
   


}

module.exports = {signup,login}


