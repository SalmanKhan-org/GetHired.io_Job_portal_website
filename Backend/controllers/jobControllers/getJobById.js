import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Job from "../../models/jobModel.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";

export const getJobById = catchAsyncErrors(
    async (req, res, next) => {
        const { id } = req.params;

        const job = await Job.findById(id).populate({ path: 'company', select: '-password' });

        if (!job) {
            return next(new ErrorHandler("Job Not Found", 404));
        }

        res.status(200).json({
            success: true,
            job
        })
    }
)