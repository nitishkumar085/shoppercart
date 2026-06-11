const globalErrorHadler = (err, req,res,next)=>{

    err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Send the final error response to the client
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // Toggle stack trace depending on environment for security
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
})
}

module.exports = globalErrorHadler
