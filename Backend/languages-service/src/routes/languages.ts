import {Router, Request, Response} from 'express';
import middlewareCommons from 'lo-commons/api/routes/middlewares';
import controller from '../controllers/languages'
const router = Router();

router.get('/languages/', middlewareCommons.validateAuth, controller.getLanguages);

export default router