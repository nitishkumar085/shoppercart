import React from 'react'
import './cartCard.css'
import {useDispatch} from 'react-redux'
import { adjustQuantity,deleteItem } from '../../slices/productSlice'
import { useNavigate } from 'react-router-dom'

function CartCard({val}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const addQuantity = (e)=>{
        e.stopPropagation();
        dispatch(adjustQuantity({id:val[0],method:"add"}))
    }

    const reduceQuantity = (e)=>{
        e.stopPropagation();
        dispatch(adjustQuantity({id:val[0],method:"sub"}))
    }

    const deleteItem1 =(e)=>{
        e.stopPropagation();
        dispatch(deleteItem({id:val[0]}))
    }
    const goToDetailsPage=()=>{
        console.log(val[1])
        navigate(`/productDetails/${val[1]?.category}/${val[0]}/${val[1]?.title}`)
  
    }
  return (
    <div className='card1' onClick={goToDetailsPage}>
        <div className='img1'><img src={val[1].thumbnail} alt=""  /></div>
        <div className='details1'>
        <div className='title3'>{val[1].title}</div>
        <div className='discription3'>{val[1].description}</div>
        <div className='details2'>
        <div className='price3'>Price:&nbsp;&nbsp;&nbsp;{val[1].price}$</div>
        <div className='rating1'>Rating:&nbsp;&nbsp;&nbsp;{val[1].rating}</div>
        <div className='quantity1'>Quantity:&nbsp;&nbsp;&nbsp;<button onClick={addQuantity}>+</button>&nbsp;&nbsp;<span style={{fontSize:"10px",}}>{val[1].quantity}</span>&nbsp;&nbsp;<button onClick={reduceQuantity}>-</button></div>
        </div>
        </div>
        <button className='deleteItemFromcart' onClick={deleteItem1}>x&nbsp;&nbsp;Remove</button>
    </div>
  )
}

export default CartCard