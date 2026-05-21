// here we create slice

import { createSlice } from '@reduxjs/toolkit'

const products = {
  list: [],
  cart:{},
  category:[]
}

export const productSlice = createSlice({
  name: 'products',
  initialState: products,
  reducers: {
    addPoductData: (state,action) => {
      state.list = action.payload
      
    },
    addCategory:(state,action)=>{
      state.category=action.payload
    },
    
    addToCart:(state,action)=>{
      const{id,...data}=action.payload
      state.cart[id] = data
    },
    adjustQuantity:(state,action)=>{
      const{id,method}=action.payload
      if(method === "add")
      state.cart[id].quantity +=1 ;
      else if(method==="sub")
        if(state.cart[id].quantity>1)
      state.cart[id].quantity -=1 ;
    },
    deleteItem:(state,action)=>{
      const {id} =action.payload
      delete state.cart[id]
    }
   
  },
})


export const { addPoductData,addToCart,adjustQuantity,deleteItem,addCategory } =  productSlice.actions

export default productSlice.reducer