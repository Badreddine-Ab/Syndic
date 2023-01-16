require('dotenv').config()

// const apiError = require('./Utils/apiError')
const globalError = require('./middlewares/errorMiddleware')
const cors = require('cors');

const router = require('./routes/auth')
const apartmentRouter = require('./routes/appartement');
const paymentRouter = require('./routes/payment');


const cookieParser = require("cookie-parser");


const express = require('express');
const apiError = require('./utils/apiError');
const app = express()

app.use(cookieParser());
app.use(cors({ origin:true, credentials:true }));
app.use(express.json())
const dbConnection = require("./Config/database")

app.use('/api/auth',router)
app.use('/api/apartment', apartmentRouter);
app.use('/api/payment', paymentRouter);



dbConnection();

app.all('*',(req,res,next) => {
    next(new apiError(`Can't find this route: ${req.originalUrl}`,400))
})

// Global error handling middleware
app.use(globalError);

const port = process.env.PORT || 8081
const server = app.listen(port, (err)=> {
    if(!err){
    console.log(`the port ${port} is running`)
    }else{
        console.log(err)
    }
})

// Handle errors outside express
process.on("unhandledRejection",(err)=> {
    console.error(`UnhandledRejection Errors : ${err.name} | ${err.message}`);
    server.close(()=> {
        console.error('Shutting down....')
        process.exit(1)
    })
    
})

module.exports = app
