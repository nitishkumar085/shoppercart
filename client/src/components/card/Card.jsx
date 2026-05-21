import React,{useState} from 'react'
import './Card.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/productSlice';
import {useNavigate} from 'react-router-dom'

function Card({val}) {
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const{category,id,title} = val

  const addItem = (data)=>{
    console.log(val)
      dispatch(addToCart(data))
  }
const goToProductDetails=(category,id,title)=>{
  navigate(`/productDetails/${category}/${id}/${title}`)
  
}
  return (
    <div className="cardConatiner" onClick={()=>goToProductDetails(category
,id,title)}>
        <div className="productImage">
          {<img src={val.thumbnail}alt=""/>}
        </div>
        <div className="productInfo">
            <p className='text'>{val.title}</p>
            <p  className='text'>Price: &nbsp;&nbsp;{val.price}$</p>
            <p className='text'>Rating:&nbsp;&nbsp;<span>{val.rating}</span>/5</p>

        </div>
        <div className="addOptions">
        <button onClick={(e)=>{e.stopPropagation();addItem({...val,quantity:1})}}>add to cart</button>
        <button> buynow</button>
        </div>
    </div>
  )
}

export default Card