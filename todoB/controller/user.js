import User from '../model/User.js'
import passToken from '../model/passToken.js';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { imageUpload } from '../utils/imageUpload.js'
import fs from 'fs'
import {sendMail,randomPassGen} from '../utils/mail.js'
import jwt from 'jsonwebtoken';

export const userCreate = async (req, res, next) => {
    try {
      let name;
      if (req.files && req.files.image) {
        name = uuidv4() + req.files.image.name;
        const fileUploadCheck = await imageUpload(name, req.files.image);
        console.log(fileUploadCheck);
        if (!fileUploadCheck)
          return res
            .status(400)
            .json({ 
              success: false,
              message: "Failed to create user. Please try again!",
            });
        req.body.profile = name;
      }
  const salt = bcrypt.genSaltSync(10);
      const pass = bcrypt.hashSync(req.body.password, salt);
  
      await User({
        ...req.body,
        password: pass,
        isAdmin: false,
      }).save();
  
      res.status(200).json({ success: true, message: "Registration successful" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, message: "Registration failed" });
    }
  };

export const getUser=async(req,res,next)=>{
    try{
    const user=await User.findById(req.userId)
    res.status(200).json({success:true,data:user})
    }
    catch(err){
        console.log(err)
        res.status(400).json("Failed to find data")
    }
    
}



export const updateUser=async(req,res,next)=>{
    try{
        let name;
        console.log(req.files)
        if(req.files.image){
            name = uuidv4() + req.files.image.name;
            const fileUploadCheck = await imageUpload(name, req.files.image)
            console.log(fileUploadCheck)
            if(!fileUploadCheck)
            return res.status(400).json({success:false,message:"failed to update user.please try again!"})
            req.body.profile = name
        }
        
      if(req.body.password){
        const salt=bcrypt.genSaltSync(10);
        req.body.password=bcrypt.hashSync(req.body.password,salt);
      }
    const user=await User.findByIdAndUpdate(req.userId,{
       
        $set:{
            ...req.body,
            isAdmin:false,
            // userId:req.userId
        },
     
        
    },{new:false});
    res.status(200).json({data:user,success:true,message:"User updated successfully"})
    
    if(user.profile){
        await fs.unlinkSync(process.cwd()+'/images/'+user.profile)
    }
    }
    catch(err){
        console.log(err)
        res.status(400).json({success:false,message:"Failed to update user"})
    }
};

export const deleteUser=async(req,res,next)=>{
    try{
      
    const user=await User.findByIdAndDelete(req.userId);//change this for delete
    res.status(200).json({data:user,success:true,message:"User deleted successfully"})
    
    }
    catch(err){
        console.log(err)
        res.status(400).json({success:false,message:"Failed to delete user"})
    }
};



export const mailer = async (req,res,next)=>{
    try{

        const subject = "test subject"
        const message = "test message"
        await mail(req.body.mail,message,subject)

        res.status(200).json({success:true,message:"Mail send successfully"})
    }catch(err){
        console.log(err)
        res.status(400).json({success:false,message:"failed to send message"})
    }
}




export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.mail });
    if (!user) return req.status(400).sens("Mail does not exist");
    const pass = randomPassGen(6);
    const salt = bcrypt.genSaltSync(10);
    const pass2 = bcrypt.hashSync(pass, salt);
    const subject = "Forgot password";
    const message = `your password for email ${req.body.mail} has been changed to ${pass};`
    console.log(message)
    const mailStatus = await sendMail(req.body.mail, subject, message);
    if (!mailStatus) return res.status(400).send("please try again later");
    await User.findByIdAndUpdate(user._id, { password: pass2 });
    res
      .status(200)
      .json({
        success: true,
        message: "password successfully changed and send",
      });
  } catch (err) {
    console.log(err);
    res.status(400).send("failed to change password");
  }
};
// export const forgotPassword = async (req, res, next) => {
//   try {
//     const JWT_SECRET = "secret";
//     const subject = "reset password";
//     const secret = JWT_SECRET + User.password;

//     // const user=await User.findOne()

//     const user = await User.findOne({ email: req.body.mail });
//     const expiryTimestamp = Date.now() + 2 * 60 * 1000;

//     const token = jwt.sign(
//       { email: req.body.mail, expiry: expiryTimestamp },
//       secret
//     );

//     const link =`http://localhost:3000/resetPassword/${user._id}/${token}`;

//     await mail(req.body.mail, link, subject);

//     res
//       .status(200)
//       .json({ success: true, message: " Reset MailSend Successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ success: false, message: "Failed to send mail" });
//   }
// }


// export const resetPassword = async (req, res, next) => {
//   try {

//       const user = await User.findById(req.params.userId);
//       const salt = bcrypt.genSaltSync(10);
//       req.body.password = bcrypt.hashSync(req.body.password, salt);

//       user.password = req.body.password;
//       await user.save();


//       await Password({
//           token: req.params.token,
//           userId: req.params.userId
//       }).save()


//       res.status(200).json({ success: true, message: "password reset successfully" })
//   }
//   catch (err) {
//       console.log(err)
//       res.status(400).json({ success: false, message: "Failed to reset password" })
//   }
// }
// export const forgotPassword = async (req, res, next) => {
//   try {
//       const JWT_SECRET = "secret";
//       const subject = "reset password";
//       const secret = JWT_SECRET + User.password;
//       const user = await User.findOne({ email: req.body.mail })
//       console.log(user)

//       const token = jwt.sign({ email: req.body.mail }, secret, { expiresIn: "15m" });

//       const link = `http://localhost:3000/resetPassword/${user._id}/${token}`
//       console.log(user._id)

//       await mail(req.body.mail, link, subject);

//       res.status(200).json({ success: true, message: " Reset MailSend Successfully" })

//   }
//   catch (err) {
//       console.log(err)
//       res.status(400).json({ success: false, message: "Failed to send mail" })
//   }
// }



// export  const forgotPassword=async(req,res,next)=>{
//     try{
//         const JWT_SECRET="secret";
//         const subject="reset password";
//         const secret=JWT_SECRET+User.password;
    
//         // const user=await User.findOne()

//         const user=await User.findOne({email:req.body.mail})

//         const token=jwt.sign({email:req.body.mail},secret,{expiresIn:"15m"});


//         const link=`http://localhost:8800/resetPassword/${user._id}/${token}`
            
//         await mail(req.body.mail,link,subject);
                
//         res.status(200).json({success:true,message:" Reset MailSend Successfully"})

//     }
//     catch(err){
//         console.log(err)
//         res.status(400).json({success:false,message:"Failed to send mail"})
//     }
// }

// export const resetPassword=async(req,res,next)=>{
//     try{
        
//         const user = await User.findById(req.params.userId);
//             const salt=bcrypt.genSaltSync(10);
//             req.body.password =bcrypt.hashSync(req.body.password,salt);
          
//          user.password=req.body.password;
//          await user.save();


//            await Password({
//            token:req.params.token,
//            userId:req.params.userId
//         }).save()
     
             
//          res.status(200).json({success:true,message:"password reset successfully"})
//     }
//     catch(err){
//         console.log(err)
//           res.status(400).json({success:false,message:"Failed to reset password"})
//     }
// }




// export const forgetPassword = async (req, res, next) => {
//     try {
//       // 1. Validate email
//       const { email } = req.body;
//       if (!email || !validator.isEmail(email)) {
//         return res.status(400).json({ success: false, message: "Invalid email" });
//       }
  
//       // 2. Find user with provided email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
  
//       // 3. Generate a password reset token
//       const resetToken = new passToken({
//         userId: user._id, // Assuming `passToken` model has a `userId` field
//         token: uuidv4(), // Generate a unique token
//       });
//       await resetToken.save();
  
//       // 4. Construct email content
//       const subject = "Password Reset Request";
//       const resetUrl = `http://your-app-url/reset-password/${resetToken.token}`; // Replace with your actual reset URL
//       const message = `Click on the link below to reset your password:\n${resetUrl}`;
  
//       // 5. Send email
//       await mail(email, message, subject);
  
//       // 6. Send successful response
//       res.status(200).json({ success: true, message: "Password reset email sent" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Failed to send password reset email" });
//     }
//   };

// export const updateUser=async(req,res,next)=>{
//     try{
//       if(req.body.password){
//         const salt=bcrypt.genSaltSync(10);
//         req.body.password=bcrypt.hashSync(req.body.password,salt);
//       }
//     const user=await User.findByIdAndUpdate(req.params.key,{
       
//         $set:{
//             ...req.body,
//             isAdmin:false,
//             // userId:req.userId
//         },
     
        
//     },{new:true});
//     res.status(200).json({data:user,success:true,message:"User updated successfully"})
    
//     }
//     catch(err){
//         console.log(err)
//         res.status(400).json({success:false,message:"Failed to update user"})
//     }
// };




// // Update user details function
// export const updateUserDetails = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);

//     if (!user) {
//       res.status(404).json({ success: false, message: "User not found" });
//       return;
//     }

//     const updates = {};

//     // Update allowed fields
//     if (req.body.name) {
//       updates.name = req.body.name;
//     }
//     if (req.body.password) {
//       updates.password = await bcrypt.hash(req.body.password, 10);
//     }
//     if (req.body.mobile) {
//       updates.mobile = req.body.mobile;
//     }

//     if (Object.keys(updates).length > 0) {
//       await User.findByIdAndUpdate(req.userId, updates, { new: true });
//       res.status(200).json({ success: true, message: "User details updated", data: user });
//     } else {
//       res.status(200).json({ success: true, message: "No changes to update" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to update user details" });
//   }
// };