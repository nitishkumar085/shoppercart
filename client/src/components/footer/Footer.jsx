import React from 'react';
import './footersection.css';


function Footer (){
    return(
        <div className='footer_conatiner_main' style={{width:"100%",height:"70vh",display:"flex",justifyContent:"space-around",padding:"50px 10px",flexWrap:"wrap", backgroundColor:" rgb(185, 183, 187)"}}>
            <div style={{width:"30%",height:"100%"}}>
                <h1 style={{fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif",fontSize:"70px"}}>SHOPPER CART</h1>
                <p style={{color:"rgb(73, 73, 73)",marginTop:"10px",fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif"}}>Collections For Men's, women's with wide range of varities. Shop in electonics category to find best product of different brands</p>
            </div>
            <div style={{width:"30%",height:"100%",}}>
                <h3 style={{letterSpacing:"2px",fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif",fontSize:"25px",fontWeight:"800px"}}>CUSTOMER SERVICES</h3>
                <div style={{display:"flex",flexDirection:"column",gap:"15px",fontSize:"30px",marginTop:"20px",fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif",color:"rgb(73, 73, 73)"}}>
                    <h6>Contact Us </h6>
                    <h6>Customer Service</h6>
                    <h6>Find Store</h6>
                    <h6>Shipping & Returns</h6>

                </div>
            </div>
            <div style={{width:"30%",height:"100%",}}>
            <h3 style={{fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif",fontSize:"25px"}}>SIGNUP FOR EMAILS</h3>
            <p style={{color:"rgb(73, 73, 73)",marginTop:"15px",fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif"}}>Subscribe to our website and get notified everytime. </p>
            <form style={{marginTop:"20px",height:"60px"}}>
                <input type='text' placeholder='your e-mail address' style={{height:"40px",width:"300px",paddingLeft:"30px",fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif",borderStyle:"none"}}/>
                <button style={{height:"40px",fontSize:"10px",width:"75px",fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif",color:"white",background:"black",borderStyle:"none"}}>SUBSCRIBE</button>
            </form>
            <div>
            <i className="fa fa-facebook-f" style={{fontSize:"24px",marginLeft:"8px"}}></i>
            <i className="fa fa-instagram" style={{fontSize:"24px",marginLeft:"8px"}}></i>
            <i className="fa fa-twitter" style={{fontSize:"24px",marginLeft:"8px"}}></i>
            </div>
            <div>
           
            </div>
            </div>
        </div>
        )
}

export default Footer