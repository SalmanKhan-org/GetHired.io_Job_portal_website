
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import User from "../../models/userModel.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";
import { uploadOnCloudinary } from "../../utils/uploadOnCloudinary.js";

export const updateUserResume = catchAsyncErrors(
    async (req, res, next) => {
        const {userId } =  req.auth();

        const resume = req.file;

        if (!resume) {
            return next(new ErrorHandler("Resume required", 404));
        }

        const user = await User.findById(userId);

        const resumeUrl = await uploadOnCloudinary(resume);

        user.resume = resumeUrl;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Resume Updated'
        })
    }
)