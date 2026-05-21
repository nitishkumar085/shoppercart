import React, { useEffect, useState } from 'react'
import CartCard from '../../components/cartCard/CartCard'
import './checkout.css'
import {useSelector} from 'react-redux'


function CheckOut() {

    const [amount,setAmount] = useState(0)
    
    // const [isLogin,setIsLogin] = useState(true)
    const data = Object.entries( useSelector(state=>state.products.cart))
  console.log(data)
    const cartList = data.map((val)=>{return(<CartCard key={val[0]}val={val}/>)})
    console.log(data)
    useEffect(()=>{
        if(data.length !== 0)
        {
            const data12 =data.map((val)=> { return val[1].price * val[1].quantity})
        const subtotal = data12.reduce((tot,acc)=>{return tot+=acc})  
        setAmount(subtotal);
        }
        else{
            setAmount(0);
        }
        
    },[data])

    const checkOutHandler=()=>{
      
    }
  
  return (
    <div id="checkout">
        <div className='checkcontainer'>
            <div className='title1'>
            <h3>MY CART</h3>
            </div>
           
            <div className='block'>
                <div className='leftside'>
                {cartList.length===0? "Add Items to the Cart":cartList}
                </div>
                <div className='rightside'>
                    <div><h3>TOTAL</h3></div>
                    <div className='cartCalculation'>
                        <div style={{display:'flex',justifyContent:"space-between"}}><span>Sub-total </span>    <span>{Math.ceil(amount)}$</span>  </div>
                        <h3>discount          </h3>
                        <h3>Delivery          </h3>
                       
                        <hr/>
                        <div style={{display:'flex',justifyContent:"space-between"}}><span>Total </span>    <span>{Math.ceil(amount)}$</span>  </div>
                    </div>
                    <div>
                        <button type='button' onClick={checkOutHandler}>checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckOut