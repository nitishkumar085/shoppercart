import React,{useState} from 'react'
import './login.css'
import signup_logo from '../../assests/photos/signup_logo.png'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';


function Login() {
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const loginData=async(e)=>{
    console.log("helolo")
    try{
      e.preventDefault()
    if(formData.email && formData.password)
    {
      const res = await axios.post("https://authuser-8kuo.onrender.com/api/v1/user/signin",formData,{headers:{
         'Content-Type': 'application/json'
      }})
      console.log(res.data)
          const decoded = jwtDecode(res.data.token);
         const {name} =decoded
         localStorage.setItem("token",res.data.token)
        localStorage.setItem("name",name)
        navigate('/')

    }
    }
    catch(err)
    {
      console.log("error",err)
    }
  }
  console.log(formData)
  const getFormData =(e)=>{
    setFormData((val)=>{ return {...val,[e.target.name]:e.target.value}})
  }
  const navigate = useNavigate()

  const goTOSignup=()=>{
    navigate('/signup')
  }
  return (
    <div id="formConatiner">
      <div style={{width:"60%",display:"flex",height:"70%"}}>
         <div style={{width:"60%"}}>
      <img src={signup_logo} alt="logo" style={{width:"100%",height:"100%"}}/>
        </div>
            <div id="main">
                <div id="heading">
                    <h3>Login</h3>
                </div>

      {/* form code */}

                <form>
                    <div className=''>
                       
                        <div>
                            <input className='inputField' type="text" id="userName" placeholder='enter Email'  name="email" onChange={getFormData}/>
                        </div>
                        
                        <div>
                            <input  className='inputField' type="password" id="password" placeholder='enter password' name="password" onChange={getFormData}/>
                        </div>
                        <div style={{height:"20px"}} >
                            <p style={{float:"right",color:"red",fontSize:"12px"}}>forget password?</p>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <input type="submit" value="LOGIN" onClick={loginData}/>
                        </div>
                    </div>
                </form>
    {/* social media login option */}
                <div style={{marginTop:"30px"}}>
                    <p>or signUp Using</p>
                    <div></div>
                </div>

     {/* option for signup */}
                <div>
                    
                    <p>Not registered ? <span style={{color:"blue",cursor:"pointer"}} onClick={goTOSignup}>create an account</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login