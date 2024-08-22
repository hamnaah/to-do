import mongoose from 'mongoose';

//schema is used for creating a model with all the fields. 
 const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
    },
    mobile:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    todoIds:[
        {type:mongoose.Schema.ObjectId,ref:'Todo'}]
    
},
 {timestamps:true}
 );

 //model is created to do the CRUD operations
 const userModel=mongoose.model("public",userSchema) 

 export default userModel