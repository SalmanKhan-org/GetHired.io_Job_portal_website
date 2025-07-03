import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Application from "../../models/applicationModel.js";

export const changeApplicationStatus = catchAsyncErrors(
    async (req, res, next) => {
        const { id, status } = req.body;

        await Application.findByIdAndUpdate(id, { status });

        res.status(201).json({
            success: true,
            message:"Status updated"
        })
    }
)