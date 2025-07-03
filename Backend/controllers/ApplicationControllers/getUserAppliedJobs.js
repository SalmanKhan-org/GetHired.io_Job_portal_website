import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Application from "../../models/applicationModel.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";

export const getUserAppliedJobs = catchAsyncErrors(
    async (req, res, next) => {
        const { userId } = req.auth();

        const appliedJobs = await Application.find({ user: userId })
            .populate('company', 'name email image')
            .populate('job', 'title description location category level salary').exec();
        
        if (!appliedJobs) {
            return next(new ErrorHandler('No Job Applications found', 404));
        }

        res.status(200).json({
            success: true,
            jobs:appliedJobs
        })
    }
)