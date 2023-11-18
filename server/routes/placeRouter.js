import { Router } from 'express';

import { createPlace, deletePlace, getPlace, updatePlace } from '../controllers/place.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
import placePermissions from '../middleware/permissions/place/placePermissions.js';

const placeRouter = Router();
placeRouter.post('/', auth, createPlace);
placeRouter.get('/', getPlace);
//Para as duas permissoes passadas na rota o usuario deve ser editor, dono ou Admin do estabelecimento para edita-lo.
placeRouter.delete('/:placeId', auth, checkAccess(placePermissions.delete),deletePlace);
placeRouter.patch('/:placeId',auth, checkAccess(placePermissions.update) ,updatePlace);
export default placeRouter;