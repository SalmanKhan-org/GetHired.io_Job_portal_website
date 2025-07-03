import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Job from "../../models/jobModel.js";

export const postJob = catchAsyncErrors(
    async (req, res, next) => {
        const { title, description, location, salary, level, category } = req.body;

        const companyId = req.company._id;

        const newJob = await Job.create({ title, description,level, category,  location, salary,date : Date.now(),  company: companyId });

        res.status(200).json({
            success: true,
            message: "New Job Posted",
            newJob
        })
    }
)