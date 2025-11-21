import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from  'jsonwebtoken';
import Chat from '../models/Chat.js';


// generate jwt
const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
    
}

// api to register user
export const registerUser =async (req, res) => {
    const{name,email,password}=req.body;

    try{
        const userExists= await User.findOne({email})
    
       if(userExists){
        return res.json({success: false, message:"User already exists"})
       }

       const user= await User.create({name, email , password})
       const token = generateToken(user._id)
       res.json({success:true, token})
    } catch(error){
         return res.json({success: false, message: error.message})
    }
}

// api to log in
export const loginUser =async (req, res) => {
  const {email , password} = req.body;
  try{
      const user= await User.findOne({email})
      if(user){
        const isMatch = await bcrypt.compare(password, user.password )

        if(isMatch){
            const token = generateToken(user._id);
            return res.json({success: true, token})
        }
      }
  } catch (error){
      return res.json({success: false, message: error.message})
  }
    
  }

//    api to get user data
export const getUser = async (req,res)=> {
    try{
        const user=req.user;
        return res.json({success: true, user})
    } catch(error){
        return res.json({success: false, message:error.message})
    }
}
   
// API to get published images
// export const getPublishedImages = async (req,res) => {
//     try{
//         const publishedImages=await Chat.aggregate([
//             {$unwind:"$messages"},
//             {
//                 $match:{
//                     "messages.isImage":true,
//                     "messages.isPublished":true
//                 }
//             },
//             {
//                 $project:{
//                     _id:0,  
//                     imageUrl:"$messages.content",
//                     userName:"$userName"
                    
//             }
//     }
// ])
//         return res.json({success:true, images: publishedImageMessages.reverse()})
//     } catch(error){
//         return res.json({success:false, message:error.message})
//     }
// }

// API to get published images
export const getPublishedImages = async (req, res) => {
  try {
    // Saare chats jisme published images hain
    const chats = await Chat.find({
      "messages.isImage": true,
      "messages.isPublished": true,
    }).populate("userId", "name");  // user ka naam lane ke liye

    const images = [];

    chats.forEach((chat) => {
      chat.messages.forEach((msg) => {
        if (msg.isImage && msg.isPublished) {
          images.push({
            imageUrl: msg.content,                  // 👈 Community.jsx yahi use karega
            userName: chat.userId?.name || "Unknown",
            createdAt: msg.timestamp,
          });
        }
      });
    });

    // latest images pehle dikhane ke liye reverse
    return res.json({ success: true, images: images.reverse() });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
