import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Job from "../../models/jobModel.js";

export const getAllJobs = catchAsyncErrors(
    async (req, res, next) => {
        const allJobs = await Job.find({ visible: true }).populate({ path: 'company', select: '-password' }).sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            allJobs
        })
    }
)