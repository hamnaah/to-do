import mongoose from "mongoose"

//model 
const userSchema = mongoose.Schema(
    {
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'Public',
        required:true,
    },
    description:{
    type:String,
    required: true
    },
    title:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false,     
    }
    },
    {timestamps:true}
    )

const userModel = mongoose.model("Todo",userSchema)
export default userModel //importrd as User in index.js