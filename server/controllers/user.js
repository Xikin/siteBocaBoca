import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';
import Place from '../models/Place.js';

export const register = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: 'A senha deve conter characteres ou mais',
    });
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res 
      .status(400)
      .json({ success: false, message: 'O usuário já existe!' });
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });
  const { _id: id, photoURL, role, active } = user;
  const token = jwt.sign({ id, name, photoURL , role}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(201).json({
    success: true,
    result: { id, name, email: user.email, photoURL, token, role, active},
  });
});

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser)
    return res
      .status(404)
      .json({ success: false, message: 'Usuário não existe!' });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword)
    return res
      .status(400)
      .json({ success: false, message: 'Credenciais inválidas' });

  const { _id: id, name, photoURL, role, active } = existedUser;

  
  if(!active) return res.status(400).json({success:false, message:'Essa Conta Foi Suspensa! Tente Contactar o Admin'})
  const token = jwt.sign({ id, name, photoURL,role, active }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, photoURL, token, role, active },
  });
});

// O usuario pode mudar o nome e a foto do perfil.
export const updateProfile = tryCatch(async (req, res) => {
  
  //Verifica se Há foto e nome ou somente o nome do usuario no perfil e manda a atualização baseado no que há de fato no objeto.
  const fields = req.body?.photoURL ? {name:req.body.name, photoURL:req.body.photoURL} : {name:req.body.name}

  const updatedUser = await User.findByIdAndUpdate(req.user.id, fields, {
    new: true,
  });
  const { _id: id, name, photoURL, role } = updatedUser;

  await Place.updateMany({ uid: id }, { uName: name, uPhoto: photoURL });

  const token = jwt.sign({ id, name, photoURL, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({ success: true, result: { name, photoURL, token } });
});

export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
})


//O parâmetro Acess verifica se o usuário está ativo ou não.
  export const updateStatus = tryCatch(async (req, res) => {
    const { role, active } = req.body;
    await User.findByIdAndUpdate(req.params.userId, { role, active });
    res.status(200).json({ success: true, result: { _id: req.params.userId } });
  });



  export const changePassword = tryCatch(async(userId, newPassword) =>{
    // Find the user in the database
    const user = await User.findById(userId);
  
    // If the user is not found, throw an error
    if (!user) {
      throw new Error('User not found');
    }
  
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
  
    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();
  
    return user;
  });