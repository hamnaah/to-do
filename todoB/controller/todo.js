import Todo from "../model/Todo.js";
import User from "../model/User.js";


export const createTodo = async (req, res, next) => {
  try {
    
    const todo = await Todo({
      ...req.body,
      userId: req.userId,
      status: req.body.status == "Completed" ? true : false,
    }).save();
 
    await User.findByIdAndUpdate(req.userId, {
      $push: {
        todoIds: todo._id,
      },
    });
    res.status(200).json({ success: true, message: "Successfully added todo" });
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, message: "Failed to add todo" });
  }
};

export const getTodo = async (req, res, next) => {
  try {
    //   const todoList=await Todo.find  ({userId:req.userId})
    const todoList = await User.findById(req.userId).populate("todoIds");

    const tempList = todoList.todoIds.map((data) => {
      return {
        _id: data._id,
        title: data.title,
        description: data.description,
        status: data.status, // Include status
      };
    });
    res.status(200).json({
      success: true,
      message: "successfully retrieved.",
      data: tempList,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to retrieve to list" });
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
    res.status(200).json({ success: true, message: "successfully updated" });

    // const todo=await Todo.findById(req.params.id)
    // if(!todo)return res.status(404).json({success:false,message:"Todo not found"})

    // if(req.userId.toString()!==todo.userId.toString())
    // return res.status(400).json("you are not authorized") //checking logined user is same as updating user

    // await todo.updateOne({$set:{...req.body}})
    // res.status(200).json({success:true,message:"Successfully updated todo"})
  } catch (err) {
    res.status(400).json({ successs: false, message: "Failed to update todo" });
  }
};

export const getTodoById = async (req,res,next)=>{
  try{
    const data = await Todo.findById(req.params.id)
    res.status(200).json({success:true, message:"successfully retrieved",data:data})
  }catch(err){
    console.log(err)
      res.statu(400).json({success:false,message:"failed to retrieve todo"})
    }
  }



export const deleteTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "successfully updated" });
    // const todo=await Todo.findById(req.params.id)
    // if(!todo)return res.status(404).json({success:false,message:"Todo not found"})

    // if(req.userId.toString()!==todo.userId.toString())
    // return res.status(400).json("you are not authorized") //checking logined user is same as updating user

    // await todo.deleteOne()
    // res.status(200).json({success:true,message:"Successfully deleted todo"})
  } catch (err) {
    res.status(400).json({ successs: false, message: "Failed to delete todo" });
  }
};

// import Todo from "../model/Todo.js";
// import User from "../model/User.js";

// export const createTodo = async (req, res, next) => {
//   try {
//     const todo = await Todo({
//       ...req.body,
//       userId: req.userId,
//     }).save();
//     await User.findByIdAndUpdate(req.userId, {
//       $push: {
//         todoIds:todo._id,
//       },
//     });
//     res.status(200).json({ success: true, message: "successfully added todo" });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ success: false, message: "failed to do add todo" });
//   }
// };

// export const getTodo = async(req,res,next)=>{
//     try{
//     // const todoList = await Todo.find({userId:req.userId})
//     const todoList = await User.findById(req.userId).populate('todoIds')
//     res.status(200).json({success:true, message:"successfully retrieved todolist",data:todoList})
//     }catch(err){
//         res.status(400).json({success:false,message:"failed to retrieve todolist"})
//     }
// }

// //update and delete todos

// export const updateTodo = async (req,res,next) => {
//     try{

//         await Todo.findByIdAndUpdate(req.params.id,{$set:{...req.body}})
//         res.status(200).json({success:true,message:"successfully updated todo"})
//     }catch(err){
//         // console.log(err)
//         res.status(400).json({success:false,message:"failed to update todo"})
//     }
// }

// export const updateUserTodo = async(req,res,next) => {
//     try{
//         const todoList = await User.findById(req.userId).populate('todoIds')
//         const todoIds = todoList.todoIds
//         console.log(todoIds)
//         for(let i=0;i<todoIds.length;i++){
//             await Todo.findByIdAndUpdate(todoIds[i]._id,{$set:{...req.body}})
//             console.log(todoIds[i]._id)

//         }

//         res.status(200).json({success:true,message:"successfully updated todo"})
//     }catch(err){
//         // console.log(err)
//         res.status(400).json({success:false,message:"failed to update todo"})
//     }
// }

// export const deleteTodo=async(req,res,next)=>{
//     try{
//         // const todo=await Todo.findById(req.params.id)
//         // if(!todo)return res.status(404).json({success:false,message:"Todo not found"})

//         // if(req.userId.toString()!==todo.userId.toString())
//         // return res.status(400).json("you are not authorized") //checking logined user is same as updating user

//         await Todo.findByIdAndDelete(req.params.id)
//         res.status(200).json({success:true,message:"Successfully deleted todo"})
// }
// catch(err){
//       res.status(400).json({successs:false,message:"Failed to delete todo"})
// }
// }
