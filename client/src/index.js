import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import {BrowserRouter } from 'react-router-dom'
import Authenticate from './utils/Authenticate';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Authenticate>
      <Provider store={store}> 

      <BrowserRouter>
  <App />
  </BrowserRouter>
</Provider>
      </Authenticate>
    </React.StrictMode>
    
  );
  