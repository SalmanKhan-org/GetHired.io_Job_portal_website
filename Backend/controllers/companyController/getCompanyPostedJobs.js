import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Application from "../../models/applicationModel.js";
import Job from "../../models/jobModel.js";

export const getCompanyPostedJobs = catchAsyncErrors(
    async (req, res, next) => {
        const companyId = req.company._id;

        let jobs = await Job.find({ company: companyId }).lean();


        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await Application.find({ job: job._id });
            return { ...job, applicants: applicants.length };
        }))
        res.status(200).json({
            success: true,
            jobs:jobsData
        })
    }
)