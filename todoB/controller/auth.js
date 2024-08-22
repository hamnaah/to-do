import User from "../model/User.js";
import bcrypt from "bcrypt";
import Token from "../model/Token.js";
// import jwt from "jsonwebtoken";

// export const login = async (req, res, next) => {
//   try {
//     // Validate user input
//     const { name, password } = req.body;
//     if (!name || !password) {
//       return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }

//     // Find user by name
//     const user = await User.findOne({ name:name });
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid username or password' });
//     }

//     // Compare password hashes securely
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid username or password' });
//     }

//     // Check existing login (optional)
//     if (user.isLoggedIn) {
//       return res.status(400).json({ success: false, message: 'Already logged in' });
//     }

//     // Generate a secure token with expiration time
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Update user login status (optional)
//     user.isLoggedIn = true;
//     await user.save();

//     // Send the token with expiration time in the response
//     res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 }).json({
//       success: true,
//       message: 'You are logged in',
//       token,
//       expiresIn: 3600, // 1 hour in seconds
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

export const login = async (req, res, next) => {
  try {
      const checkName = await User.findOne({ name: req.body.name })
      if (!checkName)
          return res.status(400).json({ success: false, message: "Username not found" })

      const checkPass = bcrypt.compareSync(req.body.password, checkName.password)
      if (!checkPass)
          return res.status(400).json({ success: false, message: "Wrong username or password" })

      const checkLogin = await Token.findOne({ userId: checkName._id })
      if (checkLogin)
          return res.status(400).json({ success: false, message: "you are already logged in" })

      const token = bcrypt.genSaltSync(32)
      await Token({
          token: token,
          userId: checkName._id
      }).save()

      // Send the token back in the response
      res.cookie("token", token).status(200).json({ success: true, token: token, message: "you are logged in" })
  } catch (err) {
      console.log(err)
      res.status(200).json({ success: false, message: "Login failed" })
    }
}

// export const login = async (req, res, next) => {
//   try {
//     const checkName = await User.findOne({ name: req.body.name });
//     console.log(checkName);
//     if (!checkName)
//       return res
//         .status(400)
//         .json({ success: false, message: "Username not found" });
//     const checkPass = bcrypt.compareSync(req.body.password, checkName.password);
//     if (!checkPass)
//       return res
//         .status(400)
//         .json({ success: false, message: "Incorrect username or password" });

//         const checkLogin = await Token.findOne({userId:checkName._id})
//         if(checkLogin) return res.status(400).json({success:false,message:"you are already logged in"})

// const token = await bcrypt.genSaltSync(32)
//         await Token({
//             token:token,
//             userId:checkName._id
//         }).save()

//         res.cookie("token",token).status(200).json({success:true,message:"You are logged in"})


//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ success: false, message: "Login Failed" });
//   }
// };

export const logout = async (req,res,next)=>{
  try{
    //retrieves the authentication token from the users cookies
    const token = req.headers.authorization
    if(!token) return res.status(400).json({success:false,message:"You are not logged in"})
    // Invalidating Token in Database
    await Token.findOneAndDelete({token:token})
    //Removes the authentication token cookie from the user's browser using
    res.clearCookie("token").status(200).json({success:true,message:"You are logged out"})
  }catch(err){
    res.status(400).json({success:false,message:"Failed to logout!"})
  }
}