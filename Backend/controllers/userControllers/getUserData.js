import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import User from "../../models/userModel.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";

export const getUserData = catchAsyncErrors(
    async (req, res, next) => {
        const { userId } = req.auth();

        const user = await User.findById(userId);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user
        })
    }
)