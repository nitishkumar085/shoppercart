import React, { useEffect, useState,useRef } from 'react'
import './Banner.css'
import offersBanner1 from '../../assests/Banner/offersBanner1.jpg'
import offersBanner2 from '../../assests/Banner/offersBanner2.jpg'
import offersBanner3 from '../../assests/Banner/offersBanner3.jpg'
import offersBanner4 from '../../assests/Banner/offersBanner4.jpg'
import offersBanner5 from '../../assests/Banner/offersBanner5.jpg'

function Banner() {

  const [promoOffer,setPromoOffer] = useState(offersBanner1)
  const [offerList,setOfferList] = useState([offersBanner2,offersBanner3,offersBanner4,offersBanner5])

  const [I,setI] =useState(0) // let offerList = useRef()
  // let i = useRef(0)

  useEffect(()=>{
    // let OfferList = [offersBanner1,offersBanner2,offersBanner3,offersBanner4,offersBanner5]
   let offern= setTimeout(()=>{
      // console.log(offerList[I])
      setPromoOffer(()=>offerList[I])
      if(I<offerList.length-1)
      {
        setI((j)=>j+1)
      }
      else
      {
        setI(0)
      }
      
      // 
    },3000)

    return ()=>clearTimeout(offern)
  },[promoOffer,offerList,I])
  //  console.log(offerList[i.current])
  // console.log(I)
  return (
    <div id='banner'>
    <img src={promoOffer} alt='banner' loading='lazy' className='imagebanner'/>
   </div>

  )
}


export default Banner