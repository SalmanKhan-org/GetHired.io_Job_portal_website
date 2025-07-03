import { registerCompany } from "../controllers/companyController/register.js";
import express from 'express';
import { upload } from "../middlewares/multer.js";
import { login } from "../controllers/companyController/login.js";
import { protectCompany } from "../middlewares/authToken.js";
import { postJob } from "../controllers/jobControllers/postJob.js";
import { getCompanyData } from "../controllers/companyController/getCompanyData.js";
import { getCompanyPostedJobs } from "../controllers/companyController/getCompanyPostedJobs.js";
import { changeVisibility } from "../controllers/jobControllers/changeVisibility.js";
import { getCompanyApplicants } from "../controllers/companyController/getCompanyApplicants.js";

const router = express.Router();


router.route('/register').post(upload.single('image'), registerCompany);
router.route('/login').post(login);
router.route('/job/new').post(protectCompany, postJob);
router.route("/company").get(protectCompany, getCompanyData);
router.route("/jobs").get(protectCompany, getCompanyPostedJobs);
router.route("/job/visible").post(protectCompany, changeVisibility);
router.route("/job/applicants").get(protectCompany, getCompanyApplicants);

export default router;