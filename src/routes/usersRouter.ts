import { Router } from 'express';

const router = Router();

router.post('/registration');
router.post('/login');
router.get('/auth');
router.put('/update');

export default router;
