import React from 'react'
import {useSelector} from 'react-redux'
import './menu.css'

function Menu() {
  const data = useSelector((state)=>{return state.products.category})
  
   const list = data.map((val,ind)=>{return(
    // <div className='category'>
    //   <h6>{val}</h6>
    // </div>
    <p>{val}</p>
    )})
  
  return (
    <div id="menuOption">
      {list}
    </div>
  )
}

export default Menu