import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Job from "../../models/jobModel.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";

export const changeVisibility = catchAsyncErrors(
    async (req, res, next) => {
        const { id } = req.body;

        const companyId = req.company._id;

        const job = await Job.findById(id);

        if (!job) {
            return next(new ErrorHandler("Job Not Found", 404));
        }

        if (companyId.toString() === job.company.toString()) {
            job.visible = !job.visible
        }

        await job.save();

        res.status(200).json({
            success: true,
            message:"Visibility Changed Successfully",
            job
        })
    }
)