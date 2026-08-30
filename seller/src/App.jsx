import Navbar from "./components/navbar/Navbar"

import './App.css'
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import ProductForm from "./components/productForm/ProductForm"
import Dashboard from "./pages/dashboard/Dashboard"

import {Outlet} from 'react-router-dom'
import Inventory from "./pages/inventory/Inventory"


function App() {


  return (
    <>
      <Navbar/>
      <Outlet/>
      {/* <Home/> */}
      {/* <ProductForm/> */}
      {/* <Dashboard/> */}
      {/* <Inventory/> */}
      <Footer/>
      {/* hello */}
    </>
  )
}

export default App
