import Navbar from "./components/navbar/Navbar"

import './App.css'
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import ProductForm from "./components/productForm/ProductForm"


function App() {


  return (
    <>
      <Navbar/>
      {/* <Home/> */}
      <ProductForm/>
      <Footer/>
    </>
  )
}

export default App
