import express from 'express';
import { getUserData } from '../controllers/userControllers/getUserData.js';
import { applyforJob } from '../controllers/ApplicationControllers/applyForJob.js';
import { getUserAppliedJobs } from '../controllers/ApplicationControllers/getUserAppliedJobs.js';
import { updateUserResume } from '../controllers/userControllers/updateUserResume.js';
const router = express.Router();
import { requireAuth } from '@clerk/express';
import { upload } from '../middlewares/multer.js';
import { changeApplicationStatus } from '../controllers/ApplicationControllers/changeApplicationStatus.js';


router.route("/user").get(requireAuth(), getUserData);
router.route("/user/apply/job").post(requireAuth() ,applyforJob);
router.route("/user/jobs").get(requireAuth(), getUserAppliedJobs);
router.route("/user/update").put(requireAuth(), upload.single('resume'), updateUserResume);
router.route("/user/application/status/update").put(changeApplicationStatus);

export default router;