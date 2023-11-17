import { Router } from 'express';
import { getUsers, login, register, updateProfile, updateStatus , changePassword} from '../controllers/user.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
import userPermissions from '../middleware/permissions/user/userPermissions.js';

const userRouter = Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/changePassword',changePassword)
userRouter.patch('/updateProfile', auth, updateProfile);
userRouter.get('/', auth, checkAccess(userPermissions.listUsers),getUsers);
//Passando na rota Update Status a autorização para ativar/desativar o usuario Note:(Somente o ADMIN tem esta permissão).
userRouter.patch('/updateStatus/:userId', auth, checkAccess(userPermissions.updateStatus),updateStatus);
export default userRouter;
