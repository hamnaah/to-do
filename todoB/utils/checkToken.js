//check login from cookies
//check token  exists from token collection
//find id from token
import Token from '../model/Token.js'
import Todo from '../model/Todo.js'
import User from '../model/User.js'


//to check whether user is loggined or not
export const checkToken = async(req,res,next)=>{
    try{
        //check login from cookies
        // const token = req.cookies.token
        const token = req.headers.authorization
        console.log(req.headers.authorization)
        if(!token) return res.status(400).json({success:false,message:"you are not logged in"})
        const tokenFound = await Token.findOne({token:token})
    if(!tokenFound) return res.status(400).json({success:false,message:"token is not valid"})

    //find id from token
    req.userId = tokenFound.userId
    next()
    }catch(err){
        console.log(err)

    }
}

//to check if the todo belongs to the logged in user

export const checkTodo = async (req,res,next)=>{

    await checkToken(req,res,async()=>{
        const todo=await Todo.findById(req.params.id)
        if(!todo)return res.status(404).json({success:false,message:"Todo not found"})

        if(req.userId.toString()!==todo.userId.toString())
        return res.status(400).json("you are not authorized")
    next()

    })
}

//this can be used to both admin and user
export const checkUserUpDel = async (req,res,next)=>{

    await checkToken(req,res,async()=>{
        //finding user or admin by id
        const user = await User.findById(req.userId)

        if(req.userId == req.params.key || user.isAdmin)
        next()
    else{
        return res.status(400).json({success:false,message:"You are not authorized"})
    }
    })
}