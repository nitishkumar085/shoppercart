import React,{useState,useEffect} from "react"
import './itemDetails.css'
import {useParams} from 'react-router-dom'
import {useDispatch}  from 'react-redux'
import {addToCart} from '../../slices/productSlice.js'

const ItemDetails=()=>{
  const [productData,setProductData] = useState({})
  const [productIamge,setProductImage] = useState("")
  const [productQuantity,setProductQuantity] = useState(1)
  const queryData=useParams()
  
  const dispatch = useDispatch()
  useEffect(()=>{
  fetch(`https://dummyjson.com/products/${queryData.id}`)
  .then((res)=>res.json())
    .then(data=>{setProductData(data);setProductImage(data.thumbnail)})
  },[queryData.id])

  const getImage=(val)=>{
    setProductImage(val)
  }
  const addToCart1=()=>{
    console.log("add")
    if(productQuantity!==0)
    {
      dispatch(addToCart({...productData,quantity:productQuantity}))
  }
    }
    

  const getQuantity=(e)=>{
    setProductQuantity(e.target.value)
  }
  const increaseQuantity=(e)=>{
    setProductQuantity(val=>val+1)
  }

  const decreaseQuantity =(e)=>{
    if(productQuantity<1)
    {
      setProductQuantity(0)
    }
    else
    {
      setProductQuantity(val=>val-1)
    }
    
  }
  console.log(productData)
  // const filterdatta= data.filter()
  
return(
  <div>
  <div className="itemDetails_container">
    <div className="itemDetails_container-main">
      <div className="imageSection">
      
      <div className="itemsImages">
    {productData.images && productData.images.map((val,i)=><img key={i} src={val}  className="itemProductImages" alt="" onClick={()=>getImage(val)}/>)}
       
      </div>
      <div className="itemProductImage"><img src={productIamge} alt="" style={{width:"80%",height:"80%"}}/></div>

      </div>
      <div className="productDetailsAndReview">
          <h4 className="productBrand"style={{color:"gray"}}>{productData.brand}</h4>
        <h1 style={{textAlign:"left",fontSize:"50px"}}>{productData.title}</h1>
        <h4 style={{textAlign:"left",fontSize:"30px"}}>${productData?.discountPercentage? (<span>{Math.round(productData.price-((productData.discountPercentage/100)*productData.price))}&nbsp;&nbsp;&nbsp;<s style={{fontSize:"22px",color:"gray"}}>${productData.price}</s>&nbsp;&nbsp;<span style={{color:"green",fontSize:"22px"}}>{productData.discountPercentage}%  off</span></span>):productData.price}</h4>
        <span>
        <span style={{background:`${productData.rating>4? "green":productData.rating>2? "orange":"red"}`,color:"white",borderRadius:"10px",padding:"5px"}}>{productData.rating}&nbsp;&#9733;</span>
        &nbsp;&nbsp;&nbsp;<span style={{color:"gray",fontWeight:"bold"}}>{0}&nbsp;ratings and {productData?.reviews?.length}&nbsp;reviews</span>
        </span>
        <span className="addQuantityOption">
        <button className="addQuantityAndToTheCart" onClick={decreaseQuantity}>-</button>
          <input type="text" style={{width:'40px',height:"40px",textAlign:"center",borderStyle:"none",fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif",fontWeight:"bold"}} value={productQuantity===0? "":productQuantity} onChange={getQuantity}></input>
          <button style={{width:'30px',height:"40px",cursor:"pointer",background:"black",color:"white"}} onClick={increaseQuantity}>+</button>
          <button className="addToCartButton"  onClick={addToCart1}>Add to Cart</button>
        </span>
        
        <button style={{width:'100%',height:"50px",marginTop:"20px",cursor:"pointer",fontFamily:"Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Arial, sans-serif",background:"green",borderStyle:"none",fontSize:"15px",fontWeight:"bold",color:"white"}}>Buy now</button>

        <div>
          <h3>Disciption</h3>
          <p style={{marginTop:"10px",color:'gray'}}>{productData?.description}</p>
          </div>
            <div>
            <form className="commentForm">
              <textarea rows={5} cols={65} placeholder="enter the comments" />
              <button>Add Reviews</button>
            </form>
            </div>
          <div className="">
            
      {/* <h4>Reviews</h4>
      {
        productData && productData?.reviews?.map((value,i)=>{
          return (
            <div style={{width:"100%",height:"50px",border:"1px solid gray",padding:"5px"}}>
              <div>
                <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' alt='profile' style={{width:"15px",height:"15px",borderRadius:"50%"}}/>
                <span>{value.reviewerName}</span>
              </div>
              <p>{value.comment}</p>
              
            </div>
          )
        })
      } */}
    </div>
        
      </div>
    
    </div>
    
  </div>
  
  </div>
)
}

export default ItemDetails