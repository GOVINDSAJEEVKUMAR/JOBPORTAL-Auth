const User = require('../Models/UserSchema');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const {generateToken} = require ("../utils/AuthUtils")





const getAll = async(req,res)=>{
    try{
        const Logied = await User.find({})
    res.status(200).json({msg:"All Users 😉😉😉😉😉😉",Logied})
    }catch(error){
    res.status(500).json({msg:"Something Went wrong 😬😬"})
    }
}


const SignUp = async(req,res)=>{
    let exsitingUSer;
    const { name,email,password,phone }= req.body;
        exsitingUSer = await User.findOne({email:email});
        if(exsitingUSer){
        return res.status(400).json("User Already Exist 😶😶😶")
}
   const ciperText = bcrypt.hashSync(password,10) ;

   let result = await User.create({
    name:name,
    email:email,
    password:ciperText,
    phone:phone
})
 res.status(200).json({
    msg:"USER CREATED SUCCESSFULLY !!! 👍👍👍👍👍👍",
    sucess:true
   });
}

// const Login = async (req,res)=>{
//     try{
//         const {email,password} = req.body;
//         const user = await User.findOne({email:email});
//         if(!user){
//             throw new Error("User Not Found");
//         }
//         const isPasswordValid = bcrypt.compareSync(password,user.password);
//         if(!isPasswordValid){
//             throw new Error("Invalid Password");
//         }

//         const token = generateToken(user);

//         res.status(200).json({
//             msg:"LOGIN SUCCESSFULLY !!! 👍👍👍👍👍👍",
//             sucess:true,
//             token
//         })

//     }catch(error){
//         res.status(401).json({
//             message:"Invalid"
//         })
//     }
// }

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExisted = await User.findOne({ email: email });
    if (!userExisted) {
      return res.status(400).json({ msg: "Check credentials" });
    }

    const validPassword = bcrypt.compareSync(password, userExisted.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const userToken = jsonwebtoken.sign(
      {
        id: userExisted._id,
      },
      process.env.WEB_TOKEN_SECRET, // Use the secret key from the environment variable
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ msg: "Success", user: userToken });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const userVerification = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ msg: "Authorization header missing" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Invalid token" });
  }

  jsonwebtoken.verify(token, process.env.WEB_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    req.id = user.id;
    next();
  });
};

const getUser = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

  

const Logout = async(req,res)=>{
    res.clearCookie("token").status(200).json({
        msg:"LOGOUT SUCCESSFULLY !!! 👍👍👍👍👍👍",
        sucess:true
       });
}



module.exports = {
    SignUp,
    getAll,
    Login,
    userVerification,
    getUser,
    Logout
};
