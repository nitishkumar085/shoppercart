const express = require('express')
const cors = require('cors')
const product = require('./routes/products')

const app = express()

// 1. Define your trusted production domains
const productionWhitelist = ['https://shoppercart-u4od.vercel.app', 'https://www.myapp.com'];

const corsOptions = {
  origin: (origin, callback) => {
    const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

    // In development, allow localhost domains dynamically
    if (isDevelopment) {
      if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
        // Echo back the exact origin to satisfy the credentials requirement
        return callback(null, true); 
      }
    }

    // In production, check against the whitelist
    if (productionWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS due to security restrictions.'));
    }
  },
  // CRITICAL: This allows the browser to send and receive cookies cross-origin
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/v1/products',product)



module.exports = app