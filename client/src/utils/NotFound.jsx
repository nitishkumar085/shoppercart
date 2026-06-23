import React, { useState } from 'react'

function NotFound({style}) {
    
    const {height,width} = style
  return (
    < div style={{height:height,width:width,color:"gray"}}>404 not found</div>
  )
}

export default NotFound