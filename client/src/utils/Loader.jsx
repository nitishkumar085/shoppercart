import React, { useState } from 'react'

function Loader({style}) {
    
    const {height,width} = style
  return (
    < div style={{height:height,width:width,color:"gray"}}></div>
  )
}

export default Loader