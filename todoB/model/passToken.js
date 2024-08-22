import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema(
    {
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'Public',
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);
export default mongoose.model('passToken',tokenSchema)