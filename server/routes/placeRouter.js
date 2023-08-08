import { Router } from 'express';

import { createPlace, deletePlace, getPlace } from '../controllers/place.js';
import auth from '../middleware/auth.js';

const placeRouter = Router();
placeRouter.post('/', auth, createPlace);
placeRouter.get('/',getPlace)
placeRouter.delete('/:placeId',deletePlace)
export default placeRouter;