
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import CheckOut from './pages/checkout/CheckOut';
import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp'
import NavBar from './components/navbar/NavBar';
import ItemDetails from './pages/itemDetails/ItemDetails';

import './shop.css';
import Category from './pages/category/Category';
import Footer from './components/footer/Footer';
import ScrollToTop from './utils/ScrollTop';
import NotFound from './utils/NotFound';

function App() {

  return (
    <div>
      <NavBar/>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/signup' element={<SignUp />} />
         <Route path='/login' element={<Login />} />
         <Route path='/category' element={<Category/>}/>
         <Route path='/productDetails/:category/:id/:title' element={<ItemDetails />} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>  
    </div>
  );
}

export default App;

