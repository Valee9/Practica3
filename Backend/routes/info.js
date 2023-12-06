import express from 'express';
import { getInfo, updateInfo, updateHobby, updateFramework, deleteFramework, deleteHobby } from '../controllers/info.js';

const router = express.Router();

// Get all clients
router.get('/', getInfo);

router.put('/', updateInfo);
router.put('/hobbies', updateHobby);
router.put('/framework', updateFramework);

router.delete('/frameworks/:_id', deleteFramework)

router.delete('/hobby/:_id', deleteHobby)

export default router;