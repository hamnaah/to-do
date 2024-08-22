// index.js serves as the entry point for this Node.js application.
// It sets up the Express server, connects to MongoDB, defines middleware, and handles routes.
// It's responsible for starting the application and listening for incoming requests.

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import userR from './router/userR.js'
import authR from './router/authR.js'
import todoR from './router/todoR.js'

// Creates an instance of the Express application.
const app = express()
dotenv.config()


//fn to connect with mongodb database using Mongoose.
// Uses the connection string mongodb://127.0.0.1:27017/todo to connect to a local MongoDB database named "todo".
// Logs a message if the connection is successful or logs the error if it fails.
const connect = async ()=>{
    try{
    await mongoose.connect(process.env.MONGO)
   console.log("connected to mongodb")
    }
    catch(err){
        console.log(err)
    }
}

//middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }))    //Enables CORS(Cross-Origin Resource Sharing) for all routes in the application.
app.use(express.json())     //Parses incoming request bodies as JSON, making the parsed data available in the req.body object.
app.use(cookieParser())

app.use(express.static('images'))
app.use('/images',express.static('images'))

app.use(fileUpload({uriDecodeFileNames:true}))


app.use('/api/user',userR) 
app.use('/api/auth',authR)
app.use('/api/todo',todoR)

//route handlers - moved to router/userR.js
// app.post("/user/create",userCreate);
// app.get('/user/create',getUser);

//server port connections
// Server Start:
// app.listen(8800, ...): Starts the Express server on port 8800.
// Calls the connect() function to establish the MongoDB connection.
// Logs a message confirming that the backend is connected and listening for requests.

app.listen(8800, () =>{
    connect()
    console.log("connected to backend")
})