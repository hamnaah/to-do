import mongoose from "mongoose"

//model 
const tokenSchema = mongoose.Schema(
    {
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'Public',
        required:true,
        unique:false,
    },
    token:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);

export default mongoose.model('token',tokenSchema)
    