 import { Router } from "express";
import { registrar, login } from "../controllers/user.js";

 const userRouter = Router()
  
 userRouter.post('/register', registrar)
 
 userRouter.post('/login', login)
 export default userRouter;