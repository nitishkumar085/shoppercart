import React,{useState} from "react";
import './signup.css'
import signup_logo from '../../assests/photos/signup_logo.png'
import {useNavigate} from 'react-router-dom'
import axios from "axios";

function SignUp() {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })
  const [isPolicyChecked,setIsPolicyChecked] = useState(false)
  const navigate = useNavigate()

    const signupData=async(e)=>{
      console.log("signup")
      let obj = {...formData}
      
      try{
      
      if(formData.email && formData.password && isPolicyChecked)
      {
        const res = await axios.post("https://authuser-8kuo.onrender.com/api/v1/user/signup",obj,{headers:{
           'Content-Type': 'application/json'
        },})
        console.log(res.data)
        
        if(res.data.status==="success")
        {
            navigate('/login')
        }

      }
      }
      catch(err)
      {
        console.log("error",err)
      }
    }
  const goToLogin=  ()=>{
     navigate('/login')
    
   
  }
  
  const getFormData =(e)=>{
    setFormData((val)=>{ return {...val,[e.target.name]:e.target.value}})
  }

  const checkPolicy =(e)=>{
      setIsPolicyChecked(e.target.checked)
  }
 
  return (
    <div className="signup_container">
      <div style={{width:"60%",display:"flex",height:"70%"}}>
      <div style={{width:"60%"}}>
      <img src={signup_logo} alt="logo" style={{width:"100%",height:"100%"}}/>
        </div>
      <div className="main">
        <div>
            <h3>SIGNUP</h3>
        </div>
        <form style={{marginTop:"10px",width:"80%",height:"60%"}}>
          <div>
            <div>
              <input className="inputField" type="text" id="name" name="name" placeholder="Enter your Name" onChange={getFormData}/>
            </div>
          </div>
          <div>
          
            <div>
              <input className="inputField" type="email" id="email" name="email"placeholder="Enter your Email" onChange={getFormData}/>
            </div>
          </div>

          <div>
           
            <div>
              <input className="inputField" type="password" id="password" name="password" placeholder="Enter Password" onChange={getFormData}/>
            </div>
          </div>
           <div style={{paddingTop:"10px"}}>
              <input  type="checkbox" style={{fontSize:"1vw"}} onChange={checkPolicy}/> I accept all the terms and conditions
            </div>
          

          <div style={{textAlign:"center",paddingTop:"20px"}}>
            <input type="button" value="signup" onClick={signupData}/>
          </div>
        </form>
        <div style={{marginTop:"50px"}}>
          <p>Already have an account?<span style={{color:"blue",cursor:"pointer"}} onClick={goToLogin}>Login now</span></p>
        </div>
      </div>
        </div>
    </div>
  
  )
}

export default SignUp
