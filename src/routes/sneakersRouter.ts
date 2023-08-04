import { Router } from 'express';
import sneakersController from '../controllers/sneakersController/index.js';

const router = Router();

router.post('/', sneakersController.create);
router.get('/', sneakersController.getAll);
router.get('/:id', sneakersController.getOne);
router.put('/');

export default router;
