import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";

export const getCompanyData = catchAsyncErrors(
    async (req, res, next) => {
        const company = req.company;

        res.status(200).json({
            success: true,
            company
       })
    }
)