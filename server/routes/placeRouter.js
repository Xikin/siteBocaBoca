import { Router } from 'express';

import { createPlace, getPlace } from '../controllers/place.js';
import auth from '../middleware/auth.js';

const placeRouter = Router();
placeRouter.post('/', auth, createPlace);
placeRouter.get('/',getPlace)
export default placeRouter;