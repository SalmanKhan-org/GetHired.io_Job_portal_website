import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Application from "../../models/applicationModel.js";
import Job from "../../models/jobModel.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";

export const applyforJob = catchAsyncErrors(
    async (req, res, next) => {
        const { jobId } = req.body;

        const { userId } = req.auth();

        const isAlreadyApplied = await Application.findOne({ job:jobId, user:userId });

        if (isAlreadyApplied) {
            return next(new ErrorHandler("Already Applied", 401));
        }

        const jobData = await Job.findById(jobId);
        if (!jobData) {
            return next(new ErrorHandler("Job Not Found", 404));
        }

        await Application.create({ job: jobId, company: jobData.company, user: userId, date: Date.now() });
        
        res.status(200).json({
            success: true,
            message: 'Applied Successfully'
        })
    }
)