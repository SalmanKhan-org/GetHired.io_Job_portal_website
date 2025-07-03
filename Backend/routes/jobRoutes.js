import express from 'express';
import { getAllJobs } from '../controllers/jobControllers/getAllJob.js';
import { getJobById } from '../controllers/jobControllers/getJobById.js';
const router = express.Router();

//Rouet to get All Job
router.route('/').get(getAllJobs);
//get Job By Id
router.route('/:id').get(getJobById);

export default router;