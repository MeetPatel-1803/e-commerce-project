import { Router } from 'express';
// import v1 from './v1.js';
// import admin from './admin.js';
import vendor from './vendor.js';

const router = Router();

// router.use('/v1', v1);
// router.use('/admin', admin);
router.use('/vendor', vendor);

export default router;
