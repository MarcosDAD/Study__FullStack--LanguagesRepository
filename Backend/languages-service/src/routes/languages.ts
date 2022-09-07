import {Router, Request, Response} from 'express';
import middlewareCommons from 'lo-commons/api/routes/middlewares';
import {validateLangageSchema, validateUpdateLanguageSchema} from './middlewares';
import controller from '../controllers/languages'
const router = Router();

router.get('/languages/:id', middlewareCommons.validateAuth, controller.getLanguage);

router.get('/languages/', middlewareCommons.validateAuth, controller.getLanguages);

router.post('/languages/', middlewareCommons.validateAuth, validateLangageSchema, controller.addLanguage);

router.patch('/languages/:id', middlewareCommons.validateAuth, validateUpdateLanguageSchema, controller.setLanguage);

router.delete('/languages/:id', middlewareCommons.validateAuth, controller.removeLanguage);

export default router