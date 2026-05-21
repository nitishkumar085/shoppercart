import React, { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './dashboard.css'

import { useDispatch,useSelector } from 'react-redux'
import {addPoductData,addCategory} from '../../slices/productSlice.js'

import axios from 'axios'

import Card from '../../components/card/Card'
import Banner from '../../components/Banner/Banner'
import Menu from '../../components/menu/Menu'

import tshirt from '../../assests/photos/tshirt.png'
import samplelectronics from '../../assests/photos/samplelectronics.png'
import girlJeans from '../../assests/photos/girlJeans.png'
import Footer from '../../components/footer/Footer.jsx';



function Dashboard() {
    const navigate = useNavigate()
        const dispatch = useDispatch()
        const data = useSelector(state=>state.products)
        console.log(data)

        const [womensTrending,setWomensTrendindg]  = useState([])
        const [mensTrending,setMensTrendindg]  = useState([])
  
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/v1/products/getProduct")
        .then((res)=>{ dispatch(addPoductData(res.data.products))
                      let category=[]
                      for(let val of res.data.products)
                        {
                            if(!category.includes(val.category))
                               {
                                  category.push(val.category)
                               }

                        }
                      dispatch(addCategory(category))
                     }
              
             )
        .catch((err)=>console.error(err))
    },[dispatch])


    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/v1/products/tendingProducts/women")
        .then((res)=>{setWomensTrendindg(res.data.data)})
        .catch((err)=>console.error(err))
    },[]) 
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/v1/products/tendingProducts/mens")
        .then((res)=>{setMensTrendindg(res.data.data)})
        .catch((err)=>console.error(err))
    },[]) 

    const listOfProducts = (data)=>{
        const category = data.category.map((value, i)=>{
            return(
                <div className="products" key={i}>
                <h3>{value}</h3>
                <div className='list'>
                {
                   
                    data.list.filter((val)=>{return val.category === value})
                    .map((val)=>{return(<Card key={val.id}val={val}/>)})
                }
                </div>
                
            </div>
            )
        })
        return category
    }
    

    console.log(data.category)
    const goToCategory = (e)=>{
        console.log('category');
        navigate('/category')
    }
  return (
    <div className='mainConatiner'>
        
        <Banner/>
        {/* <section >
        <Menu/>
        </section> */}
        <section className='category_section'>
            <h2><center>Category</center></h2>
            <div className='category_list'>
            <div className='category_card' id='mens_clothing' onClick={goToCategory}>
                <div className='inner_category card_style'>Men's</div>
            </div>
            <div className='category_card'id='women_clothing' onClick={goToCategory}>
            <div className='inner_category' >Women's</div>
            </div>
            <div className='category_card' id='electonics' onClick={goToCategory}>
            <div className='inner_category' >Electronics</div>
            </div>
            </div>
            
        </section>
        <section>
        <div className="trendingpProducts">
            <h3>Trending Products</h3>
            <div className='trendingpProductsContainer'>
           {
                 womensTrending.map((val)=>{return(<Card key={val.id}val={val}/>)})
           }
           {
                mensTrending.map((val)=>{return(<Card key={val.id}val={val}/>)})
           }    
           </div>
           
            
                
           
        </div>
        
        </section>
        {/* {
            listOfProducts(data)
        } */}
        <section className='adsection'>
            <div className='adsection_container'>
                <div className='adsection_leftsection'>



                    <div className='adsection_leftsection_ad1'>
                        <div>
                        <h4>Up To 40% Off  On Top Brands Jeans</h4>
                        <h3>SHOP NOW</h3>
                        </div>
                        
                        <img className='jeans'src={girlJeans} alt={"girl jeans"} loading='lazy'/>
                    </div>
                    <div className='adsection_leftsection_ad2'>
                    <img className='tshirtad'src={tshirt} alt={"thsirt"} loading='lazy'/>
                    <div>
                        
                        <h4>Up To 25% Off  On Top Brands</h4>
                        <h3>SHOP NOW</h3>
                        </div>
                        
                        
                    </div>
                </div>
                <div className='adsection_rightsection'>
                <div>
                        <h2><center>BIG SALE</center></h2>
                        <h4>Up To 70% Off  On All Electronics Item</h4>
                        <h3><center>SHOP NOW</center></h3>
                        </div>
                        
                        <img className='electronics'src={samplelectronics} alt={"thsirt"} loading='lazy'/>
                </div>
            </div>
        </section>
        <section>
          
            
        </section>
        
    </div>
  )
}

export default Dashboard