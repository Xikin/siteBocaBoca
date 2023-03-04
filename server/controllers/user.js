import bccrypt from "bcryptjs";
import jwt from "jsonwebtoken ";
import User from "../models/User";
import tryCatch from "./utils/tryCatch";

export const register =  tryCatch (async (req, res) => {

    const { name, email, password } = req.body;

    if (password.length < 6)
      return res
        .status(400)
        .json({
          success: false,
          message: "A senha deve conter mais de 6 caracteres",
        });
    const emailLowerCase = email.toLowerCase();
    const existedUser = await User.findOne({ email: emailLowerCase });
    if (existedUser)
      return res
        .status(400)
        .json({ success: false, message: "O usuário já existe!!" });
    const hashedPasword = await bccrypt.hash(password, 12);
    const user = await User.create({
      name,
      email: emailLowerCase,
      password: hashedPasword,
    });
    const { _id: id, photoURL } = user;
    const token = jwt.sign({ id, name, photoURL }, process.JTW_SECRET, {
      expiresIn: "1h",
    });
    res.status(201)({
      success: true,
      result: { id, name, email: user.email, photoURL, token },
    });
  
});



export const login = tryCatch(async(req,res)=>{

    const { email, password } = req.body;

  
    const emailLowerCase = email.toLowerCase();
    const existedUser = await User.findOne({ email: emailLowerCase });
    if (!existedUser)
      return res
        .status(404)
        .json({ success: false, message: "O usuário não existe!!" });
    const correctPasword = await bccrypt.compare(password, existedUser.password);
    if(!correctPasword) return res.status(400).json({success:false, message:'As credenciais fornecidas são inválidas.'})
   
    const { _id: id, name, photoURL } = existedUser;
    const token = jwt.sign({ id, name, photoURL }, process.JTW_SECRET, {
      expiresIn: "1h",
    });
    res.status(200)({
      success: true,
      result: { id, name, email: emailLowerCase, photoURL, token },
    });

})